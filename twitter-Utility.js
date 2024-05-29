

const { TwitterApi } = require('twitter-api-v2');
var twitter = require('twitter-text');

let tweetMode=true;

//    TWITTER CLIENT
//
const client = new TwitterApi({
    appKey: process.env.API_KEY_TWITTER,
    appSecret: process.env.API_KEY_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    dangerouslyAllowBrowser: true
});
const bearer = new TwitterApi(process.env.BEARER_TOKEN);
const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;
//
//   END- TWITTER CLIENT

const tweet = async (msg) => {
  
    if(!tweetMode){
    console.log('Tweet Dev');
     return }
    try {
      const { data: createdTweet } = await twitterClient.v2.tweet(msg);
      console.log(`\n > Running tweet`)
      console.log('TweetID:',createdTweet);
    } catch (e) {
      console.log(e)
    }
}


  
const tweetImage = async (data) => {
  
   /* if(!tweetMode){
    console.log('Tweet Dev');
     return }
     
     */
     let title= data[data.length-1];
    try {
      const mediaId = await client.v1.uploadMedia('./image.png');
      const { data: createdTweet } = await twitterClient.v2.tweet(
        { text: `${title} Source:#CoinMarketCap #MarketCap #Crypto`, media: { media_ids: [mediaId] } }
      );
      console.log(`\n > Running tweet`)
      console.log('TweetID:',createdTweet);
    } catch (e) {
      console.log(e)
    }
}


const tweetCheck = (msg)=>{
    //CONTROLLA TWITTER TWEET
  const maxLength = 280; // Limite massimo di caratteri per un tweet
  let twitterOff=false;

    if (twitter.parseTweet(msg).weightedLength <= maxLength) {
        console.log('\nIl tweet ok!');
        return true
    } else {
        console.log('\nIl tweet supera il limite di caratteri!');
        twitterOff=false;
        return false
    }
}

const tweetPool = async (msg,pollOptions) => {
    const poolOp=pollOptions[1];
    const poolOp_two=pollOptions[2];
    try {
      const { data: createdTweet } = await twitterClient.v2.tweet(`Survey: ${pollOptions[3]} ${pollOptions[0]} `, {
        poll: { duration_minutes: 120, options: [poolOp, poolOp_two] }
      });
      console.log(`\n > Running tweet`)
      console.log('TweetID:',createdTweet);
    } catch (e) {
      console.log(e)
    }
}

const homeTimeline = async ()=> { await client.v2.userTimeline('6')
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

module.exports = { tweetCheck , tweetImage, tweet, tweetPool, tweetMode  }