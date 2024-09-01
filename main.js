import { Connection, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('mainnet-beta'));

async function getTransactionDetails(signature) {
  try {
    const transaction = await connection.getTransaction(signature, {
      commitment: 'confirmed',
      maxSupportedTransactionVersion: 0
    });

    if (!transaction) {
      console.log('Transaction not found');
      return;
    }

    console.log('Transaction Details:', transaction);
    
    // Parsing transaction instructions to find Raydium-related instructions
    const instructions = transaction.transaction.message.instructions;

    for (const instruction of instructions) {
      const programId = instruction.programId.toString();
      if (programId === 'EhhTK3GTFz6mge2f41tVZshiq3aVcHgEcrFtnDeYoP7t') { // Raydium program ID
        console.log('Raydium Instruction Found:', instruction);
        
        // Decode the instruction data (if necessary)
        // Note: Actual decoding will depend on Raydium's instruction format
        const data = Buffer.from(instruction.data, 'base64');
        console.log('Decoded Data:', data);
        
        // Here, you would add logic to parse the specific fields related to liquidity
        // For demonstration, we'll just log the instruction
      }
    }
  } catch (error) {
    console.error('Error fetching transaction details:', error);
  }
}

// Example usage with a transaction signature
const signature = '2uH1KHbZKrwBV2mE38b8B7CJVhUr32xQ7xUe1NwYFXNL898PzU4DUGEtECiyNTMJakAEDNrG14ST4HNg2nieushT';
getTransactionDetails(signature);