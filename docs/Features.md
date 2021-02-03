# Features für [WatchMates]

User Ziel ist es ein Online-Kino Erlebnis zu ermöglichen. Den NutzerInnen wird es möglich sein zusammen einen virtuellen Raum zu erstellen und in diesem gleichzeitig ein Video anzusehen. Dabei können sie sich auch über das Video unterhalten und die Wiedergabe steuern. 


| Feature | Beschreibung | Priorität | Geschätzter Aufwand | Betroffene Schichten |
|---------|--------------|-----------|--------------------|---------------------|
| **Drag&Drop** | Ein beliebiges Video per D&D in den Videoplayer einfügen | "hoch" | 1 Tag | User Interface |
| **Video Upload** | Die User besitzen die Möglichkeit eigene Videos per Upload-Button hochzuladen | "kritisch" | 1 Tag | User Interface |
| **Verschiedene Videoformate** | Der User hat die Möglichkeit Videos verschiedener Formate hochzuladen z.B. MP4, AVI, WMV, MKV | "mittel" | 1 Tag | Funktionalität des Players |
| **Fullscreen** | Der User hat die Möglichkeit Inhalte in Fullscreen zu sehen| "hoch" | 1 Tag | Funktionalität des Players |
| **Räume Erstellen** | Der User hat die Möglichkeit Räume zu erstellen und andere User einzuladen | "kritisch" | 3 Tage | User2User-Interaktion |
| **Audioformate wiedergeben** | Der User hat die Möglichkeit Audio verschiedener Formate hochzuladen und wiederzugeben z.B. MP3, WAV | "nice-to-have" | 1 Tag | Funktionalität des Players |
| **Synchroner Videostream über Server** | Ermöglicht den Usern synchron ein ausgewähltes Video anzusehen | "kritisch" | 2-3 Tage | Server |
| **Interaktion mit dem Videoplayer** | Der User/Der Host hat die Möglichkeit das Video zu Stoppen/Starten/Vor-/Zurückzuspulen/Mute/ | "kritisch" | 2-3 Tage | User-Server-Kommunikation |
| **Live-Chat** | Während des Streams haben die Nutzer die Möglichkeit live zu chatten | "nice-to-have" | 2 Tage | User Interface |
| **YouTube-Videos streamen** | Die User haben die Möglichkeit auch Youtube-Videos zu streamen | "nice-to-have" | 2 Tage | Funktionalität des Players |
| **Kinomodus** | Die User haben die Möglichkeit einen Kinomodus einzuschalten, der den Hintergrund verdunkelt | "nice-to-have" | 1 Tage | Funktionalität des Players |
| **Ambilight** | Die User haben die Möglichkeit den Ambilight-modus zu aktivieren | "nice-to-have" | 2 Tage | Funktionalität des Players |
| **Countdown** | Vor dem eigentlichen Video wird ein Countdown eingeblendet | "nice-to-have" | 1 Tage | Funktionalität des Players |
| **Playlist erstellen** | Der User hat die Möglichkeit verschiedene Playlists zu erstellen und im Stream wiederzugeben | "nice-to-have" | 1 Tage | User Interface |
| **Terminkalender** | Die User haben die Möglichkeit Termine festzulegen und andere User zu diesen einzuladen | "nice-to-have" | 2 Tage | User Interface |
| **User Accounts** | User können Accounts erstellen | "nice-to-have" | 2 Tag | Server |
| **User Accounts bearbeiten** | User können z.B. Profilbilder, Nickname | "nice-to-have" | 2 Tag | Server |
| **Passwort zurücksetzen** | User können ihre Passwörter bei Verlust mithilfe einer bei vorher festgelegten Sicherheitsfrage zurücksetzen | "nice-to-have" | 2 Tag | Server |
| **Rechtevergabe** | Der Host eines Raums kann anderen Usern verschiedene Rollen zuweisen z.B. Host, Gast | "nice-to-have" | 2 Tag | User-User-Interaktion |
| **SHA256 Verschlüsselung** | Die Anmeldung und Speicherung der User-Credentials wird über SHA256 User und Serverseitig verschlüsselt | "nice-to-have" | 2 Tag | User-Server-Interaktion |


## Umsetzung

[Beschreiben Sie kurz das geplante Vorgehen bei der Umsetzung der Features. Entwerfen Sie dazu ein oder mehrere *Vertical Slices* anhand derer Sie den zentralen *Use Case* der Anwendung implementieren werden. Geben Sie an, wann welche Funktionen (und in welchem Vollständigkeitsgrad) implementiert werden. Begründen Sie kurz die gewählte Reihenfolge. ]

Frameworks und API's:
Video.js, Express.js, fullscreen-api, node.js, mySQL||MongoDB, IFrame Player API, Web Crypto API, Bootstrap Framework, 
