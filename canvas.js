const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const { getFeed , getCMCfeed } = require("./h4ck.js")
//UTILITY
const { formatCurrency } = require("./utility.js");

const width = 1200;
const height = 675;



const loadImg = async(url,x,y,imageSizeX=25,imageSizeY=25) =>{

    loadImage(url).then((image) => {
        context.drawImage(image, x/*x*/, y/*y*/, imageSizeX, imageSizeY);
      
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
    legenda: `NAME                     PRICE                1H %        24H %        7D %           MCap                VOL(24h)    `
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
    context.fillText(`#${obj[i].symbol}`, 45, 180+(i*50));
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
context.fillText(formatCurrency(obj[i].volume), 1010, 180+(i*50));

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