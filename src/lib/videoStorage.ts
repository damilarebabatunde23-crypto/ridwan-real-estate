'use client';

const DB_NAME = 'rca_media_db';
const STORE_NAME = 'videos';
const DB_VERSION = 1;

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
 * Save a video Blob/File of ANY size into IndexedDB with zero file size restrictions.
 * Stores videos locally without crashing localStorage quotas.
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
      // Create and cache object URL for immediate fast playback
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
 * - If it's a YouTube, Vimeo, or http/data URL, returns it immediately.
 * - If it's an "idb:..." key, retrieves the blob from IndexedDB and creates a streamable Object URL.
 */
export async function resolveVideoUrl(urlOrKey?: string): Promise<string> {
  if (!urlOrKey) return '';
  if (!urlOrKey.startsWith('idb:')) return urlOrKey;

  // Check cache
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
