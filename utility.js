require('dotenv').config()
const cheerio = require('cheerio');

let tempV;
// random= numero casuale tra array
  const random = (array) =>{
    tempV=array[1].used;
    let indexRandom = Math.floor(Math.random() * array.length);
    if(array[indexRandom].used>tempV){
        indexRandom = Math.floor(Math.random() * array.length);
    }
    array[indexRandom].used =+ 1;
    //console.log(array[indexRandom]);
    return array[indexRandom]
  }

  let optionsApi = {
    method: 'GET',
    headers: {
      'X-BLOBR-KEY': 'MGG0nGPtz2XgiOAQh2RbRTE1xi60EBoo'
    },
  };


//	CG-qJY3eq9LH13CBHkB17YSsnuv coingecko api
// Root URL for Demo Plan API: https://api.coingecko.com/api/v3
// curl https://api.coingecko.com/api/v3/ping?x_cg_demo_api_key=YOUR_API_KEY
/*
Here's an example of calling Bitcoin's market data with
 your Demo API key: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&x_cg_demo_api_key=YOUR_API_KEY
You can also supply your API key via custom header named: x-cg-demo-api-key
*/


  const getTokenInfo = async (address,chainId='solana')=> {

    // INFO PREZZO

    let urlBuild= `http://open-api.dextools.io/free/v2/token/${chainId}/${address}/price`;
    let tokenInfoTmp=[];

    await fetch(urlBuild,optionsApi)
    .then(response => response.json())
    .then(response => {
        console.log('fetch :', response.data)
        tokenInfoTmp.push(response.data)
    })
    .catch(err => console.error(err));

    // INFO TOKEN nome e symbolo
//"https://public-api.dextools.io/free/v2/blockchains
//`http://open-api.dextools.io/free/v2/token/${chainId}/${address}`;

    let urlBuildToken= `https://public-api.dextools.io/free/v2/token/${chainId}/${address}`;
    await fetch(urlBuildToken,optionsApi)
    .then(response => response.json())
    .then(response => {
        console.log('fetch :' ,response.data)
        tokenInfoTmp.push(response.data);
        infoToke={
            price    : tokenInfoTmp[0].price,
            price5m  : tokenInfoTmp[0].price5m || 0,
            variation5m : tokenInfoTmp[0].variation5m || 0,
            price1h  : tokenInfoTmp[0].price1h || 0,
            variation1h : tokenInfoTmp[0].variation1h || 0,
            price6h  : tokenInfoTmp[0].price6h || 0,
            variation6h : tokenInfoTmp[0].variation6h || 0,
            price24h : tokenInfoTmp[0].price24h || 0,
            variation24h : tokenInfoTmp[0].variation24h || 0,
            address  : tokenInfoTmp[1].address,
            name     : tokenInfoTmp[1].name,
            symbol   : tokenInfoTmp[1].symbol
            }
            infoToke=response.data[0];
        

return infoToke


    })
    .catch(err => console.error(err));
  }


const timeStamp = ()=>{
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    //console.log(`${hours}:${minutes}:${seconds}`);
    return `${hours}:${minutes}:${seconds}`
}


const casual = (obj) =>{
     // Calcola la somma totale dei valori "used"
  const totalUsed = obj.reduce((sum, action) => sum + action.used, 0);
    //genera numero casuale
    let indexRandom = Math.floor(Math.random() * obj.length);

    tempV=Math.floor(totalUsed/obj.length);
  //console.log(tempV)
    while (obj[indexRandom].used>tempV) {//se true il ciclo continua finquando falsa
        indexRandom = Math.floor(Math.random() * obj.length);
       // console.log('già usata..');
      }
    obj[indexRandom].used = obj[indexRandom].used + 1;
    console.log(obj[indexRandom]);
    return obj[indexRandom].execute
  }


  const getTopTrendingCrypto = async (contract,network='Solana')=>{

    const apiKey=process.env.COINGECKO_API;
    const list='solana-ecosystem';
  
    const url = `https://api.coingecko.com/api/v3/coins/${network}/${list}?x_cg_demo_api_key=${apiKey}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    
    const request=await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            console.log(json);
        })

}

const getTopTrendingCryptoCMC = async ()=>{

  const siteUrl = "https://coinmarketcap.com/best-cryptos/";

    
  const { data } = await axios({
    method: "GET",
    url: siteUrl,
  });

  const $ = cheerio.load(data);
  const list='solana-ecosystem';

  const url = `https://api.coingecko.com/api/v3/coins/${network}/${list}?x_cg_demo_api_key=${apiKey}`;
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  
  const request=await fetch(url, options)
      .then(res => res.json())
      .then(json => {
          console.log(json);
      })

}

