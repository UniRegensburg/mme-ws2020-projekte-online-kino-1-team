# Features für WatchMates

Unser Ziel ist es ein Online-Kino Erlebnis zu ermöglichen. Den NutzerInnen wird es möglich sein zusammen mit ihrer/seiner Familie einen virtuellen Raum zu erstellen und in diesem gleichzeitig ein Video anzusehen. Dabei können sie sich auch über das Video unterhalten und die Wiedergabe steuern. 


| Feature | Beschreibung | Priorität | Geschätzter Aufwand | Betroffene Schichten |
|---------|--------------|-----------|--------------------|---------------------|
| **Räume Erstellen** | Der User hat die Möglichkeit Räume zu erstellen und andere User einzuladen | "kritisch" | 3 Tage | User2User-Interaktion |
| **Räume Beitreten** | Durch eine Copy-To-Clipboard Option wird der aktuelle Link kopiert. Dieser kann an Freunde gesendet werden. | "kritisch" | 3 Tage | User2User-Interaktion |
| **Räume Löschen** |Räume werden nach einer Woche ohne Benutzung gelöscht und alle Dateien in der Playlist ebenfalls | "mittel" | 2 Tage | User2User-Interaktion |
| **Video Upload** | Die User besitzen die Möglichkeit eigene Videos per Upload-Button hochzuladen | "kritisch" | 1 Tag | User Interface |
| **Synchroner Videostream über Server** | Ermöglicht den Usern synchron ein ausgewähltes Video anzusehen | "kritisch" | 2-3 Tage | Server |
| **Interaktion mit dem Videoplayer** | Der User/Der Host hat die Möglichkeit das Video zu Stoppen/Starten/Vor-/Zurückzuspulen/Mute/ | "kritisch" | 2-3 Tage | User-Server-Kommunikation |
| **Live-Chat** | Während des Streams haben die Nutzer die Möglichkeit live zu chatten | "hoch" | 2 Tage | User Interface |
| **Live-Chat-Ton** | Ein Ton soll anzeigen, dass eine neue Nachricht angekommen ist. Dieser kann auch deaktiviert werden. | "hoch" | 2 Tage | User Interface |
| **Username erstellen** | User können Nicknames festlegen | "hoch" | 2 Tag | Server |
| **Drag&Drop** | Ein beliebige Datei per D&D in die Playlist einfügen | "hoch" | 1 Tag | User Interface |
| **Fullscreen** | Der User hat die Möglichkeit Inhalte in Fullscreen zu sehen| "hoch" | 1 Tag | Funktionalität des Players |
| **Playlist erstellen** | Der User hat die Möglichkeit verschiedene Playlists zu erstellen und im Stream wiederzugeben | "mittel" | 1 Tage | User Interface |
| **Terminkalender** | Die User haben die Möglichkeit Termine festzulegen und andere User zu diesen einzuladen | "mittel" | 2 Tage | User Interface |
| **Audioformate wiedergeben** | Der User hat die Möglichkeit Audio verschiedener Formate hochzuladen und wiederzugeben z.B. MP3, WAV | "mittel" | 2 Tag | Funktionalität des Players |
| **Kinomodus** | Die User haben die Möglichkeit, durch Einklappen des Chats in den Kinomodus zu wechseln | "nice-to-have" | 1 Tage | Funktionalität des Players |
| **Diashow** | Der User hat die Möglichkeit eine Diashow aus vorher hochgeladenen Bildern zu erstellen | "nice-to-have" | 2 Tage | User-Server-Kommunikation |
| **Shortcuts für den Videoplayer** | Der User hat die Möglichkeit über gängige Shortcuts(z.B. Leertaste für Pause) mit dem Video zu interagieren | "nice-to-have" | 1 Tage | User-Server-Kommunikation |
| **Countdown** | Falls ein Termin erstellt wurde, läuft ein Countdown bis zu diesem Termin. Solange bleibt der Raum mindestens geöffnet | "nice-to-have" | 1 Tage | Funktionalität des Players |
| **Playlist Shortcuts** | Mithilfe der Pfeiltasten soll in der Playlist zwischen den einzelnen Elementen gewechselt werden können. | "nice-to-have" | 1 Tage | Funktionalität des Players |


## Umsetzung

**Vertical Slices:**
1. Räume erstellen, teilen/beitreten und Nicknames festlegen
2. Video Upload
3. Synchrones Abspielen
4. Synchrone Interaktion mit dem Player
5. Live Chat
6. Drag & Drop für Videoupload
7. Fullscreen
8. Playlist erstellen und bearbeiten
9. Termine für Videoabende planen
10. Audioformate unterstützen
11. Kinomodus
12. Diashow ermöglichen durch Bildupload(Bildformatierung)
13. Shortcuts für Interaktion mit den UI-Elementen

**Frameworks und API's:**

Video.js, Express.js, fullscreen-api, node.js, MongoDB, ejs, mongoose, node-schedule, node-uuid, socket.io, socketio-file-upload
