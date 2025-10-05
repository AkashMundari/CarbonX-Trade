// npm i thor-devkit
import { mnemonic } from 'thor-devkit';

// your existing seed phrase (as a single string)
const seedPhrase = "<seed phrase here>";

// split into an array of words (handles extra spaces/newlines)
const words = seedPhrase.trim().split(/\s+/);

// validate first
if (!mnemonic.validate(words)) {
  throw new Error('Invalid mnemonic phrase');
}

// derive private key (this returns a Buffer)
const privateKeyBuffer = mnemonic.derivePrivateKey(words);
console.log('Private key hex: 0x' + privateKeyBuffer.toString('hex'));

