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

//GET FEED BY SOLSCAN
//https://solscan.io/token/H4cwzkkLa8thnkdvfF7FCwcEteDyB9BRmjMgnNACTsGo?txType=all
//txType=all  -- 40 trans per page
//page=2  --change page
//https://solscan.io/token/H4cwzkkLa8thnkdvfF7FCwcEteDyB9BRmjMgnNACTsGo?txType=all&page=2
//https://solscan.io/token/H4cwzkkLa8thnkdvfF7FCwcEteDyB9BRmjMgnNACTsGo#markets

//GET FEED BY DEXTOOLS
//https://www.dextools.io/app/en/solana/pair-explorer/ADQjCJSK4Q6FXiz1Em9dnfiwME4EdSJu4Hv3DXCHz7Ha


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
      let elemenTokenLink=[];
      let elemenTokenSymb=[];
      let key=0;
      $(divv).each((parentsIdx, tbody) => {
        let keyIdx = 0;
        //console.log(parentsElem);
    
        //acquisisci link logo
      
       // elemenToken=tbody.children;
        $(tbody).children().each((childTdx, childElem) => {
            $(childElem).children().each((childTdx, childEl) => {
                let tmp=$(childEl).prop('innerText');

                if(childTdx===3){
                    let tmpLogo=$(childEl).find('.icon-Caret-up').prop('className')
                    //console.log(tmpLogo)
                }
                if(childTdx===1){//il secondo elemento che return each
                    let tmpLogo=$(childEl).find('.coin-logo').prop('src');
                    // .closest('.coin-logo').prop('src');
                    let tmpSymbol=$(childEl).find('.coin-item-symbol').prop('innerText');
                    //icon-Caret-up  icon-Caret-down
                    elemenTokenLink.push(tmpLogo);
                    elemenTokenSymb.push(tmpSymbol);
                    if(tmpLogo){
                        //console.log(tmpLogo)

                    }  
                }

                //
               // console.log(tmp)
                elemenToken.push(tmp);
            })
        })

      })
      //console.log(elemenToken);
      const cryptoObjects = [];
      let cryptoObjectsFinal = [];
      let sezioni = ['Trending','Biggest gain','Losers','most viewed', 'recently Added','Hot Dex']
      let sz=0;
      for (let i = 0; i < elemenToken.length; i += 4) {
        const rank = elemenToken[i];
        const name = elemenToken[i + 1];
        const price = elemenToken[i + 2];
        const change = elemenToken[i + 3];
        const link  = elemenTokenLink[sz];
        const symbol = elemenTokenSymb[sz++];
        cryptoObjects.push({ rank, name, price, change, link, symbol });
    }

    let cont=0;
        for (let z = 0; z < cryptoObjects.length; z += 10) {
    
            cryptoObjectsFinal[`${sezioni[cont++]}`]={1:cryptoObjects[z],2:cryptoObjects[z+1],3:cryptoObjects[z+2]}
        
           // cont++;
        }
        cont=0;
       // console.log(cryptoObjectsFinal)
        return cryptoObjectsFinal
      //const elemSelector = "#__next > div.sc-e742802a-1.fprqKh.global-layout-v2 > div > div.cmc-body-wrapper > div > div.sc-65973295-0.iAiLkn > div:nth-child(1) > div.sc-14cb040a-2.kwVDrJ > table > tbody > tr:nth-child(1)";
     // const divElement = "#__next > div.sc-e742802a-1.fprqKh.global-layout-v2 > div > div.cmc-body-wrapper > div > div.sc-65973295-0.iAiLkn"
    } catch (e) {
        console.log(e)
      }

}

const siteCMC= ["https://coinmarketcap.com/view/gaming/",
                "https://coinmarketcap.com/view/solana-ecosystem/",
                "https://coinmarketcap.com/view/ai-big-data/",
                "https://coinmarketcap.com/view/fan-token/",
                "https://coinmarketcap.com/view/memes/",
                "https://coinmarketcap.com/view/music/",
                "https://coinmarketcap.com/view/social-token/",
                "https://coinmarketcap.com/view/polkadot-ecosystem/",
                "https://coinmarketcap.com/view/play-to-earn/",
                "https://coinmarketcap.com/view/real-estate/",
                "https://coinmarketcap.com/view/metaverse/"

            ];

