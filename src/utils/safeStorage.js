// ============================================
// PlaceMentor AI — Resilient Storage Utility
// Safe localStorage wrapper (QuotaExceededError protection) + IndexedDB File Storage
// Prevents white screen crashes from large document/file uploads (up to 150MB)
// ============================================

const DB_NAME = 'PlaceMentor_Files_DB';
const DB_VERSION = 2; // Incremented for clean migration & schema reliability
const STORE_NAME = 'study_files';

let dbInstance = null;

// --------------------------------------------
// IndexedDB Native Helper (Large File Storage)
// --------------------------------------------
function openFilesDB(timeoutMs = 4000) {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.reject(new Error('IndexedDB not supported in this environment'));
  }
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('IndexedDB connection timed out'));
    }, timeoutMs);

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => {
        clearTimeout(timer);
        dbInstance = request.result;
        dbInstance.onversionchange = () => {
          try {
            dbInstance.close();
          } catch {}
          dbInstance = null;
        };
        dbInstance.onclose = () => {
          dbInstance = null;
        };
        resolve(dbInstance);
      };

      request.onerror = () => {
        clearTimeout(timer);
        reject(request.error || new Error('IndexedDB open error'));
      };

      request.onblocked = () => {
        clearTimeout(timer);
        console.warn('[IndexedDB Notice] Connection blocked by another open tab; continuing.');
        reject(new Error('IndexedDB blocked by another open window'));
      };
    } catch (err) {
      clearTimeout(timer);
      reject(err);
    }
  });
}

export const fileStorage = {
  // Store local PDF / Document file in IndexedDB (handles up to 150MB+)
  async saveFile(id, fileData, fileName, mimeType = 'application/pdf') {
    if (!id || !fileData) return false;
    try {
      const db = await openFilesDB();

      // Normalize into standard native Blob (protects against OS file descriptor locks)
      let storedBlob;
      if (fileData instanceof Blob || fileData instanceof File) {
        storedBlob = fileData;
      } else if (fileData instanceof ArrayBuffer) {
        storedBlob = new Blob([fileData], { type: mimeType });
      } else if (typeof fileData === 'string' && fileData.startsWith('data:')) {
        const arr = fileData.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || mimeType;
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        storedBlob = new Blob([u8arr], { type: mime });
      } else {
        storedBlob = new Blob([String(fileData)], { type: 'text/plain' });
      }

      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          console.warn('[IndexedDB Save Timeout] Proceeding without blocking UI.');
          resolve(false);
        }, 6000);

        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const record = {
            id,
            fileData: storedBlob,
            fileName: fileName || 'document.pdf',
            mimeType: mimeType || 'application/pdf',
            size: storedBlob.size,
            updatedAt: Date.now()
          };
          const req = store.put(record);

          req.onsuccess = () => {
            clearTimeout(timer);
            resolve(true);
          };
          req.onerror = () => {
            clearTimeout(timer);
            console.warn('[IndexedDB Store Error]', req.error);
            resolve(false);
          };
          tx.onabort = () => {
            clearTimeout(timer);
            console.warn('[IndexedDB Tx Abort]', tx.error);
            resolve(false);
          };
        } catch (txErr) {
          clearTimeout(timer);
          console.warn('[IndexedDB Transaction Failure]', txErr);
          resolve(false);
        }
      });
    } catch (e) {
      console.warn('[IndexedDB Save Notice]', e.message);
      return false;
    }
  },

  // Retrieve file from IndexedDB
  async getFile(id) {
    if (!id) return null;
    try {
      const db = await openFilesDB();
      return new Promise((resolve) => {
        const timer = setTimeout(() => resolve(null), 4000);
        try {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.get(id);
          req.onsuccess = () => {
            clearTimeout(timer);
            resolve(req.result || null);
          };
          req.onerror = () => {
            clearTimeout(timer);
            resolve(null);
          };
        } catch {
          clearTimeout(timer);
          resolve(null);
        }
      });
    } catch {
      return null;
    }
  },

  // Delete file from IndexedDB
  async deleteFile(id) {
    if (!id) return false;
    try {
      const db = await openFilesDB();
      return new Promise((resolve) => {
        const timer = setTimeout(() => resolve(false), 3000);
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          const req = store.delete(id);
          req.onsuccess = () => {
            clearTimeout(timer);
            resolve(true);
          };
          req.onerror = () => {
            clearTimeout(timer);
            resolve(false);
          };
        } catch {
          clearTimeout(timer);
          resolve(false);
        }
      });
    } catch {
      return false;
    }
  }
};

// --------------------------------------------
// Safe LocalStorage Wrapper (Quota-Protected)
// --------------------------------------------
// Strips huge base64 strings and keeps localStorage lightweight (< 200KB)
function sanitizeDataForLocalStorage(key, data) {
  if (key === 'pm_notes_data' && Array.isArray(data)) {
    return data.map(item => {
      if (!item || typeof item !== 'object') return item;
      // Strip any heavy raw binary or oversized data URLs from localStorage
      const isOversized = item.fileUrl && typeof item.fileUrl === 'string' && (item.fileUrl.startsWith('data:') || item.fileUrl.length > 500);
      return {
        id: item.id,
        title: item.title || 'Technical Notes',
        language: item.language || 'Python',
        topic: item.topic || 'General Topic',
        description: item.description || '',
        fileName: item.fileName || null,
        fileSizeFormatted: item.fileSizeFormatted || null,
        fileUrl: isOversized ? `local-doc://${item.id}` : (item.fileUrl || `local-doc://${item.id}`),
        hasLocalBlob: item.hasLocalBlob !== false,
        createdAt: typeof item.createdAt === 'string' ? item.createdAt : 'Recent'
      };
    });
  }
  return data;
}

