require("dotenv").config();
const {
  Client,
  PrivateKey,
  AccountId,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  Hbar,
} = require("@hashgraph/sdk");

// Load operator credentials
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_KEY);

// Create Hedera client
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function createNFTCollection() {
  const transaction = await new TokenCreateTransaction()
    .setTokenName("Echoes of the Bloodline")
    .setTokenSymbol("ECHO")
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(operatorId)
    .setSupplyType(TokenSupplyType.Finite)
    .setMaxSupply(100) // You can raise this if needed
    .setAdminKey(operatorKey)
    .setSupplyKey(operatorKey)
    .setMaxTransactionFee(new Hbar(30)) // in case gas goes up
    .freezeWith(client);

  const signedTx = await transaction.sign(operatorKey);
  const submitTx = await signedTx.execute(client);
  const receipt = await submitTx.getReceipt(client);
  const tokenId = receipt.tokenId;

  console.log(`✅ NFT Collection Created! Token ID: ${tokenId.toString()}`);
}

createNFTCollection().catch(console.error);
