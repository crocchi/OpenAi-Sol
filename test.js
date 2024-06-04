require('dotenv').config()
const OpenAI = require('openai');
var twitter = require('twitter-text');
const CronJob = require("cron").CronJob;
const fetch = require('node-fetch');

//arrAay con info,ARGOMENTI, HASHTAG, istruzioni per h4ckwiz
const { hashtagArray } = require("./hashtag.js")
const { argomenti , approaches ,solanaArgomenti, action } = require("./argomenti.js");
// { argomento: 'NFT Marketplaces', pnt: 0, used: 0, timestamp: [] }

//CONFIG
let timerLoop="01/58 * * * *"; //dal primo minuto..ogni 3 minuti
let thread;
let runStep;
let myBot;


//UTILITY
const { random , timeStamp, getInfoByContract, casual, extractOptions } = require("./utility.js");
// CREA image.png con statistiche token e h4ck.js(legge pagine coinmarketcap)
const { canvaa } = require("./canvas.js");
const { getCryptomistTrendNews } = require("./h4ck.js");
// utility twitter
const { tweetCheck , tweetImage, tweet, tweetPool, tweetMode }= require("./twitter-Utility.js")


//     EXPRESS - FUTURE UPDATE
//
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
//
//

//let myAssistant=[];
//"ciao, chi sei? presentati...sei libera di esprimerti tramite twitter, non più di 48 parole";
//  PRENDI CONFIGURAZIONI DA TWITTE !!CONFIG   !!SECONDSTEP X PENSARE DUE VOLTE PRIMA DI RISPONDERE
//
//   https://cointelegraph.com/rss


//sol WALLET :Y7xaqYLDSWw9nPDgfnh2Hk2yUA33uDUe1dzFoiUkEmC
let answer=[];

//OPENAI CONFIG ACCESS
const organizationId=process.env.ORGANIZATION_ID_OPENAI;
const api_key_openai=process.env.API_KEY_OPENAI;
const assistantId=process.env.ASSISTANT_ID_OPENAI;
console.log(api_key_openai);
console.log(assistantId);

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID_OPENAI,
  apiKey: process.env.API_KEY_OPENAI

});





const assistantBack =async ()=>{

  //RIPRISTINA ASSISTENTE - INIT H4CKWIZ
    myAssistant = await openai.beta.assistants.retrieve(assistantId)
    .then(response => {
        console.log(`Assistente Caricato: ${response.name}
                    Istruzioni: ${response.instructions}
                    Modello: ${response.model}
                    Id:${response.id}
        `);
      myBot=response;
      console.log(response)
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
      });

      //RETRIEVE A THREDS
      /*
      const myThread = await openai.beta.threads.retrieve(
        "thread_abc123"
      );*/

      // CREA IL THREADS E INCOLLA MSG
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
           console.log(event.data);
            if(event.event==='thread.message.completed'){
                //console.log(event)
                //console.log(event.data.content[0].text.)
                console.log(`
                    Answer: ${event.data.content[0].text.value}
        `);
        //writeTweet(event.data.content[0].text.value)
        tweet(event.data.content[0].text.value);

            }
            lista.push(event);
            }

           // console.log(myAssistant)
}


let functionArgs=[];
let jsonData;

