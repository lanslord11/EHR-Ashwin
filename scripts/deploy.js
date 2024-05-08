const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const Record = await hre.ethers.getContractFactory("Record");
  const upload = await Upload.deploy();
  const record = await Record.deploy();

  await upload.deployed();
  await record.deployed();

  console.log("Library deployed to:", upload.address);
  console.log("Record deployed at ",record.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});