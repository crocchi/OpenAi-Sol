const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const { getFeed } = require("./h4ck.js")

const width = 1200;
const height = 675;

const run = async ()=>{ 

    let data =await getFeed();
    console.log(data);
// Add post object with the content to render
const post = {
  title: "H4kwiz",
  twitter_name: "@OpenAiSol_",
  title_tweet : "TRENDING CRYPTO",
  title_tweet_source : "CoinMarketCap",
  token_tweet:''
}
// Set the coordinates for the image position.
const imagePosition = {
    w: 150,
    h: 149,
    x: 10,
      y: 20,
  };

// Set the coordinates for the text position.
const textPosition = {
    xw: 89,        // larghezz
      yh: 200,     //altez
  };

const titleTweetPosition = {
    x: 500,        // larghezz
      y: 120,     //altez
  };

const tweetInfo = {
     x: 440,        // larghezz
      y: 120,     //altez
      tokenLegenda:`
            🔥 TRENDING  ($)    24h  
             `,
      tokenList: `  

      ${data.Trending['1'].name} (${data.Trending['1'].price})    [${data.Trending['1'].change}]
      ${data.Trending['2'].name} (${data.Trending['2'].price})    [${data.Trending['2'].change}]
      ${data.Trending['3'].name} (${data.Trending['3'].price})    [${data.Trending['3'].change}]

      `
  };
 
  const mostVisited = {
    x: 440,        // larghezz
     y: 120,     //altez
     tokenLegenda:`
            👁️‍🗨️ ​MOST VISITED  ($)    24h  
            `,
     tokenList: `  

     ${data['most viewed']['1'].name} (${data['most viewed']['1'].price})    [${data['most viewed']['1'].change}]
     ${data['most viewed']['2'].name} (${data['most viewed']['2'].price})    [${data['most viewed']['2'].change}]
     ${data['most viewed']['3'].name} (${data['most viewed']['3'].price})    [${data['most viewed']['3'].change}]


     `
 };

 const topGainers = {
    x: 440,        // larghezz
     y: 120,     //altez
     tokenLegenda:`
            ⬆️​ TOP GAINERS  ($)    24h  
            `,
     tokenList: `  

     ${data['Biggest gain']['1'].name} (${data['Biggest gain']['1'].price})    [${data['Biggest gain']['1'].change}]
     ${data['Biggest gain']['2'].name} (${data['Biggest gain']['2'].price})    [${data['Biggest gain']['2'].change}]
     ${data['Biggest gain']['3'].name} (${data['Biggest gain']['3'].price})    [${data['Biggest gain']['3'].change}]


     `
 };

 const topLosers = {
    x: 440,        // larghezz
     y: 120,     //altez
     tokenLegenda:`
            ⬇️​ TOP LOSERS  ($)    24h  
            `,
     tokenList: `  

     ${data.Losers['1'].name} (${data.Losers['1'].price})    [${data.Losers['1'].change}]
     ${data.Losers['2'].name} (${data.Losers['2'].price})    [${data.Losers['2'].change}]
     ${data.Losers['3'].name} (${data.Losers['3'].price})    [${data.Losers['3'].change}]


     `
 };

 const recentlyAdded = {
    x: 440,        // larghezz
     y: 120,     //altez
     tokenLegenda:`
            🆕​​ RECENTLY ADDED  
            `,
     tokenList: `  

     ${data['recently Added']['1'].name} (${data['recently Added']['1'].price})    
     ${data['recently Added']['2'].name} (${data['recently Added']['2'].price}) 
     ${data['recently Added']['3'].name} (${data['recently Added']['3'].price}) 


     `
 };
 
 const hotDexPairs= {
    x: 440,        // larghezz
     y: 120,     //altez
     tokenLegenda:`
            🔥​​ HOT DEX PAIRS ($)    24h  
            `,
     tokenList: `  

     ${data['Hot Dex']['1'].name} (${data['Hot Dex']['1'].price})    [${data['Hot Dex']['1'].change}]
     ${data['Hot Dex']['2'].name} (${data['Hot Dex']['2'].price})    [${data['Hot Dex']['2'].change}]
     ${data['Hot Dex']['3'].name} (${data['Hot Dex']['3'].price})    [${data['Hot Dex']['3'].change}]


     `
 };


const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

const colori =["#764abc","#5f95c9","#373a43","#45037a" ];
let randomColor=colori[Math.floor(Math.random() * colori.length)];
context.fillStyle = randomColor;
context.fillRect(0, 0, width, height);

//aggiungi riga verticale
context.fillStyle = "black";
context.fillRect(0, 0, 180/*lunghez*/, 816);

// Set the style of the test and render it to the canvas
context.font = "bold 20pt 'Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";
// 600 is the x value (the center of the image)
// 170 is the y (the top of the line of text)
const { xw, yh } = textPosition;
context.fillText(post.title, xw, yh);

//add twitter account name
context.font = "18pt 'Sans'";
context.textAlign = "center";
context.fillStyle = randomColor;
context.fillText(`@OpenAiSol_`,  xw, yh+25);

//add title info
context.font = "60pt 'MS Gothic'";//Segoe Script-MS Gothic
context.textAlign = "center";
context.fillStyle = "#ff1";
context.shadowColor = 'black';
context.shadowBlur = 6;
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.fillText(`${post.title_tweet}`,  titleTweetPosition.x,titleTweetPosition.y);
context.shadowBlur = 0;
context.shadowOffsetX = 0;
context.shadowOffsetY = 0;
//ADD source
context.font = "30pt 'Sans'";
context.textAlign = "center";
context.fillStyle = "#fff";
let xX=titleTweetPosition.x+( post.title_tweet.length * 30)
let yY=titleTweetPosition.y-15;
context.fillText(`${post.title_tweet_source}`,  xX , yY );
//add logo source
loadImage("./coinmarketcap_logo.png").then((image) => {
    context.drawImage(image, 1085/*x*/, 50/*y*/, 80, 80);
  
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);
  });




