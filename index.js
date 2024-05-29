// Importa le librerie necessarie
const express = require('express');
const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

const axios = require('axios');

const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/completions';

const requestBody = {
  prompt: 'Scrivi qui il testo di partenza per generare altro testo...',
  max_tokens: 50 // Numero massimo di token da generare
};

axios.post(apiUrl, requestBody, {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Testo generato:', response.data.choices[0].text);
})
.catch(error => {
  console.error('Si è verificato un errore:', error);
});

//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

// Crea un'app Express
const app = express();
const port = 3000;

import OpenAI from "openai";

const openai = new OpenAI({
  organization: 'org-iF2FACP7DQSeJrGPjA3SCGzd',
});


// Configura la connessione alla blockchain di Solana
const solanaNetwork = 'https://api.mainnet-beta.solana.com';
//OTTIENI INFORMAZIONI DI UN TOKEN
let tokenMintAddress='H4cwzkkLa8thnkdvfF7FCwcEteDyB9BRmjMgnNACTsGo';
// indirizzo token

const connection = new Connection(solanaNetwork, 'recent');

//creazione nuovo porfagolio
const newWallet = Keypair.generate();

console.log(`Nuovo portafoglio creato!!
Wallet: ${newWallet.publicKey.toBase58()}
Key:  ${newWallet.secretKey}
`);

// Definisci l'endpoint API per ottenere informazioni su un token
app.get('/token-info', async (req, res) => {
    try {
        console.log(req.query)
        // Indirizzo del contratto del token di interesse
        const tokenAddress = req.query.tokenAddress; // Assumi che l'indirizzo del token sia passato come parametro di query
        
        const mintPublicKey = new PublicKey(tokenAddress);
        // GET TOKEN SUPPLY
  
        const mintInfo = await connection.getTokenSupply(mintPublicKey);
        const tokenInfo = await connection.getAccountInfo(mintPublicKey);
       //
       
       let urlBuild= `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;
       let tokenInfoTmp=[];
   
       
       await fetch(urlBuild)
       .then(response => response.json())
       .then(response => {
          // console.log('fetch :', response.pairs)
           tokenInfoTmp.push(response.pairs);
       })
       .catch(err => console.error(err));
       //console.log(tokenApiInfo);
       //const holders = await connection.getLargestAccounts(mintPublicKey);
        
        //console.log('Token TotalSupply:', mintInfo.value.uiAmountString);
        console.log(tokenInfo.data);
        // Ottieni informazioni sul token
        // Invia le informazioni del token come risposta
        res.json(tokenInfoTmp);
    } catch (error) {
        console.error('Errore durante il recupero delle informazioni del token:', error);
        res.status(500).json({ error: 'Errore durante il recupero delle informazioni del token' });
    }
});

// Avvia il server Express
app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});

const getTokenInfo= async(address,chainId='solana')=>{

    // INFO PREZZO

    //https://api.dexscreener.com/latest/dex/pairs/:chainId/:pairAddresses
    //http://open-api.dextools.io/free/v2/token/${chainId}/${address}/price`;
    let urlBuild= `https://api.dexscreener.com/latest/dex/tokens/${address}`;
    let tokenInfoTmp=[];

    
    await fetch(urlBuild)
    .then(response => response.json())
    .then(response => {
       // console.log('fetch :', response.pairs)
        tokenInfoTmp.push(response.pairs);
        return tokenInfoTmp
    })
    .catch(err => console.error(err));


}