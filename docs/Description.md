## WatchMates

WatchMates ist eine Anwendung, die es Usern erlaubt mit ihrer Familie/Freunden in digitalen Räumen Video-/Audiodateien synchron anzuschauen oder auch eine Diashow zu erstellen. 

Starten der Anwendung:

1. Master-Branch aus dem Respository laden und in einer IDE(empfohlen: VSC) öffnen
2. In der Konsole der IDE den Befehl "npm run start" ausführen
3. Im Browser die Seite: "http://localhost:8000/app/" aufrufen

Datenbank Zugriff(optional):
1. In VSC das Addon: "MongoDB for VS Code" installieren
2. Addon über die Auswahlleiste auswählen
3. Den Button "Add Connection" drücken
4. im Auswahlmenü die Option: "Connect with Connection String" auswählen
5. Den String: "mongodb+srv://Admin:MME2020@watchmates.jhgji.mongodb.net/WatchMatesDB?retryWrites=true&w=majority" in das Eingabefeld schreiben und bestätigen
6. In Connections erscheint nun der Eintrag: "watchmates.jhgji.mongodb.net"
7. Im Reiter WatchMatesDB sind die Datenbankeinträge gespeichert und werden beim Erstellen/Updaten der Räume aktualisiert

Funktionen der Anwendung:

Startseite:

Auf der Startseite sieht der User auf den ersten Blick ein kurzes Erklärvideo und eine Beschreibung über die Verwendung der Webseite. Es stehen drei Buttons zur Verfügung:
1. "Termin festlegen": Beim Drücken des Buttons geht ein PopUp-Overlay auf, in der man einen Termin(Datum und Uhrzeit) auswählen kann. Drückt man anschließend auf "Raum reservieren", erscheint ein kurzer Text, der einen darüber informiert, dass ein Raum reserviert wurde. Über den Button "Lade den Termin herunter" kann man eine "ICal-Datei" herunterladen und in der präferierten Kalenderapplikation (Bspw. Outlook) importieren.
2. "Einen Raum erstellen": Dieser Button leitet den User auf einen frischen Raum weiter
3. "Einem Raum beitreten": Dieser Button öffnet ein Inputfeld in der die URL eines bereits existierenden Raums( bspw: http://localhost:8000/app/8ab01af2-7278-4502-8379-f43461c4bc5a) eingegeben werden kann und bei korrekter ID/URL wird der User auf diesen Raum weitergeleitet.

Raum:

Sobald man im Raum angekommen ist, hat man die Möglichkeit einen Nickname anzugeben. Danach kann man über den Livechat Nachrichten an alle weiteren Personen im Raum senden und empfangen. Außerdem kann man den Sound für die Nachrichten über einen Button stumm stellen. Der Chat lässt sich auch einklappen, wodurch die Anwendung in den Kino-Modus übergeht. Um die Anwendung zu nutzen, kann jeder User im Raum Videos, Bilder oder auch Audio-Dateien in die Playlist hochladen. Dies geschieht über einen Upload Button oder auch eine Drag&Drop Funktion, die es erlaubt Dateien direkt in die Playlist zu ziehen. Sobald Dateien in der Playlist sind, lässt sich die Reihenfolge dieser ebenfalls über Drag&Drop ändern. Außerdem kann man auch einzelne Dateien wieder löschen. Zum Anschauen einer Datei muss man lediglich auf die Datei klicken oder durch Benutzung der Pfeiltasten zu ihr navigieren. Diese wird dann für alle Benutzer im Raum ausgewählt und entweder im Video Player oder im Bild Container angezeigt. Ein Video lässt sich durch das Klicken auf den Play-Button starten und über die Shortcuts("Leertaste","f","m","k") steuern. Dieses läuft dann synchron für alle Benutzer, dies gilt auch für Play/Pause Befehle oder dem skippen über die Timebar. Lediglich die Lautstärke ist einzigartig pro Client. Sobald ein Video/Audio fertig abgespielt wurde, wird automatisch das nächste Element in der Playlist angezeigt. Über den Button: "Kopiere die URL, um Freunde einzuladen" wird der Raumlink ins Clipboard kopiert.

Unterstütze Dateiformate: 
video: ["mp4", "webm"]
audio: ["mp3", "wav", "flac"]
image: ["jpg", "jpeg", "png"]
