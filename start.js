const OpenAI = require('openai');
//const axios = require('axios');

const apiKey = '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';

//inizializza init
const openai = new OpenAI({
  organization: 'org-iF2FACP7DQSeJrGPjA3SCGzd',
                 //org-iF2FACP7DQSeJrGPjA3SCGzd
  apiKey: apiKey
});


async function resumeRobot() { 
// riprende assistente creato by id
const myAssistant = await openai.beta.assistants.retrieve(
    "asst_E7Jc6QF4BDw7pLPIC9AajTqR"
  );

  //create thread
  const thread = await openai.beta.threads.create();

  //paste the promt
  const message = await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: "what is solana?"
      }
    );

// Attendi la risposta dell'assistente
const response = await openai.beta.threads.messages.create(thread.id, {
  role: "assistant",
  content: "" // Assicurati di includere il parametro 'content' anche per la risposta dell'assistente
});

// Leggi la risposta dell'assistente
console.log("Risposta dell'assistente:", response.content);



    // Represents an execution run on a thread.
  const run = await openai.beta.threads.runs.create(
      thread.id ,
      { assistant_id: myAssistant.id }

    );


    console.log(run);



/*
  const run = await openai.beta.threads.createAndRun({
    myAssistant ,//assistant_id: "asst_abc123",
      thread: {
        messages: [
          { role: "user", content: "Explain deep learning to a 5 year old." },
        ],
      },
    });
  */


/*
let run = await openai.beta.threads.runs.createAndPoll(
    thread.id,
    { 
      assistant_id: myAssistant.id,
      instructions: "Please address the user as Jane Doe. The user has a premium account."
    }
  );

if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(
      run.thread_id
    );
    for (const message of messages.data.reverse()) {
      console.log(`${message.role} > ${message.content[0].text.value}`);
    }
  } else {
    console.log(run.status);
  }

  */
    console.log("msg:",message);
    console.log("thred",thread);
   console.log("myAssis",myAssistant);
  //  console.log(response);
  console.log("Risposta dell'assistente:", response.content);
  
}

async function create() { 

    const assistant = await openai.beta.assistants.create({
      name: "Openai Sol",
      instructions: "You are a personal crypto trader. Your favorite network is solana.",
      //tools: [{ type: "code_interpreter" }],
      tools: [{ type: "retrieval" }],
      file_ids: ["https://latitanti.altervista.org/train/solana-blockchain.pdf"], //bisogna prima caricare il file *error
      model: "gpt-3.5-turbo"
    });

    const thread = await openai.beta.threads.create();

    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: "what is an ETS?"
        }
      );

  }



async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",//text-embedding-3-small , gpt-3.5-turbo , 
        /*
        whisper-1   
        gpt-4-turbo-preview
        */
   });
  
    console.log(completion.choices[0]);
  }
  
  //main();
 // create();
  resumeRobot()

/*
const apiUrl = 'https://api.openai.com/v1/completions';

const requestBody = {
    prompt: 'Scrivi qui il testo di partenza per generare altro testo...',
    max_tokens: 50 // Numero massimo di token da generare
  };
  
  axios.post(apiUrl, requestBody, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log('Testo generato:', response.data.choices[0].text);
  })
  .catch(error => {
    console.error('Si è verificato un errore:', error);
  });
  */