async function getCMCfeed() { 

    const tokenObjects = [];

    try {
      const siteUrl = siteCMC[Math.floor(Math.random() * siteCMC.length)];
  
      let title,name,nameToken,h1,h24,d7,mcap,vol24;
      
      const { data } = await axios({
        method: "GET",
        url: siteUrl,
      });

      const $ = cheerio.load(data);
  
      //CERCA IL TITOLO DELLA PAGINA
      $(".SummaryHeader_main-title__Y_W3w").each((parentsIdx, el) => { title=$(el).find('span').text();console.log(title+'\n')  })

      $("tbody").each((childTdx, trElem) => {
        //console.log(trElem)

        $(trElem).children().each((childTdx, tdElem) => {
//<tr> ciclo

            if(childTdx >= 10){ return }// arrivato al 10 elemento esce..
            name=$(tdElem).find(".coin-item-symbol").text();
           
            //nameToken=$(tdElem).find(".kKpPOn").text();
           //priceToken=$(tdElem).find(".cAhksY").find("span").text();
          
           $(tdElem).children().each((childTdx, tdElem) => {
           // cicla tra <td> con  (childTdx)
           if(childTdx===2){ //price
           nameToken=$(tdElem).find("p").text();
           nameToken=nameToken.replace(name, '');
            logourl=$(tdElem).find(".coin-logo").prop('src');
           }

           if(childTdx===3){ //price
            priceToken=$(tdElem).find("span").text();
           }
          
            if(childTdx===4){ 
                h1=$(tdElem).find("span").text();
                pos=$(tdElem).has(".icon-Caret-up");
                if(pos.length === 0){ h1=`-${h1}` }else{h1=`+${h1}`}
             }
            if(childTdx===5){ h24=$(tdElem).find("span").text();
                
            pos=$(tdElem).has(".icon-Caret-up");
            if(pos.length === 0){ h24=`-${h24}` }else{h24=`+${h24}`}

            }
            if(childTdx===6){ d7=$(tdElem).find("span").text();
            pos=$(tdElem).has(".icon-Caret-up");
            if(pos.length === 0){ d7=`-${d7}` }else{d7=`+${d7}`}
             }
            if(childTdx===7){ mcap=$(tdElem).find("span:nth-child(1)").text(); }
            if(childTdx===8){ 
                vol24=$(tdElem).find("a > p").text();
                vol24=vol24.replace(name, '');
            }
            

           })
        

            console.log(nameToken+'-'+name +' - price:'+priceToken+' - 1h:['+h1+'] 24h:['+h24+'] - 7d:['+d7+'] \n MCap:['+mcap+'] vol24:['+vol24+'] \n');
            tokenObjects.push({name:nameToken,symbol:name,price:priceToken,
                h1:h1, h24: h24 , d7: d7 , marketCap: mcap, volume: vol24
            })

        })

      })
      tokenObjects.push(title)
      return tokenObjects
 } catch (e) {
        console.log(e)
      }

}

//td-trending-now-post-0 1 2
// h2 a.text()
// PRENDE 3 INFORMAZIONI TREND AL VOLO SULLA PAGINA
//https://cryptonomist.ch/
const getCryptomistTrendNews= async ()=> { 

    const tokenObjects = [];

    try {
      const siteUrl = "https://cryptonomist.ch/";
  
      let title,name,nameToken,h1,h24,d7,mcap,vol24;
      
      const { data } = await axios({
        method: "GET",
        url: siteUrl,
      });

      const $ = cheerio.load(data);

      $(".td-trending-now-display-area").children().each((parentsIdx, el) => { 
        title=$(el).find('h2 > a').text();
        tokenObjects.push(title);
      })
    }catch(e){
        console.log(e);
    }
console.log(tokenObjects);
return tokenObjects
}//fine funzione cryptomist


module.exports = { getFeed , getCMCfeed, getCryptomistTrendNews }
//https://coinmarketcap.com/view/solana-ecosystem/
//Top Solana Ecosystem Tokens by Market Capitalization

//getFeed();
getCryptomistTrendNews();