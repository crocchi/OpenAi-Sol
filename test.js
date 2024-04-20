require('dotenv').config()
const OpenAI = require('openai');
const { TwitterApi } = require('twitter-api-v2');
const CronJob = require("cron").CronJob;


//    TWITTER CLIENT
//
const client = new TwitterApi({
    appKey: process.env.API_KEY_TWITTER,
    appSecret: process.env.API_KEY_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET
});
const bearer = new TwitterApi(process.env.BEARER_TOKEN);
const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;
//
//    END TWITTER CLIENT


//     EXPRESS - FUTURE UPDATE
//
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
//
//

//let myAssistant=[];
let thread;
let message;
let contentMsg="what is sol?, max 50 word";
let answer;

//OPENAI CONFIG ACCESS
const organizationId=process.env.ORGANIZATION_ID_OPENAI;
const API_KEY_OPENAI=process.env.API_KEY_OPENAI;
const assistantId=process.env.ASSISTANT_ID_OPENAI;

const openai = new OpenAI({ organization: organizationId, API_KEY_OPENAI });




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
        writeTweet(event.data.content[0].text.value)

            }
            lista.push(event);
            }

           // console.log(myAssistant)
}

const tweet = async (msg) => {
  try {
    const { data: createdTweet } = await twitterClient.v2.tweet(msg);
  } catch (e) {
    console.log(e)
  }

  console.log(createdTweet)
}

const homeTimeline = async ()=> { await twitterClient.v2.userTimeline('6')
.then(response =>{
  for (const fetchedTweet of response) {
    console.log(fetchedTweet);
  }
})
}

const replayTweet = async (msg,id) => {

  await twitterClient.v2.reply(
    msg , id
    //createdTweet.id,
  );
}

//assistantBack();
//tweet("Hello world!");
homeTimeline();

app.listen(port, () => {
  console.log(`Listening some RockMusic on port ${port}`)
})
