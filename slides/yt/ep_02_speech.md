# MK Objects and Ontology

Finalmente mettiamo da parte per un po' le Resource per concentrarci sull'essenza interiore del sistema: i Mikup Objects
Per oggetti intendiamo quello che normalmente siamo abituati a gestire nelle nostre codebase attraverso classi e istanze e che in Mikup si spostano a Run time.
Vedremo all'inizio qualche slide teorica per fissare i concetti fondanti per poi passare ad una esempio reale di modellazione.



**Slide 1: Obj, l’elemento base**
*Circa 40–45 secondi*

> Per capire il modello dati di Mikup partiamo dal suo elemento fondamentale: `Obj`.
>
> Un `Obj` è un nodo che descrive una parte dell’informazione. Ha un nome e, eventualmente, una descrizione; può dichiarare un tipo, contenere attributi e avere proprietà associate.
>
> La caratteristica importante è che questo stesso elemento viene utilizzato a ogni livello: può rappresentare lo schema principale, un suo attributo oppure lo schema delle proprietà.
>
> In questo modo Mikup usa una costruzione uniforme, semplice da riconoscere, per descrivere sia elementi elementari sia strutture più articolate. Vediamo come si costruiscono queste strutture.

**Slide 2: Gli attributi costruiscono la struttura**
*Circa 40–45 secondi*

> Gli attributi, identificati da `attrs`, definiscono la struttura del dato. Ma non sono semplicemente nomi associati a un tipo: ciascun attributo è a sua volta un `Obj` e può quindi contenere altri attributi.
>
> Nell’esempio, una persona ha un nome, un indirizzo e dei contatti. L’indirizzo si articola ulteriormente in via e città, mentre i contatti comprendono email e telefono.
>
> Possiamo così descrivere strutture gerarchiche a profondità variabile, usando sempre lo stesso meccanismo. L’immagine che ne risulta è quella di un albero di nodi e relazioni, un caso particolare del concetto più generale di grafo.
>
> La struttura, però, non è l’unica informazione che possiamo associare a questi nodi.

**Slide 3: Le proprietà dello schema**
*Circa 45–55 secondi*

> Ogni nodo dello schema può avere proprie proprietà, indicate con `props`. Possiamo definirle sull’oggetto principale, su un attributo e anche su un attributo annidato, a qualsiasi profondità.
>
> Le proprietà hanno una caratteristica interessante: appartengono allo schema, ma possiedono a loro volta una struttura e valori associati. Non descrivono quindi soltanto quali informazioni sono previste: ne contengono anche i valori.
>
> Questo permette, per esempio, di associare al dato informazioni che ne orientano l’interpretazione o il comportamento. Il loro effetto concreto dipende dal componente che le legge: dichiarare una proprietà non significa, da solo, eseguire automaticamente un comportamento.
>
> Abbiamo quindi uno schema che descrive sia la struttura sia le proprietà associate ai suoi elementi.

**Slide 4: Dallo schema ai dati**
*Circa 45–55 secondi*

> A questo punto distinguiamo lo schema dai dati che lo utilizzano. `Obj` descrive la struttura e le proprietà condivise. Un `OValue` rappresenta un singolo valore associato a quello schema; un `OVList` rappresenta invece una lista di valori che condividono lo stesso schema.
>
> Possiamo pensare, per esempio, allo schema di una persona e poi a una singola persona oppure a un elenco di persone descritte nello stesso modo.
>
> Schema e valori possono essere serializzati in JSON o YAML, secondo regole comuni, per essere conservati o scambiati.
>
> La distinzione è importante: **il modello descrive struttura, proprietà e valori; la serializzazione è una rappresentazione del modello**, non il modello stesso.

**Slide 5: Il confronto con la programmazione a oggetti**
*Circa 45–55 secondi*

