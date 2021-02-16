# Software Desing für WatchMates

**index.js:**

User-Interface, leitet Eingaben des Users an den Server;
index.js gibt User die Möglichkeit über einen Button eine Anfrage an den Server zu senden, um eine Unterseite zu erstellen und leitet ihn auf diese weiter.
Der User kann auch einem existierenden Raum beitreten, über einen vorgefertigten Button + Input Feld (für Link). Gibt der Server das "OK" leitet er ihn auf die Unterseite weiter. 
Über einen weiteren Button "Raum reservieren" kann der User ein Datum festlegen, einen Raum erstellen und sich den Termin als ICS herunterladen.

**Room.js:**

Beim Betreten eines Raums erscheint ein Inputfeld, welches einen Nickname fordert.
User-Interface welches mit dem Server-Status regelmäßig abgeglichen wird. Zentrales Modul für die Räume. Lädt andere Module und verwaltet diese. Upload der Datei(en).
Verwalten des Live-Chats. Bei Eingabe einer Nachricht --> Senden an Server --> Server sendet Nachricht an alle Clients; Anzeigen des Ambilights/Kinomodus; Falls ein Raum an einem bestimmten Datum erstellt wurde, wird ein Countdown angezeigt, dieser kann auch vorzeitig beendet werden.

**Playlist.js**

Zeigt die Dateititel in bestimmter Reihenfolge an, der User kann diese über Drag&Drop verändern. Verwaltet die Wiedergabe der Player (Reihenfolge, aktuelle Datei).

**VideoPlayer.js** [video.js, fullscreen-api]

Laden der Datei vom Server abhängig von Playlistreihenfolge, Abspielen der Videos/Audios, Abfangen von Interaktion mit der Datei und Senden an den Server. Vor dem Start wird ein 3-Sekündiger Countdown abgespielt. 

**Diashow.js** [fullscreen-api]

Laden der Bilder vom Server abhängig von Playlistreihenfolge, Abspielen der Diashow, Abfangen von Interaktion mit den Bildern und Senden an den Server.

**Server.js** [express.js]

Verwalten der erstellten Räume (erstellen, löschen, aktualisieren), empfangen der Dateien von Room.js, evtl. formatieren und auf dem Server zwischenspeichern.
Empfangen und Senden der Livechat Nachrichten, Zuordnung über "Raum-ID". Sendet Multimediadatei über Playlist an den User. Reagiert auf Callbacks des Players und synchronisiert den Player bei allen Usern. Server sendet Nachricht an Playlist, sobald eine Datei hochgeladen wurde.