const runStreaming = async (threadId)=>{
  
const run = openai.beta.threads.runs.stream(threadId, {
  assistant_id: assistantId,
  stream: true 
  })
  .on('textCreated', (text) => {
     process.stdout.write('\nassistant > ');

  })
  .on('runStepCreated', (runOb) =>{
    //console.log(runStep);
    runStep=runOb;
  })
  .on('textDelta', (textDelta, snapshot) => {
    process.stdout.write(textDelta.value);
    answer.push(textDelta);
    //console.log(textDelta)
  })
  .on('textDone', (content, snapshot) => {
   // console.log('text finito...')
   //console.log('content value: ',content.value);
   // console.log(snapshot)

   //CONTROLLA TWITTER TWEET
   const maxLength = 280; // Limite massimo di caratteri per un tweet
  let twitterOff=false;
  
  const checked=tweetCheck(content.value);
  if(!checked){
    return 'Il tweet supera il limite di caratteri!'
  }


   //controlla se è un pool tweet
   if(content.value.includes('Survey')){


    // Stringa di esempio
    const surveyString = content.value;
    //console.log('stringa:'+surveyString);
    //let optionsArray = extractOptions(surveyString);


// Funzione per pulire e dividere la stringa
function parseSurveyString(str) {
  // Rimuove i caratteri non stampabili (come \u0000) \n
  let cleanedString = str.replace(/\u0000/g, ' ').trim();
  
  // Usa regex per estrarre le parti necessarie
  let surveyTitle = cleanedString.match(/Survey:\s*(.*?)(\n|$)/)[1];
  let surveyInfo = cleanedString.match(/Info:\s*(.*?)(\n|$)/)[1];
  let options = cleanedString.match(/Option \d:\s*(.*?)(\n|$)/g).map(option => option.replace(/Option \d:\s*/, '').trim());

  return [surveyTitle, ...options, surveyInfo];
}

let parsedArray = parseSurveyString(surveyString);
console.log(parsedArray);

    // Utilizza l'espressione regolare per trovare tutte le opzioni dopo 'Option 1'
   /* const regex = /Option \d+: (.+?)(?= Option \d+: |$)/g;
    const matches = surveyString.matchAll(regex);
    
    // Crea un array per le opzioni
    const options = [];
    //console.log(matches)
    // Itera su tutte le corrispondenze e inserisci le opzioni nell'array
    for (const match of matches) {
      options.push(match[1]);
    }
    */
    //console.log(optionsArray)

    timeStamp();
    tweetPool(content.value,parsedArray)
   }else{
   timeStamp();
   tweet(content.value)
  //console.log('\ntweet')
  }
  })
  .on('toolCallCreated', (toolCall) => {
    // process.stdout.write(`\nassistant > ${toolCall.type}\n\n`)
     console.log(`Creazione ToolCall ID: ${toolCall.id}`)
     //console.log(thread)
  })
 
  .on('toolCallDone', async (toolCall) => { 
    console.log('here - toolCallDone');
    //console.log(toolCall.id)
    let tmpArgs=functionArgs.join("");
    tmpArgs=JSON.parse(tmpArgs);
    //console.log(tmpArgs);
    //let infoToken=await getInfoByContract(tmpArgs.address); // bug  qui gli ritorna una promise
    await getInfoByContract(tmpArgs.address)
    .then(res => {
      jsonData=JSON.stringify(res)
      console.log(`Risulatati ToolFunctionCall : ${res.name} Token`);

      // QUI INVIAMO LA RISPOSTA6n DEL TOOL INVOCATO E COMPLETATO
      //INVIAMO I DATI DEL TOKEN RICEVUTI
      //run_R5o8HgZi1nnu3p1VGfoSdZn4
      //submitToolInfo=(runId , callId , responseCall ,threadId=thread.id)
 
      submitToolInfo(runStep.run_id, toolCall.id, jsonData, thread.id );
    })

  })
  .on('end', () =>{ 
   // console.log('at the end of days...runstreaming');
      //sendExtraMsg(jsonData);
      functionArgs=[];
  })
  .on('toolCallDelta', (toolCallDelta, snapshot) => {
  //console.log(toolCallDelta);
   //console.log(snapshot);

   // let objec=JSON.parse(toolCallDelta.function);
    
    functionArgs.push(toolCallDelta.function.arguments)
    //console.log(functionArgs)


 /*      messages.push({
        tool_call_id: toolCall.id,
        role: "tool",
        name: functionName,
        content: functionResponse,
      }); 
*/



    //console.log(toolCall);
    if (toolCallDelta.type === 'code_interpreter') {
      if (toolCallDelta.code_interpreter.input) {
        process.stdout.write(toolCallDelta.code_interpreter.input);
      }
      if (toolCallDelta.code_interpreter.outputs) {
        process.stdout.write("\noutput >\n");
        toolCallDelta.code_interpreter.outputs.forEach(output => {
          if (output.type === "logs") {
            process.stdout.write(`\n${output.logs}\n`);
          }
        });
      }
    }


  });

  /*
  if(answer[0]){
    answerss.push(answer[0].value)
    timeStamp();
    tweet(answer[0].value)
  }
  console.log(functionArgs);
*/
 
  
  answer=[];
  

}