> Per orientarci possiamo fare un confronto con concetti familiari della programmazione a oggetti.
>
> Un `Obj` può ricordare la definizione di una classe: ha un nome, una descrizione, un tipo e una raccolta di attributi. Anche le proprietà possono richiamare, per analogia, informazioni associate a una dichiarazione, come le annotazioni.
>
> Il paragone però ha dei limiti. Un `Obj` non è necessariamente una classe Java e il suo tipo non va interpretato sempre come il nome completo di una classe: può indicare, per esempio, anche un tipo scalare come `String`. Inoltre, le `props` sono valori strutturati con un proprio schema, non semplici annotazioni.
>
> Il punto è che Mikup usa questi elementi per descrivere dati e significato in modo uniforme, indipendentemente dal solo paradigma della programmazione a oggetti.

**Slide 6: Ogni Mikup Object è rappresentabile con una stringa**
Circa 45–55 secondi*

> Il fatto che ogni oggetto sia rappresentabile con una stringa (cioè serializzato),potrebbe sembrare scontato e banale, ma in realtà non lo è affatto, e il modo di farlo fa decisamente la differenza.
>
> Partendo da sinistra:
> Il formato CSV ha il vantaggio di essere compattissimo e, rispetto ad una generica matrice alfanumerica, di nominare le colonne dati che contiene
>
> Il documento JSON aggiunge una caratteristica importante: quella di consentire la definizione di strutture gerarchiche, ad albero. Ovviamente è meno conciso di un CSV
>
> L'oggetto Mikup ha una serie di vantaggi, tutti importantissimi:
> - intanto è una struttura standard, riconosciuta, perchè utilizza indistintamente JSON o YAML
> - consente la definizione di alberi di nodi gerarchici, come il documento JSON
> - concentra lo "schema" nella parte iniziale dello stream
> - aggiunge la tipizzazione del dato
> - aggiunge la possibilità di definire proprietà illimitate a qualsiasi nodo
> - memorizza i valori con la stessa compattezza del CSV
> - gestisce la mutation, cioè lo stato dell'intero oggetto memorizzandone i cambiamenti
> - 
>
> Qui abbiamo lo stesso insieme di persone espresso in quattro modi. Il CSV è compatto, mentre il JSON tradizionale rende espliciti i nomi dei campi, ripetendoli però per ogni elemento.
>
> Nelle rappresentazioni Mikup, invece, lo schema viene dichiarato una sola volta: definisce gli attributi e, dove necessario, i loro tipi. Seguono poi i valori, ordinati secondo gli attributi dello schema.
>
> JSON e YAML sono due forme testuali diverse della stessa rappresentazione. Il punto importante è che possiamo scambiare non solo i dati, ma anche la struttura necessaria per interpretarli.



- Viene dall'esperienza di: OOP e Orm (comparazione)

- Obiettivo: auto-consistenza: schema+values

- Spiegare la differenza tra attrs e props

- Obiettivo: concisione (performance)

- Rappresentazione come stringa (rendering) per essere memorizzabile e "trasferibile"

- Gestione dello "stato" (Mutation) - è attiva su instance = single o multiple (no struttura)

- Primitive types vs Custom sub-types

- Included sub-types: EntityObj and OrmObj

  

L'accezione di **Ontologia** a cui Mikup fa riferimento non'è quella Web Semantica o accademica di alcuni framework esistenti da tempo (e.g. RDF/OWL) ma più vicina a quella che ho scoperto essere, ad esempio, di Palantir: incentrata su **relazioni generiche** (link) e <u>specializzabili</u> a vari livelli, da quello più descrittivo consentito dalle **props** a quello più dichiarativo gestibile attraverso i **sub-types**.

L'ontologia non viene gestita sfruttando la nidificazione dei nodi degli oggetti ma si pone a livello di Resource Layer perchè si definisce introducendo **riferimenti** ad altre Resource, quindi utilizzando degli FQN



Chiusura con screenshot del **Mikup Modeler** 