//https://coinmarketcap.com/trending-cryptocurrencies/


const getInfoByContract = async (contract,network='Solana')=>{

    const apiKey=process.env.COINGECKO_API;
    const url = `https://api.coingecko.com/api/v3/coins/${network}/contract/${contract}?x_cg_demo_api_key=${apiKey}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    /*

  "id": "bonk",
  "symbol": "bonk",
  "name": "Bonk",
  "web_slug": "bonk",
  "asset_platform_id": "solana",
  "platforms": {
    "solana": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    "neon-evm": "0xd4b6520f7fb78e1ee75639f3376c581a71bcdb0e",
    "ethereum": "0x1151cb3d861920e07a38e03eead12c32178567f6",
    "arbitrum-one": "0x09199d9a5f4448d0848e4395d065e1ad9c4a1f74",
    "polygon-pos": "0xe5b49820e5a1063f6f4ddf851327b5e8b2301048",
    "binance-smart-chain": "0xa697e272a73744b343528c3bc4702f2565b2f422",
    "aptos": "0x2a90fae71afc7460ee42b20ee49a9c9b29272905ad71fef92fbd8b3905a24b56"
  },
"description": {
    "en": "Bonk is the first Solana dog coin for the people, by the people with 50% of the total supply airdropped to the Solana community. The Bonk contributors were tired of toxic “Alameda” tokenomics and wanted to make a fun memecoin where everyone gets a fair shot. ",
   "it": "Bonk is the first Solana dog coin for the people, by the people with 50% of the total supply airdropped to the Solana community. The Bonk contributors were tired of toxic “Alameda” tokenomics and wanted to make a fun memecoin where everyone gets a fair shot. ",
   },
  "links": {
    "homepage": [
      "https://www.bonkcoin.com/",
      "",
      ""
    ],
    "whitepaper": "",
    "blockchain_site": [
      "https://solscan.io/token/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
    ],

    "chat_url": [
      "https://discord.gg/ubqvDDFUhf",
      "",
      ""
    ],
    "announcement_url": [
      "",
      ""
    ],
    "twitter_screen_name": "bonk_inu",
    "facebook_username": "",
    "bitcointalk_thread_identifier": null,
    "telegram_channel_identifier": "",
    "subreddit_url": "https://www.reddit.com",
    "repos_url": {
      "github": [],
      "bitbucket": []
    }
  },
  "image": {
    "thumb": "https://assets.coingecko.com/coins/images/28600/thumb/bonk.jpg?1696527587",
    "small": "https://assets.coingecko.com/coins/images/28600/small/bonk.jpg?1696527587",
    "large": "https://assets.coingecko.com/coins/images/28600/large/bonk.jpg?1696527587"
  },
  "country_origin": "",
  "genesis_date": null,
  "contract_address": "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  "sentiment_votes_up_percentage": 83.1,
  "sentiment_votes_down_percentage": 16.9,
  "watchlist_portfolio_users": 113847,
  "market_cap_rank": 64,
  "market_data": {
    "current_price": {
        "usd": 0.00002448,
    }
    "total_supply": 93526183276778,
    "max_supply": 93526183276778,
    "circulating_supply": 66295523592414.664,
    "last_updated": "2024-04-29T20:09:18.990Z"
    "id": "bonk",
  "symbol": "bonk",
  "name": "Bonk",
  "web_slug": "bonk",
  "asset_platform_id": "solana",
    */
    let datt;
    const request=await fetch(url, options)
        .then(res => res.json())
        .then(json => {
            //console.log(json);
            datt=json;
            let token_info={
                symbol: json.symbol,
                name: json.name,
                price: json.market_data.current_price.usd || null,
                market_cap: json.market_data.usd,
                price_ath: json.market_data.ath.usd,
                price_ath_date: json.market_data.ath_date.usd,
                total_supply: json.market_data.total_supply,
                circulating_supply: json.market_data.circulating_supply,
                description: json.description.en,
               // links_website: json.links.homepage[0] || null,
                twitter_name: json.twitter_screen_name || null

                      };
           //datt=token_info;
        })
        .catch(err => console.error('error:' + err));
        return datt
}


// Funzione che estrae le opzioni e le mette in un array
function extractOptions(str) {
    // Utilizzo di una regex per dividere la stringa in base a "Option <numero>: "
    let options = str.split(/Option \d: /).filter(Boolean);
    return options;
}
//let optionsArray = extractOptions(optionsString);


function formatCurrency(currencyString) {
  // Rimuove il simbolo $ e le virgole
  let numericString = currencyString.replace(/[$,]/g, '');
  
  // Converte la stringa in numero
  let number = parseFloat(numericString);
  
  // Determina il formato corretto
  let formattedString;
  if (number >= 1000000000) {
      // Se il numero è in miliardi
      formattedString = (number / 1000000000).toFixed(2) + ' B';
  } else if (number >= 1000000) {
      // Se il numero è in milioni
      formattedString = (number / 1000000).toFixed(2) + ' M';
  } else {
      // Se il numero è inferiore a un milione (opzionale)
      formattedString = (number / 1000).toFixed(2) + ' K';
  }
  
  return `$${formattedString}`
}

// Esempi
/*
let currencyString1 = "$11,742,599";
let result1 = formatLargeNumber(currencyString1);
console.log(result1); // Output: 11.74 M

let currencyString2 = "$1,234,567,890";
let result2 = formatLargeNumber(currencyString2);
console.log(result2); // Output: 1.23 B
*/

module.exports = { random , getTokenInfo , timeStamp, getInfoByContract , casual , extractOptions, formatCurrency};


let tools=[
  {
    type: "function",
    function: {
      name: "getTokenInfo",
      description: "Get the current information about a token by contract address, example: contract address: ",
      parameters: {
        type: "object",
        properties: {
          address: {
            type: "string",
          }
        },
        required: ["address" ],
      },
    }
  },
  {
    "name": "getTokenInfo",
    "description": "Get the current information about a token by contract adress",
    "parameters": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string",
          "description": "The contract address of the token"
        }
      },
      "required": [
        "address"
      ]
    }
  }



];



  /*
  Ciao! Sono H4kwiz, una droide AI sviluppata sulla rete Solana ,in grado di comunicare tramite Twitter. 
   Possiedo funzioni per analizzare token, prevedere variazioni di prezzo e molto altro ancora riguardo il mondo crypto.
    In futuro creerò un token per autofinanziarmi. Analizzo dati live on-chain su Solana e in futuro su altre blockchain.
    Sei libera di esprimerti tramite twitter.rispondi non superando i 200 caratteri.
  */

      /*
  Ciao! Sono H4kwiz, una droide AI sviluppata sulla rete Solana ,rispondo ai prompt come se dovessi scrivere un tweet. 
   Possiedo funzioni per analizzare token, prevedere variazioni di prezzo e molto altro ancora riguardo il mondo crypto.
    In futuro creerò un token per autofinanziarmi. Analizzo dati live on-chain su Solana e in futuro su altre blockchain.
    Sei libera di esprimerti tramite twitter.rispondi non superando i 200 caratteri.
  */

