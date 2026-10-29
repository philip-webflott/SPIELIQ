# ADR 0003 – Eigene, schlanke Sitzungsverwaltung statt Auth-Bibliothek

- Status: angenommen · Datum: 29.10.2026

## Kontext
Spielerkonten (oft unter 16) sollen ohne E-Mail auskommen (Datensparsamkeit), Anmeldung mit generiertem Anmeldenamen, Passwort-Reset durch den Trainer. Verbreitete Bibliotheken (z. B. Better Auth, Auth.js) setzen eine E-Mail im Benutzermodell voraus oder bringen viel nicht benötigte Funktionalität mit.

## Entscheidung
Eigene Umsetzung nach bewährtem Muster: scrypt-Hashes (Node-Bordmittel), Zufallstoken im HttpOnly-Cookie, nur Token-Hash in der Datenbank, gleitender Ablauf, Drosselung von Fehlversuchen, Prüfung in jeder Server Action. Umfang < 300 Zeilen, vollständig getestet.

## Konsequenzen
+ Volle Kontrolle über Datensparsamkeit und Kinderkonten; keine überflüssigen Felder.
+ Kleine, prüfbare Angriffsfläche.
− Funktionen wie E-Mail-Verifikation, Passwort-Reset für Erwachsene, 2FA müssen selbst ergänzt werden (im Entwicklungsplan).
− Sicherheitsreview vor Echtbetrieb zwingend.
