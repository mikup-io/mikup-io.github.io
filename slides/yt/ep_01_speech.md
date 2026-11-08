Intro

Nella vita di tutti i giorni, "Risorsa" è un termine volutamente **generico**: un contenitore che può indicare tutto e niente e che quindi rischia di diventare **insignificante**.

In Mikup, questo concetto **cessa di essere astratto** e diventa il motore dell'intera architettura, <u>dando vita</u> al suo **manifest**: *"One grammar. Any resource. Any app."* 
Elevare la Risorsa a *first-class citizen* è ciò che **materializza questa promessa** di radicale semplificazione.

#### 1. La Resource
In Mikup tutto ruota attorno a questo concetto di **Resource**. 
Ogni <u>flusso di lavoro</u>, ogni <u>salvataggio</u>, ogni <u>elaborazione</u> **parte** da una Resource e **finisce** in una Resource. 
<u>Capire</u> cos'è e come funziona, significa capire Mikup.
Vedremo che è proprio il fatto che tutto **transita** attraverso questo "contenitore" universale a rendere incredibilmente <u>potente</u>, e allo stesso tempo <u>controllata</u>, qualsiasi **attività** del sistema.



2. Due chiavi di lettura

Per capire davvero il paradigma, basta rispondere a  **due domande**. 
La prima: **com'è fatta**? È la sua <u>anatomia</u>, la sua struttura
La seconda: **come prende vita**? E quindi come viene <u>definita</u>, in tre passaggi.



#### 3. Anatomia

Partiamo dall'anatomia. 
Una Resource ha **due parti**, e le tiene sempre separate. 
Da un lato i **Metadati**, <u>obbligatori</u>: sono la sua "identità". 
Dall'altro i **Contenuti**, sono <u>facoltativi</u>: costituiscono il "payload" trasportato. 
Identità e contenuto non si confondono mai.



#### 4. Metadata

I **Metadata** sono il **cuore descrittivo** della Resource, e sono sempre un <u>oggetto standard in formato Mikup</u>. 
Al loro interno c'è <u>sempre almeno un gruppo</u> di **props**: *identificativo*, *tipo*, *permessi*, *date di creazione e di modifica*, *proprietario*, *formato* e *dimensione* del contenuto. 
Poi ci sono gli **attrs**, gli attributi <u>propri di quella singola Resource</u>.
Il sistema usa <u>attributi e proprietà</u> in due modi:
Primo: **per catalogare** le Resource. 
Secondo: **per cercarle**, in funzione del <u>profilo dell'utente</u> e dei <u>parametri di ricerca</u>.



#### 5. Content

Il **Content** è ciò che la Resource trasporta, ... quando trasporta qualcosa. 
Può avere due forme. 
Dati <u>strutturati</u>: ancora un **oggetto standard Mikup**, serializzato in JSON o in YAML. 
Oppure un **byte stream**: qualsiasi flusso binario, un PDF, un'immagine, un file audio. 
Quindi: stessa struttura, per qualunque tipo di contenuto.



#### 6. I tre verbi

Ora vediamo come una Resource **prende vita**. Cioè quali sono le condizioni minime affinchè si possa dire che esiste.
Bastano tre verbi. 
**Qualify**: le diamo un nome, l'<u>FQN</u>. 
**Persist**: decidiamo <u>come conservarla</u>, con un <u>Repository</u>. 
**Process**: se serve, la elaboriamo, con i <u>Processors</u>. 
Il terzo passaggio è tratteggiato, perché è facoltativo.



#### 7. Qualify

Primo verbo: **Qualify**. 
Qualificare una Resource significa **darle un Fully Qualified Name**, un <u>nome unico e assoluto</u>. 
La <u>grammatica</u> proposta è semplice ma potente: vediamo esserci un <u>prefisso</u> facoltativo, il <u>nome</u> "strutturato" della risorsa, (che è l'unica parte obbligatoria), poi parametri (di risorsa), selettori, estensione e parametri (generici). 

Quello che è in grado di definire una Resource a prescindere da tutto è il **ResPath** (in giallo), che infatti è <u>obbligatorio</u> ed è sufficiente a disambiguarla a livello di intero progetto.
Come si può intuire, il fatto di gestirlo attraverso un <u>path</u> consente di introdurre il concetto di **gerarchicità**, cje vederemo essere molto importante.

Infatti, oltre al **prefix**, che consente l'instradamento "forzato" verso un Repository specifico, tutte le altre sezioni <u>consentono di indicare "varianti"</u> sul modo in cui la Resource verrà trattata. ma non incidono sulla disambiguazione...  (neanche l'estensione).
L'interpretazione di queste varianti è delegata agli eventuali Processor



#### 8. Persist

