# 0.4: Uusi muistiinpano

```mermaid
sequenceDiagram
    participant selain
    participant palvelin

    Note right of selain: Selain lähettää syötetyn datan palvelimelle. Palvelimen koodi luo ja siirtää olio muistiinpanon eteenpäin.

    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate palvelin
    palvelin-->>selain: Http statuskoodi 302 eli uudelleenohjauspyyntö, osoitteeseen /notes.
    Note left of palvelin: palvelin kehottaa selainta tekemään automaattisesti uuden HTTP GET -pyynnön /osoitteeseen notes
    deactivate palvelin
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate palvelin
    Note right of selain: Selain lataa uudelleen muistiinpano sivun. Sivunlataus saa aikaan myös kolme muuta HTTP-pyyntöä: (main.css),(main.js),(data.json)
    palvelin-->>selain: HTML tiedosto
    deactivate palvelin
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate palvelin
    palvelin-->>selain: Css tiedosto
    deactivate palvelin
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate palvelin
    palvelin-->>selain: Javascript tiedosto
    deactivate palvelin
    
    Note right of selain: Selain aloittaa javascript koodin joka hakee Json tiedoston palvelimelta.
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate palvelin
    palvelin-->>selain: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate palvelin    

    Note right of selain: selain suorittaa tapahtumankäsittelijän, joka renderöi muistiinpanot ruudulle
```

# 0.5: Single Page App

```mermaid
sequenceDiagram
    participant selain
    participant palvelin

    Note right of selain:  Sivunlataus saa aikaan kolme HTTP-pyyntöä: html, css, js. js aloittaa Json tiedoston pyynnön.
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate palvelin
    palvelin-->>selain: HTML tiedosto
    deactivate palvelin
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate palvelin
    palvelin-->>selain: Css tiedosto
    deactivate palvelin
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate palvelin
    palvelin-->>selain: Javascript tiedosto
    deactivate palvelin
    
    Note right of selain: Javascript aloittaa koodin joka hakee JSON tiedoston palvelimelta, jonka jälkeen suorittaa funktion reDrawNotes joka tekee muistiinpanot sivulle.
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate palvelin
    palvelin-->>selain: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate palvelin 
  
```

# 0.6: Uusi muistiinpano

```mermaid
sequenceDiagram
    participant selain
    participant palvelin

    
    Note right of selain: Kun muistiinpano submitoidaan, tapahtumankäsittelijän e.preventDefault() estää lomakkeen oletusarvoisen toiminnan (lähetys, uudelleen lataus tms..), eikä sivua ladata uudelleen.
    Note right of selain: Javascript->( työntää uuden datan noteseihin, notes lista uudelleenkirjoitetaan, ja uusi muistiinpano lähetetään palvelimelle /new_note_spa POST määrityksillä javascriptissä, JSON muodossa.)
    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate palvelin
    palvelin-->>selain: Status code: 201 created. "POST pyyntö onnistui ja uusi resurssi luotiin."
    Note left of palvelin: Selain pysyy samalla sivulla ja uudelleenohjausta ei suoriteta.
    deactivate palvelin

```