export const safeStorage = {
  // Safe Get with Fallback
  getItem(key, defaultValue = null) {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`[SafeStorage] Failed to parse item "${key}":`, e.message);
      try {
        localStorage.removeItem(key);
      } catch {}
      return defaultValue;
    }
  },

  // Safe Set with Quota Protection & Binary Stripping
  setItem(key, value) {
    if (typeof window === 'undefined') return false;
    try {
      const sanitized = sanitizeDataForLocalStorage(key, value);
      const serialized = typeof sanitized === 'string' ? sanitized : JSON.stringify(sanitized);
      localStorage.setItem(key, serialized);
      return true;
    } catch (e) {
      console.warn(`[SafeStorage Quota Notice] Could not save "${key}" to localStorage:`, e.message);

      // Handle QuotaExceededError: Purge bloated keys and retry with lightweight payload
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        try {
          localStorage.removeItem('pm_notes_data');
          localStorage.removeItem('pm_collected_urls');
          localStorage.removeItem('pm_pending_items');

          if (Array.isArray(value)) {
            const ultraLight = value.slice(0, 10).map(v => ({
              id: v.id,
              title: v.title || v.role || 'Item',
              language: v.language || 'General',
              topic: v.topic || '',
              status: v.status || 'Published'
            }));
            localStorage.setItem(key, JSON.stringify(ultraLight));
          }
        } catch {}
      }
      return false;
    }
  },

  // Safe Remove
  removeItem(key) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {}
  },

  // Sanitize corrupt storage on startup (Purges any oversized keys > 150KB to keep browser fast and prevent white screen)
  cleanOversizedStorage() {
    if (typeof window === 'undefined') return;
    try {
      const keysToClean = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        const val = localStorage.getItem(key);
        if (val && val.length > 150000) {
          keysToClean.push({ key, length: val.length });
        }
      }

      keysToClean.forEach(({ key, length }) => {
        console.warn(`[SafeStorage] Purging oversized item "${key}" (${Math.round(length / 1024)} KB) to protect browser memory.`);
        if (key === 'pm_notes_data') {
          try {
            const raw = localStorage.getItem(key);
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
              const stripped = parsed.map(item => ({
                id: item.id,
                title: item.title || 'Technical Notes',
                language: item.language || 'Python',
                topic: item.topic || 'General Topic',
                description: item.description || '',
                fileName: item.fileName || null,
                fileSizeFormatted: item.fileSizeFormatted || null,
                fileUrl: `local-doc://${item.id}`,
                hasLocalBlob: true,
                createdAt: typeof item.createdAt === 'string' ? item.createdAt : 'Recent'
              }));
              localStorage.setItem(key, JSON.stringify(stripped));
              return;
            }
          } catch {}
        }
        localStorage.removeItem(key);
      });
    } catch (e) {
      console.warn('[SafeStorage Scan Notice]', e.message);
    }
  }
};

// --------------------------------------------
// Universal Note Document Viewer (External Links + Local IndexedDB Files)
// --------------------------------------------
export async function openNoteDocument(note) {
  if (!note) return;
  const url = note.fileUrl || '';

  // 1. External Web Link (http / https) -> Open directly
  if (url.startsWith('http://') || url.startsWith('https://')) {
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  }

  // Safe download/view trigger using anchor tag (immune to strict popup blockers)
  const triggerBlobView = (blob, fileName) => {
    try {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.target = '_blank';
      a.rel = 'noopener,noreferrer';
      if (fileName) {
        a.download = fileName;
      }
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        try {
          document.body.removeChild(a);
          URL.revokeObjectURL(blobUrl);
        } catch {}
      }, 30000);
      return true;
    } catch (e) {
      console.warn('Error opening blob URL:', e);
      return false;
    }
  };

  // 2. Local Document stored in IndexedDB
  if (url.startsWith('local-doc://') || url.startsWith('indexeddb://') || note.hasLocalBlob) {
    const fileId = note.id || url.replace(/^(local-doc:\/\/|indexeddb:\/\/)/, '');
    const record = await fileStorage.getFile(fileId);
    if (record && record.fileData) {
      const fileName = record.fileName || note.fileName || `${note.title || 'study-note'}.pdf`;
      if (record.fileData instanceof Blob || record.fileData instanceof File) {
        if (triggerBlobView(record.fileData, fileName)) return;
      }
      if (typeof record.fileData === 'string' && record.fileData.startsWith('data:')) {
        const arr = record.fileData.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || record.mimeType || 'application/pdf';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        const blob = new Blob([u8arr], { type: mime });
        if (triggerBlobView(blob, fileName)) return;
      }
    }
  }

  // 3. Raw Data URL fallback
  if (url.startsWith('data:')) {
    try {
      const arr = url.split(',');
      const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/pdf';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) u8arr[n] = bstr.charCodeAt(n);
      const blob = new Blob([u8arr], { type: mime });
      if (triggerBlobView(blob, note.fileName || 'document.pdf')) return;
    } catch (e) {
      console.warn('Data URL open error:', e);
    }
  }

  // 4. Default GeeksforGeeks / Docs reference fallback
  const query = encodeURIComponent(note.topic || note.title || 'study notes');
  window.open(`https://www.geeksforgeeks.org/search/${query}/`, '_blank', 'noopener,noreferrer');
}
