'use client';

import { getSupabaseClient } from './supabase';

const DB_NAME = 'rca_media_db';
const STORE_NAME = 'videos';
const DB_VERSION = 1;
const STORAGE_BUCKET = 'property-media';

// Open or initialize IndexedDB
function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not available in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// In-memory cache for Object URLs to avoid leaking memory and recreate needlessly
const objectUrlCache = new Map<string, string>();

/**
 * Upload a video file directly to Supabase Cloud Storage so it plays across ALL phones & browsers.
 * Falls back to local IndexedDB ONLY if Supabase is not configured.
 */
export async function uploadVideoToCloud(file: File): Promise<{ url: string; storageType: 'cloud' | 'local'; error?: string }> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4';
      const safeName = `video_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const filePath = `videos/${safeName}`;

      const { data, error } = await client.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || 'video/mp4',
        });

      if (!error && data) {
        const { data: publicUrlData } = client.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(data.path);

        if (publicUrlData?.publicUrl) {
          return { url: publicUrlData.publicUrl, storageType: 'cloud' };
        }
      }

      if (error) {
        console.warn('Supabase Storage video upload error:', error.message);
        const localKey = await saveVideoBlob(file);
        return {
          url: localKey,
          storageType: 'local',
          error: `Cloud video storage failed (${error.message}). Saved locally to this device only — make sure you ran the updated supabase_schema.sql to create the "property-media" bucket.`,
        };
      }
    } catch (err: any) {
      console.warn('Cloud video upload exception:', err);
    }
  }

  // Fallback to local IndexedDB if offline or Supabase not configured
  const localKey = await saveVideoBlob(file);
  return { url: localKey, storageType: 'local' };
}

/**
 * Save a video Blob/File into IndexedDB (local device fallback).
 * Returns an internal IDB reference key: "idb:video_<timestamp>_<random>"
 */
export async function saveVideoBlob(file: Blob | File): Promise<string> {
  const key = `idb:video_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const putRequest = store.put(file, key);

    putRequest.onsuccess = () => {
      try {
        const objectUrl = URL.createObjectURL(file);
        objectUrlCache.set(key, objectUrl);
      } catch (e) {
        console.warn('Failed to create instant object URL:', e);
      }
      resolve(key);
    };

    putRequest.onerror = () => {
      reject(putRequest.error);
    };
  });
}

/**
 * Retrieve the Blob from IndexedDB by its key
 */
export async function getVideoBlob(key: string): Promise<Blob | null> {
  if (!key.startsWith('idb:')) return null;
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(key);

    getRequest.onsuccess = () => {
      resolve((getRequest.result as Blob) || null);
    };

    getRequest.onerror = () => {
      reject(getRequest.error);
    };
  });
}

/**
 * Resolves any video URL or IDB key into a playable URL.
 */
export async function resolveVideoUrl(urlOrKey?: string): Promise<string> {
  if (!urlOrKey) return '';
  if (!urlOrKey.startsWith('idb:')) return urlOrKey;

  if (objectUrlCache.has(urlOrKey)) {
    return objectUrlCache.get(urlOrKey)!;
  }

  try {
    const blob = await getVideoBlob(urlOrKey);
    if (!blob) return '';
    const objectUrl = URL.createObjectURL(blob);
    objectUrlCache.set(urlOrKey, objectUrl);
    return objectUrl;
  } catch (err) {
    console.error('Error resolving video URL from IndexedDB:', err);
    return '';
  }
}

/**
 * Parse video URLs (YouTube, Shorts, Vimeo, Google Drive, MP4/MOV cloud URLs)
 * so they embed and play properly on both Mobile and Desktop.
 */
export function parseVideoSource(rawUrl?: string): { type: 'iframe' | 'video' | 'unavailable'; src: string } {
  if (!rawUrl || !rawUrl.trim()) {
    return { type: 'unavailable', src: '' };
  }

  const url = rawUrl.trim();

  // Unresolved local-only IndexedDB key (cannot play on another phone/device)
  if (url.startsWith('idb:')) {
    return { type: 'unavailable', src: '' };
  }

  // YouTube (standard watch?v=, youtu.be/, shorts/, embed/)
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    try {
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split(/[?&#]/)[0] || '';
      } else if (url.includes('/shorts/')) {
        videoId = url.split('/shorts/')[1]?.split(/[?&#]/)[0] || '';
      } else if (url.includes('/embed/')) {
        videoId = url.split('/embed/')[1]?.split(/[?&#]/)[0] || '';
      } else if (url.includes('v=')) {
        videoId = new URL(url).searchParams.get('v') || '';
      }
    } catch (_) {}

    if (videoId) {
      return {
        type: 'iframe',
        src: `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`,
      };
    }
    return { type: 'iframe', src: url };
  }

  // Vimeo
  if (url.includes('vimeo.com/')) {
    const vimeoId = url.split('vimeo.com/')[1]?.split(/[?&#/]/)[0] || '';
    if (vimeoId && /^\d+$/.test(vimeoId)) {
      return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeoId}` };
    }
  }

  // Google Drive shared video link
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return { type: 'iframe', src: `https://drive.google.com/file/d/${match[1]}/preview` };
    }
  }

  return { type: 'video', src: url };
}

/**
 * Delete a video blob from IndexedDB
 */
export async function deleteVideoBlob(key?: string): Promise<void> {
  if (!key || !key.startsWith('idb:')) return;
  if (objectUrlCache.has(key)) {
    URL.revokeObjectURL(objectUrlCache.get(key)!);
    objectUrlCache.delete(key);
  }

  try {
    const db = await openDb();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(key);
  } catch (err) {
    console.warn('Error deleting video blob from IndexedDB:', err);
  }
}
