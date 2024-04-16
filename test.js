const OpenAI = require('openai');

const apiKey = 
const organizationId = 
const assistantId = 

//let myAssistant=[];
let thread;
let message;
let contentMsg="what is btc?";
let answer;

const openai = new OpenAI({ organization: organizationId, apiKey });


const assistantBack =async ()=>{

    myAssistant = await openai.beta.assistants.retrieve(assistantId)
    .then(response => {
        console.log(`Assistente Caricato: ${response.name}
                    Istruzioni: ${response.instructions}
                    Modello: ${response.model}
                    Id:${response.id}
        `);
      const myAssistant=response;
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
      });


      // CREATE THE THREADS AND PASTE THE MSG
    const tempThread = await openai.beta.threads.create()
    .then(response => {
        console.log(`
                     Creazione Thread ID:${response.id}
                     Domanda:${contentMsg}
        `);
        thread=response;
        message = openai.beta.threads.messages.create(
            response.id,
            {
              role: "user",
              content: contentMsg
            }
          );

      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
      }).finally(
       // console.log('hai finito!')
      )

        //paste the promt
      //  console.log('adesso sei qui..', thread)


      //DEFAULT TESTING
      /*
        const run = await openai.beta.threads.runs.create(
            thread.id,
            { assistant_id: assistantId }
          ).then(response => {
            console.log(response)
            answer=response;
          }) .catch(error => {
            console.error('Si è verificato un errore:', error);
          }).finally(
            //console.log('domanda e risposta..finita!!!')
          )

          console.log(answer)
          */

        //   STREAMING WAY
    const stream = await openai.beta.threads.runs.create(
        thread.id,//"thread_123",
            { assistant_id: assistantId, stream: true }
          );
          let lista=[];
          for await (const event of stream) {
            //console.log(event);
            if(event.event==='thread.message.completed'){
                //console.log(event)
                //console.log(event.data.content[0].text.)
                console.log(`
                    Answer: ${event.data.content[0].text.value}
        `);
            }
            lista.push(event);
            }

           // console.log(myAssistant)
}

assistantBack();

