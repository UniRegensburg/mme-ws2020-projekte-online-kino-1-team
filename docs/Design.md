# Software Desing für WatchMates

## Client
**index.js:** [Socket.io]

Zentrale Kommunikationsschnittstelle mit dem Server. Verwaltet alle anderen Client Module.
User-Interface für Startscreen,
StartScreen.js gibt User die Möglichkeit über einen Button eine Anfrage an den Server zu senden, um eine Unterseite zu erstellen und leitet ihn auf diese weiter.
Der User kann auch einem existierenden Raum beitreten, über einen vorgefertigten Button + Input Feld (für Link). Gibt der Server das "OK" leitet er ihn auf die Unterseite weiter. Über einen weiteren Button "Raum reservieren" kann der User ein Datum festlegen, einen Raum erstellen und sich den Termin als ICS herunterladen.


**room.js:**

User Interface für Room,
Beim Betreten eines Raums erscheint ein Inputfeld, welches einen Nickname fordert.
User-Interface welches mit dem Server-Status regelmäßig abgeglichen wird. Zentrales Modul für die Räume.
Anzeigen des Ambilights/Kinomodus; Falls ein Raum an einem bestimmten Datum erstellt wurde, wird ein Countdown angezeigt, dieser kann auch vorzeitig beendet werden. Lädt die Multimediadatei vom Server in den VideoPlayer/Diashow bei allen Clients des gleichen Raums. Laden der Datei vom Server abhängig von Playlistreihenfolge.

**VideoPlayer.js** [video.js, fullscreen-api]

Abspielen der Videos/Audios, Abfangen von Interaktion mit der Datei und Senden an den Server. Vor dem Start wird ein 3-Sekündiger Countdown abgespielt. Abspielen der Diashow, Abfangen von Interaktion mit den Bildern und Senden an den Server.

**LiveChat.js**

Anzeigen des LiveChats und Eingabe der Nachrichten ermöglichen.

**Playlist.js**

Verwaltet die Wiedergabe der Player (Reihenfolge, aktuelle Datei).

**Calendar.js**

Ermöglicht das Erstellen von Terminen und erstellt ICS-Datei.

**constants.js**

Speicherung aller Konstanten der Anwendung in einer Datei. 


## Server

**index.js** [Socket.io]

Zentrale Kommunikationsschnittstelle mit den Clients. Verwaltet alle anderen Server Module.

**AppServer.js** [express.js]

Managen des Express-servers.


**DBManager.js** [mongoose]

Verwaltet die Datenbank und die Speicherung verschiedener Dateien

**RoomManager.js** [node-uuid]

Erstellen eines neuen Raumes mit einer unqiue ID. 

**Views** [ejs]

index.ejs und room.ejs werden als Templates für die Html-Dateien verwendet.

![Darstellund des Designs](DesignBild.jpg)
