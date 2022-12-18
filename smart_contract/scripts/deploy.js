const hre = require('hardhat');

async function main() {
  const Insurance = await hre.ethers.getContractFactory('Insurance');
  const insurance = await Insurance.deploy();

  await insurance.deployed();

  console.log(`Insurance deployed to ${insurance.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