const createThread = async ()=>{

  const tempThread = await openai.beta.threads.create()
.then(response => {
    console.log(` Creazione Thread ID:${response.id}`);
    thread=response;
})

}

const createMsg = async (threadId,msg)=>{
  openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: msg || `dimmi una cosa interessante su ${random(argomenti).argomento} `
    }
  );
}

const resumeAssistant = async ()=>{

  myAssistant = await openai.beta.assistants.retrieve(assistantId)
  .then(response => {
      console.log(`\n
  Assistente Caricato: ${response.name}  \n  
  Modello: ${response.model}
  Id: ${response.id}
  Tools: ${response.tools[0].function.name}
  Temperature: ${response.temperature}\n
  File Inclusi: ${response.file_ids}\n
  Istruzioni: ${response.instructions}
      `);
    myBot=response;
   // console.log(response)
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
    });

}


const submitToolInfo = async (runId , callId , responseCall ,threadId=thread.id)=> {
  const stream = await openai.beta.threads.runs.submitToolOutputs(
    threadId,
    runId,
    {
      tool_outputs: [
        {
          tool_call_id: callId,
          output: responseCall
        },
      ],
      stream:true
    }
  )
 
  for await (const event of stream) {
    //console.log(event);
    if(event.event==='thread.message.completed'){
      const answer=event.data.content[0].text.value;
      console.log(answer);
      const checked=tweetCheck(answer);
      if(checked){
        tweet(answer)
      }
      
    }
   /* if(event.event==='thread.run.step.completed'){
      console.log(event.data.step_details.message_creation)
    }*/
  }

}


let istruzionii =[
  //`dimmi una cosa interessante su`,
  `Please generate a tweet about`,
  `Please generate a tweet and give examples to help people learn about`,
  `Tell me something about`,
  `start your response with the word 'Survey', Please generate a surveys with 2 option about`, //write me the 2 choiche inside a js array
  `Please generate a tweet and explain concepts in great depth using simple terms about`,
  `Please generate a tweet asking a question about`,
  `Tell me something sexy ,funny joke about crypto `
]

const cronTweet = new CronJob(timerLoop, async () => {
  console.log('\n CronJob ', timeStamp());
  //const address_token='J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn';
  //H4cwzkkLa8thnkdvfF7FCwcEteDyB9BRmjMgnNACTsGo - J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn
  //  ${casual(action)}  ${action[5].execute}
 //const temp=`can you give me info about this contract address... ${address_token} `;
  const temp=`${casual(action)} ${casual(argomenti)} ,add 2 twitter hashtag,remove annotation tag`;
  console.log('Crocchi < ',temp);

  
 if(temp.includes('STATS')){//SE ESCE AZIONE STATS
  await canvaa()
  .then( resp => tweetImage(resp) );
  
 }else if(temp.includes('getCryptomistTrendNews')){
  let tmpdt=await getCryptomistTrendNews();
  temp=`${action[0].execute} ${tmpdt[Math.floor(Math.random() * tmpdt.length)]} `;
  await createMsg(thread.id, temp);
  runStreaming(thread.id);

 }else{

  await createMsg(thread.id, temp)//temp); msgDemo
  runStreaming(thread.id);
 }


});


app.listen(port, () => {
  console.log(`Listening some RockMusic on port ${port}`)
})


const liveAI = async ()=>{
  await resumeAssistant()
  await createThread()
  //await createMsg(thread.id)
  //runStreaming(thread.id)
  cronTweet.start();
}


//assistantBack();
liveAI();

module.exports = { myBot }
