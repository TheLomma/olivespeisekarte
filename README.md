[PWA-UPDATE-README.md](https://github.com/user-attachments/files/26535781/PWA-UPDATE-README.md)
# PWA Offline-Modus – Update Anleitung

## Welche Dateien musst du ersetzen/hinzufügen?

| Datei | Aktion |
|---|---|
| `index.html` | ✏️ ERSETZEN (Service Worker Registrierung neu) |
| `public/manifest.json` | ✅ NEU erstellen |
| `public/service-worker.js` | ✅ NEU erstellen |
| `public/icon-192.png` | ✅ NEU (bereits generiert, aus vorherigem Download) |
| `public/icon-512.png` | ✅ NEU (bereits generiert, aus vorherigem Download) |
| `public/apple-touch-icon.png` | ✅ NEU (bereits generiert, aus vorherigem Download) |

## Vercel-Deployment

Vercel liefert den Service Worker korrekt aus – keine extra Konfiguration nötig.
Stelle sicher, dass `public/service-worker.js` im Root liegt (nicht in einem Unterordner).

## Cache-Version aktualisieren

Bei jedem App-Update die Versionsnummer in `service-worker.js` erhöhen:
```js
const CACHE_NAME = "hopmanns-v3.3"; // → z.B. "hopmanns-v3.4"
```

## Testen

1. App auf Vercel deployen
2. Chrome DevTools → Application → Service Workers → prüfen ob registriert
3. Network-Tab → "Offline" → App neu laden → muss noch funktionieren ✅
