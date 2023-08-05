const web3 = require("web3");
const usdtContract = artifacts.require("usdt.sol"); // Rename the variable here
const paymentProccesor = artifacts.require("paymentProccesor.sol");

module.exports = async function(deployer, network, addresses) {
  const [admin, payer, _] = addresses;

  if (network === "develop") {
    await deployer.deploy(usdtContract); // Use the new variable name here
    const usdt = await usdtContract.deployed(); // Use the new variable name here
    await usdt.faucet(payer, web3.utils.toWei('10000', 'ether'));

    await deployer.deploy(paymentProccesor, admin, usdt.address);
  }
};

