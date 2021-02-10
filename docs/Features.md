# Features für WatchMates

Unser Ziel ist es ein Online-Kino Erlebnis zu ermöglichen. Den NutzerInnen wird es möglich sein zusammen mit ihrer/seiner Familie einen virtuellen Raum zu erstellen und in diesem gleichzeitig ein Video anzusehen. Dabei können sie sich auch über das Video unterhalten und die Wiedergabe steuern. 


| Feature | Beschreibung | Priorität | Geschätzter Aufwand | Betroffene Schichten |
|---------|--------------|-----------|--------------------|---------------------|
| **Räume Erstellen** | Der User hat die Möglichkeit Räume zu erstellen und andere User einzuladen | "kritisch" | 3 Tage | User2User-Interaktion |
| **Video Upload** | Die User besitzen die Möglichkeit eigene Videos per Upload-Button hochzuladen | "kritisch" | 1 Tag | User Interface |
| **Synchroner Videostream über Server** | Ermöglicht den Usern synchron ein ausgewähltes Video anzusehen | "kritisch" | 2-3 Tage | Server |
| **Interaktion mit dem Videoplayer** | Der User/Der Host hat die Möglichkeit das Video zu Stoppen/Starten/Vor-/Zurückzuspulen/Mute/ | "kritisch" | 2-3 Tage | User-Server-Kommunikation |
| **Live-Chat** | Während des Streams haben die Nutzer die Möglichkeit live zu chatten | "hoch" | 2 Tage | User Interface |
| **Username erstellen** | User können Nicknames festlegen | "hoch" | 2 Tag | Server |
| **Drag&Drop** | Ein beliebiges Video per D&D in den Videoplayer einfügen | "hoch" | 1 Tag | User Interface |
| **Verschiedene Dateiformate formatieren** | Alle Multimediadateien werden in das beste Streamingformat formatiert | "hoch" | 2-3 Tag | Server |
| **Fullscreen** | Der User hat die Möglichkeit Inhalte in Fullscreen zu sehen| "hoch" | 1 Tag | Funktionalität des Players |
| **Playlist erstellen** | Der User hat die Möglichkeit verschiedene Playlists zu erstellen und im Stream wiederzugeben | "mittel" | 1 Tage | User Interface |
| **Terminkalender** | Die User haben die Möglichkeit Termine festzulegen und andere User zu diesen einzuladen | "mittel" | 2 Tage | User Interface |
| **Audioformate wiedergeben** | Der User hat die Möglichkeit Audio verschiedener Formate hochzuladen und wiederzugeben z.B. MP3, WAV | "mittel" | 2 Tag | Funktionalität des Players |
| **Diashow** | Der User hat die Möglichkeit eine Diashow aus vorher hochgeladenen Bildern zu erstellen | "nice-to-have" | 2 Tage | User-Server-Kommunikation |
| **Shortcuts für den Videoplayer** | Der User hat die Möglichkeit über gängige Shortcuts(z.B. Leertaste für Pause) mit dem Video zu interagieren | "nice-to-have" | 1 Tage | User-Server-Kommunikation |
| **Kinomodus** | Die User haben die Möglichkeit einen Kinomodus einzuschalten, der den Hintergrund verdunkelt | "nice-to-have" | 1 Tage | Funktionalität des Players |
| **Ambilight** | Die User haben die Möglichkeit den Ambilight-modus zu aktivieren | "nice-to-have" | 2 Tage | Funktionalität des Players |
| **Passwort festlegen** | User haben die Möglichkeit optional ein Passwort für einen Raum festzulegen | "nice-to-have" | 2 Tag | Server |
| **Countdown** | Vor dem eigentlichen Video wird ein Countdown eingeblendet | "nice-to-have" | 1 Tage | Funktionalität des Players |



## Umsetzung

[Beschreiben Sie kurz das geplante Vorgehen bei der Umsetzung der Features. Entwerfen Sie dazu ein oder mehrere *Vertical Slices* anhand derer Sie den zentralen *Use Case* der Anwendung implementieren werden. Geben Sie an, wann welche Funktionen (und in welchem Vollständigkeitsgrad) implementiert werden. Begründen Sie kurz die gewählte Reihenfolge. ]

Frameworks und API's:
Video.js, Express.js, fullscreen-api, node.js, (mySQL||MongoDB,) (IFrame Player API,)
