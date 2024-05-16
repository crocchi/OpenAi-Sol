const cheerio = require("cheerio");
const axios = require("axios");


function generateSymbol(name) {
    const words = name.split(' ');
    let symbol = '';
    words.forEach(word => {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === word[i].toUpperCase()) {
                
                symbol += word[i];
            }
        }
    });
    return symbol.toUpperCase();
}

async function getFeed() { 

    try {
      const siteUrl = "https://coinmarketcap.com/best-cryptos/";
  
      
      const { data } = await axios({
        method: "GET",
        url: siteUrl,
      });

      const $ = cheerio.load(data);
      //const tbodyEl=document.querySelectorAll("tbody");
      //console.log(tbodyEl);

      const divv="tbody";
      let elemenToken=[];
      let key=0;
      $(divv).each((parentsIdx, parentsElem) => {
        let keyIdx = 0;
        //console.log(parentsElem);
    

        $(parentsElem).children().each((childTdx, childElem) => {
           // console.log($(childElem).prop('innerText')) //innerText
            $(childElem).children().each((childTdx, childElem) => {
                let tmp=$(childElem).prop('innerText');
                //console.log(childTdx, tmp)
                elemenToken.push(tmp);
                if(childTdx === 3){key++}
            })
        })

       
        // Function to divide the array into an array of objects

    const cryptoObjects = [];
    let cryptoObjectsFinal = [{}];
    let sezioni = ['Trending','Biggest gain','Losers','most viewed', 'recently Added','Hot Dex']
    for (let i = 0; i < elemenToken.length; i += 4) {
        const rank = elemenToken[i];
        const name = elemenToken[i + 1];
        const price = elemenToken[i + 2];
        const change = elemenToken[i + 3];
        cryptoObjects.push({ rank, name, price, change });
    }
let cont=0;
    for (let z = 0; z < sezioni.length; z += 10) {

        cryptoObjectsFinal[`${sezioni[cont]}`]={1:cryptoObjects[z],2:cryptoObjects[z+1],3:cryptoObjects[z+2]}
    
  
    
       /* cryptoObjectsFinal[`${sezioni[cont]}`].push(cryptoObjects[z+1]);
        cryptoObjectsFinal[`${sezioni[cont]}`].push(cryptoObjects[z+2]);
        cryptoObjectsFinal[`${sezioni[cont]}`].push(cryptoObjects[z+3]);*/

        cont++;
    }
    cont=0;

    console.log(cryptoObjectsFinal)
      })
      //const elemSelector = "#__next > div.sc-e742802a-1.fprqKh.global-layout-v2 > div > div.cmc-body-wrapper > div > div.sc-65973295-0.iAiLkn > div:nth-child(1) > div.sc-14cb040a-2.kwVDrJ > table > tbody > tr:nth-child(1)";
     // const divElement = "#__next > div.sc-e742802a-1.fprqKh.global-layout-v2 > div > div.cmc-body-wrapper > div > div.sc-65973295-0.iAiLkn"
    } catch (e) {
        console.log(e)
      }

}

getFeed();