Secondo verbo: **Persist**. Una volta stabilito un nome per la Resource, bisogna decidere come e dove **conservarla fisicamente**. 
Questa responsabilità è delegata al **Repository**. 
Database relazionale, NoSQL, file system, object storage: **la strategia la sceglie il Repository**. 
La Resource <u>resta la stessa</u> anche se il "luogo" in cui viene resa persistente cambia nel tempo.



#### 9. Process

Terzo verbo: **Process**. 
Non tutte le Resource devono fare qualcosa: molte, semplicemente, si limitano ad <u>esistere.</u> 
Ma quando una Resource deve attivare una <u>logica di business</u>, subire una <u>trasformazione</u> o <u>dialogare</u> con sistemi esterni, viene affidata ai Processors. 
Entrano in gioco <u>solo quando c'è davvero qualcosa da fare</u> e possono essere invocati deliberatamente o, più spesso, implicitamente se abbinati ad un <u>Resource Type</u>.



#### 10. Scripting di dominio

Vediamo adesso una Resource utilizzata in un semplice script applicativo
Con l'operazione di **resolve** otteniamo la Resource a partire dal suo **FQN** e dal <u>contesto</u>. 
A quel punto diventano implicitamente disponibili i metadati.
Il suo **content**, che il Repository potrebbe decidere di gestire anche differentemente (dai metadati), viene recuperato su richiesta (attraverso il "getContent").
Possiamo a questo punto applicare  la nostra <u>logica di dominio</u> (su metadata e/o content). 
E con **save** possiamo salvarla.



#### 11. Tutto può essere una Resource

Come vediamo in questa slide, la stessa chiamata funziona per cose molto diverse. 
Il risultato di una **query** su un DataSource qualsiasi. 
Un **asset**, come un'immagine. 
Perfino un **comando**, come la stampa di una fattura. 
In Mikup, tutto può (e deve) essere una Resource.



#### 12. La Resource in sintesi

Ecco il diagramma che ci fornisce il **quadro d'insieme**.  
Un **FQN**  identifica la Resource. 
La Resource si appoggia al **Repository** per essere persistente.
Con una "resolve" si ottiene il MKO che contiene i **Metadata**.
Come **Content** si ottiene uno stream, direttamente o passando per un Processor. 
Essendo il modello sempre lo stesso, <u>sia per l'input che per l'output</u> verso il sistema, la <u>gestione del Content</u> prevede il passaggio di un ResourceContext 



#### 13. Dov'è il Web in tutto questo?

Pensare ad una Resource come a qualcosa che sta sul web è più che naturale ...
Ma ... Dov'è il Web in tutto questo? ... Quando una Resource diventa web? 
La risposta è: **Quando c'è un Connector che la espone**. 
E' possibile prevedere come Connectors servizi (e quindi protocolli) di qualsiasi tipo, un esempio sono: HTTP, FTP, TCP, ...
Il diagramma è quello di prima, quello <u>standard di Mikup</u> a cui è stato anteposto un layer che usa le API standards



#### 14. Una Resource via HTTP

Vediamo nella pratica un esempio che usa un Connector HTTP. 

A sinistra, i client: un browser, un'applicazione, un semplice comando curl. 
Tutti fanno la stessa cosa: inviano una **request http** e ricevono una **response**. 
Ecco che il fatto di <u>non aver bisogno di un web container</u> finalmente prende corpo: 
Basta infatti avere un **servizio http minimale** per sfruttare tutte le altre funzionalità e potenzialità di Mikup, in comune con tutto il resto del sistema.
Negli esempi riportati in basso, le stesse Resource che abbiamo visto prima, vengono raggiunte con curl: il login, un'immagine che richiede autenticazione, il risultato di una query in JSON, la stampa di una fattura. 
**Il percorso dell'URL non è altro che l'FQN**. ... E nient'altro.

#### 15. Nel prossimo video: MKO

Un'ultima cosa, prima di chiudere:
Avete visto comparire più volte la sigla **MKO**: 
si tratta del **Mikup Object**, il componente del sistema che consente di proiettare Mikup verso l'uso <u>dell'Ontologia</u> e della <u>Semantica</u>.
Infatti è il modo in cui, grazie a dei **contenuti strutturati**, diventa possibile rappresentare in modo formale e non ambiguo **qualsiasi espressione della realtà che ci circonda**, sia <u>materiale</u> che <u>immateriale</u>.
Qualsiasi "Informazione" quindi, in Mikup, è <u>rappresentata</u> sempre da una <u>Resource</u> che contiene **due byte stream** decodificabili in modo standard: appuinto due MKO:
Uno che rappresenta i  "Metadata" ed uno che rappresenta il vero e proprio "Contenuto".
Mikup definisce un suo data model, un formalismo per la definizione degli oggetti, pensato per rispondere alle necessità fondamentali dello sviluppo di applicazioni.

















