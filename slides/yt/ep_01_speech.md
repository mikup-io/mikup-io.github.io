Nella vita di tutti i giorni, "Risorsa" è un termine volutamente **generico**: un contenitore vuoto che può indicare di tutto e che quindi rischia di diventare **banale**.

In Mikup, questo concetto **cessa di essere astratto** e diventa il motore dell'intera architettura, dando vita al suo **manifest**: *"One grammar. Any resource. Any app."* 
Elevare la Risorsa a *first-class citizen* è ciò che **materializza questa promessa** di radicale semplificazione.

Vedremo come il fatto che tutto **transiti** attraverso questo "contenitore" universale renda incredibilmente <u>potente</u>, e allo stesso tempo <u>controllata</u>, qualsiasi attività del sistema.



#### 1. La Struttura della Risorsa

Vediamo quindi qual'è il <u>perimetro</u> che Mikup ha definito intorno al concetto di Resource analizzandone:

- l'**anatomia** -> com'è fatta

- il suo **ciclo di definizione** -> come prende vita



slide #01 - struttura e definizione

Una Resource in Mikup ha un'anatomia **precisa e flessibile**, progettata per <u>separare</u> sempre l'identità del dato dal suo payload. È composta da due elementi:

- **Metadata (Obbligatorio):** È il **cuore descrittivo** della risorsa. 
  Si tratta sempre di un oggetto (dati strutturati) che contiene tutte le <u>informazioni vitali</u>, il contesto e le regole necessarie al sistema per comprendere e instradare e ricercare la risorsa stessa.
- **Content (Opzionale):** È il **payload** effettivo che la risorsa trasporta. A seconda del caso d'uso, il contenuto può assumere due forme:
  - *Dati Strutturati:* Un oggetto (ad esempio: un profilo utente, una configurazione ...).
  - *Byte Stream:* Qualsiasi flusso di **dati grezzi o binari** (ad esempio, un documento PDF, un'immagine, un file audio).



#### 2. La Definizione: I Tre Verbi

Per **definire** una risorsa e inserirla nell'ecosistema Mikup, il sistema **esegue tre azioni chiave**. 
Queste azioni rappresentano il **ciclo vitale della definizione** di ogni risorsa:



1. **Qualify → FQN (Fully Qualified Name)**

   *Dargli un nome.* Il primo passo è l'identificazione. Qualificare una risorsa significa assegnarle un FQN, ovvero un nome univoco e assoluto che chiarisce in modo inequivocabile *cosa sia* e *a quale dominio appartenga* all'interno dell'intero progetto.

2. **Persist → Repository**

   *Decidere come gestirla fisicamente.* Una volta stabilita l'identità della Risorsa, il sistema deve sapere come conservarla. Questa fase delega ai *Repository* la responsabilità di definire le strategie di storage fisico (es. database relazionale, NoSQL, file system o object storage).

3. **Process → Processors**

   *(Eventualmente) elaborarla.* **Non tutte le risorse si limitano a esistere**. 
   Se una risorsa deve innescare una logica di business, subire una trasformazione, viene affidata ai *Processors*. 
   Questo step è opzionale ed entra in gioco prevalentemente in funzione del Resource-type dichiarato nei Metadata