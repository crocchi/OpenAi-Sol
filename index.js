// Importa le librerie necessarie
const express = require('express');
const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');

// Crea un'app Express
const app = express();
const port = 3000;

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
        // Indirizzo del contratto del token di interesse
        const tokenAddress = req.query.tokenAddress; // Assumi che l'indirizzo del token sia passato come parametro di query
        
        // Carica il contratto del token
        const token = new Token(connection, new PublicKey(tokenAddress), TOKEN_PROGRAM_ID);

        // Ottieni le informazioni sul token
        const tokenInfo = await token.getMintInfo();
        
        // Invia le informazioni del token come risposta
        res.json(tokenInfo);
    } catch (error) {
        console.error('Errore durante il recupero delle informazioni del token:', error);
        res.status(500).json({ error: 'Errore durante il recupero delle informazioni del token' });
    }
});

// Avvia il server Express
app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
