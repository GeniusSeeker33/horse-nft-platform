const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const HorseNFT = await hre.ethers.getContractFactory("HorseNFT");
  const horseNFT = await HorseNFT.deploy(deployer.address); // ✅ Deploy contract

  console.log("HorseNFT deployed to:", horseNFT.target); // ✅ Use .target instead of .address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


