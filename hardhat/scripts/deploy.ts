import hre, { ethers } from "hardhat";
import fs from "fs";

const MAX_RAINDOLL_SUPPLY = 100_000;
const MAX_GEN_ZERO = 100;

async function main() {
  const RaindollContract = await ethers.getContractFactory("RaindollContract");
  const raindollContract = await RaindollContract.deploy(
    MAX_RAINDOLL_SUPPLY,
    MAX_GEN_ZERO
  );
  await raindollContract.waitForDeployment();
  const raindollAddress = await raindollContract.getAddress();
  console.log(`\n Raindoll deployed to ${raindollAddress} \n`);

  await raindollContract.deploymentTransaction()?.wait(2);

  const MarketplaceContract = await ethers.getContractFactory(
    "RaindollMarketplace"
  );
  const marketplaceContract = await MarketplaceContract.deploy(raindollAddress);
  await marketplaceContract.waitForDeployment();
  const marketplaceAddress = await marketplaceContract.getAddress();
  console.log(`\n Marketplace deployed to ${marketplaceAddress} \n`);

  const raindollABI = JSON.parse(
    fs.readFileSync(
      "./artifacts/contracts/RaindollContract.sol/RaindollContract.json",
      "utf-8"
    )
  ).abi;
  const raindollAbi = JSON.stringify(raindollABI);

  const marketplaceABI = JSON.parse(
    fs.readFileSync(
      "./artifacts/contracts/RaindollMarketplace.sol/RaindollMarketplace.json",
      "utf-8"
    )
  ).abi;
  const marketplaceAbi = JSON.stringify(marketplaceABI);

  await marketplaceContract.deploymentTransaction()?.wait(2);

  // verifycation
  //   await hre.run("verify:verify", {
  //     address: raindollAddress,
  //     constructorArguments: [MAX_RAINDOLL_SUPPLY, MAX_GEN_ZERO],
  //   });

  //   await hre.run("verify:verify", {
  //     address: marketplaceAddress,
  //     constructorArguments: [raindollAddress],
  //   });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
