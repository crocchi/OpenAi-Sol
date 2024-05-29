const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const { getFeed , getCMCfeed } = require("./h4ck.js")

const width = 1200;
const height = 675;



const loadImg = async(url,x,y,imageSizeX=25,imageSizeY=25) =>{

    loadImage(url).then((image) => {
        context.drawImage(image, x/*x*/, y/*y*/, imageSizeX, imageSizeY);
      
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync("./image.png", buffer);
      });
}

const run = async ()=>{ 

    const loadImg = async(url,x,y) =>{

        loadImage(url).then((image) => {
            context.drawImage(image, x/*x*/, y/*y*/, 25, 25);
          
            const buffer = canvas.toBuffer("image/png");
            fs.writeFileSync("./image.png", buffer);
          });
    }


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
    xw: 85,        // larghezz
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
            🔥 TRENDING     ($)            24h  
             `,
      tokenList: `  

      ${data.Trending['1'].name} (${data.Trending['1'].price})  
      ${data.Trending['2'].name} (${data.Trending['2'].price})  
      ${data.Trending['3'].name} (${data.Trending['3'].price})  

      `,
      tokenChange: `  

      [${data.Trending['1'].change}]
      [${data.Trending['2'].change}]
      [${data.Trending['3'].change}]

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

const colori =["#764abc","#5f95c9","#45037a" ];
let randomColor=colori[Math.floor(Math.random() * colori.length)];
//crea sfondo colorato
context.fillStyle = randomColor;
context.fillRect(0, 0, width, height);

//aggiungi riga verticale
context.fillStyle = "black";
context.fillRect(0, 0, 180/*lunghez*/, 716);

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




//ADD TOKEN TRENDING
context.font = "23pt 'Sans'";
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(`${tweetInfo.tokenLegenda}`,  80,140);
context.fillStyle = "#fff";
context.font = "18pt 'Sans'";
context.textAlign = "left";
context.fillText(`${tweetInfo.tokenList}`,  215,155);
loadImg(data.Trending['1'].link,230,190); 
loadImg(data.Trending['2'].link,230,220); 
loadImg(data.Trending['3'].link,230,250); 

//raw CHANGE PERCENTUAL - trending
context.fillStyle = "black";
context.font = "18pt 'Sans'";
context.textAlign = "center";
context.fillText(`${tweetInfo.tokenChange}`,  600,155);

//ADD TOKEN MOST VISITED
context.font = "23pt 'Sans'";
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(`${mostVisited.tokenLegenda}`,  570,140);
context.fillStyle = "white";
context.font = "18pt 'Sans'";
context.textAlign = "left";
context.fillText(`${mostVisited.tokenList}`,  700,155);
loadImg(data['most viewed']['1'].link,705,190); 
loadImg(data['most viewed']['2'].link,705,220); 
loadImg(data['most viewed']['3'].link,705,250); 

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
loadImg(data['Biggest gain']['1'].link,220,370); 
loadImg(data['Biggest gain']['2'].link,220,400); 
loadImg(data['Biggest gain']['3'].link,220,430); 


//add token - Top Losers
context.font = "23pt 'Sans'";
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(`${topLosers.tokenLegenda}`,  570,320);
context.fillStyle = "BLACK";
context.font = "18pt 'Sans'";
context.textAlign = "left";
context.fillText(`${topLosers.tokenList}`,  700,335);
loadImg(data.Losers['1'].link,705,370); 
loadImg(data.Losers['2'].link,705,400); 
loadImg(data.Losers['3'].link,705,430); 

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

let canvas,context;
const canvaa = async ()=> {

    let data= await getCMCfeed()
    // info post object with the content to render
const post = {
    name: "H4kwiz",
    twitter_name: "@OpenAiSol_",
    title_canvas_source : "CoinMarketCap",
    token_tweet:'',
    font:"bold 25pt 'Open Sans'",
    background_color: ["#0d0a21","#0d0a21","#0d0a21" ],
    legenda: `NAME                         PRICE                     1H %           24H %           7D %               MCap                  VOL(24h)    `
  }

  canvas = createCanvas(width, height);
  context = canvas.getContext("2d");
  
  const colori =post.background_color;
  let randomColor=colori[Math.floor(Math.random() * colori.length)];
  //crea sfondo colorato
  context.fillStyle = randomColor;
  context.fillRect(0, 0, width, height);


// legenda
context.font ="Italic 17pt 'Open Sans'";
context.fillStyle = "#868c9d";
context.fillText(post.legenda, 60, 140);

//lissta token cicloo da fare
/*
{
    name:'Gala',symbol:'GALA',
    
}
*/
const writeToken =async (obj)=>{

  let color=["#fff","#868c9d",]
//main title
context.font = post.font;
context.textAlign = "left";
context.fillStyle = "gold";
context.fillText(obj[obj.length-1].toLocaleUpperCase(), 140, 80);

for(i=0; i < obj.length-1; i++){

// TOKEN_name
context.font ="Italic 18pt 'Open Sans'";

//se il nome del token è troppo lungo...fixiamo
if(obj[i].name.length > 20){//if too long,only symbol
    context.fillText(obj[i].symbol, 45, 180+(i*50));
    context.font =`Italic ${16}pt 'Open Sans'`;
    context.fillStyle = color[i%2];
}else if(obj[i].name.length >= 10){ 
    let left=obj[i].name.length-11;
    context.font =`Italic ${17-left}pt 'Open Sans'`;
    context.fillStyle = color[i%2];
    context.fillText(obj[i].name+' #'+obj[i].symbol, 45-left, 180+(i*50));

   }else{

context.fillStyle = color[i%2];
context.fillText(obj[i].name+' #'+obj[i].symbol, 45, 180+(i*50));
}

// TOKEN_price
context.font ="Italic 18pt 'Open Sans'";
context.fillText(obj[i].price, 270, 180+(i*50));

// TOKEN_1h
context.fillText(obj[i].h1, 440, 180+(i*50));

// TOKEN_24h
context.fillText(obj[i].h24, 570, 180+(i*50));

// TOKEN_7d
context.fillText(obj[i].d7, 700, 180+(i*50));

// TOKEN_mcap
context.fillText(obj[i].marketCap, 830, 180+(i*50));

// TOKEN_volume
context.fillText(obj[i].volume, 1010, 180+(i*50));

}// fine ciclo for

}//fine funziona write token
writeToken(data);
loadImg("./picture_h4kwiz.png",10,10,100,100); 

// Write the image to file
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./image.png", buffer);
  return data
}// fine funzione canvaa

//run()
//canvaa()
module.exports = { canvaa};