//ADD TOKEN
context.font = "23pt 'Sans'";
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(`${tweetInfo.tokenLegenda}`,  80,140);
context.fillStyle = "BLACK";
context.font = "18pt 'Sans'";
context.textAlign = "left";
context.fillText(`${tweetInfo.tokenList}`,  215,155);

//ADD TOKEN MOST VISITED
context.font = "23pt 'Sans'";
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(`${mostVisited.tokenLegenda}`,  570,140);
context.fillStyle = "BLACK";
context.font = "18pt 'Sans'";
context.textAlign = "left";
context.fillText(`${mostVisited.tokenList}`,  700,155);

//aggiungi riga
context.fillStyle = "white";
context.fillRect(200, 300, 920/*lunghez*/, 6);

//add token - Top Gainers
context.font = "23pt 'Sans'";
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(`${topGainers.tokenLegenda}`,  80,320);
context.fillStyle = "BLACK";
context.font = "18pt 'Sans'";
context.textAlign = "left";
context.fillText(`${topGainers.tokenList}`,  215,335);

//add token - Top Losers
context.font = "23pt 'Sans'";
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(`${topLosers.tokenLegenda}`,  570,320);
context.fillStyle = "BLACK";
context.font = "18pt 'Sans'";
context.textAlign = "left";
context.fillText(`${topLosers.tokenList}`,  700,335);

//aggiungi riga
context.fillStyle = "white";
context.fillRect(200, 480, 920/*lunghez*/, 6);


//add token - recentlyAdded
context.font = "23pt 'Sans'";
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(`${recentlyAdded.tokenLegenda}`,  80,500);
context.fillStyle = "BLACK";
context.font = "18pt 'Sans'";
context.textAlign = "left";
context.fillText(`${recentlyAdded.tokenList}`,  215,515);


//Hot DEX Pairs
context.font = "23pt 'Sans'";
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(`${hotDexPairs.tokenLegenda}`,  570,500);
context.fillStyle = "BLACK";
context.font = "18pt 'Sans'";
context.textAlign = "left";
context.fillText(`${hotDexPairs.tokenList}`,  700,515);

// Load the logo file and then render it on the screen.
loadImage("./picture_h4kwiz.png").then((image) => {
    const { w, h, x, y } = imagePosition;
    context.drawImage(image, x, y, w, h);
  
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);
  });

}

run()