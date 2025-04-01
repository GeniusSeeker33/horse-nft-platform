require("dotenv").config();
const {
  Client,
  PrivateKey,
  AccountId,
  TokenMintTransaction,
} = require("@hashgraph/sdk");
const fs = require("fs");
const path = require("path");

// Load env credentials
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.OPERATOR_KEY);
const tokenId = process.env.TOKEN_ID;

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

// Folder with your 11 metadata files
const metadataFolder = path.join(__dirname, "nft-metadata");

async function mintAllNFTs() {
  const files = fs.readdirSync(metadataFolder).filter(f => f.endsWith(".json"));

  for (const file of files) {
    const fullPath = path.join(metadataFolder, file);
    const metadata = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    const imageUrl = metadata.image;

    const mintTx = await new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(imageUrl)])
      .freezeWith(client)
      .sign(operatorKey);

    const response = await mintTx.execute(client);
    const receipt = await response.getReceipt(client);

    console.log(`✅ Minted ${file}: ${receipt.status.toString()}`);
  }
}

mintAllNFTs().catch(console.error);


