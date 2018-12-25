Title:

Decentralized Star Notary Service 


Description:

The project is aimed to provide a decentralized star notary service on the Ethereum testnet block chain. This project is using openzepplin and implementes the ERC721 standard. Users can create a star and then lookup the star as well based on the TokenID.

Deployment Details:

This project is deployed on Ethereum Rinkeby Blockchain a testnet and following are its details.

Contract Address:
0x3349B3f4fDaCfAE33148EC4220B6BC9cCF5b4505

Transaction ID:
0xd93a10e4badc4a2a454ccbd6a2c0bafd495c4acc243a1cd4aba890779ea17865

TokeID: 1

Currnet Owner of the Star is:
0xc9428a2fe445edf897be509a04c33d39152e67b6

Configuration:

1. Run the command 'npm install' and it will download all the packages to make ready this project for running.
2. Make sure you have Metamask installed in chrome and up and running.
3. Get the test coins from any test faucet or https://faucet.rinkeby.io/
4. Install the Ganache GUI, I have used this for test purposes for my local testnet
5. Setup Infura and copy the link to Rinkeby testnet and paste in the truffle.js file for networks information as it is needed to setup the link to testnet
6. copy the mnemonic from Metamask and paste in the truffle.js file mnemonic.
7. Open the terminal and run the command: truffle console
8. now run the truffle commands without truffle prefix:
9. now give the command 'compile' to compile the StarNotary.sol contract file.
10. now give the command 'test' to run the test against this StarNotary.sol functions once the tests are passed then
11. Create deploying contract file in migrations/2_deploy_contracts.js file and enter the information as given below:

    var MyStarNotary = artifacts.require("./StarNotary.sol");

    module.exports = function(deployer) {
    deployer.deploy(MyStarNotary);
    };

12. Now run the command "migrate -f 2 --network rinkeby" to only deploy the 2nd migrations file to testnet, once contract is successfully deployed you will get the information as below:

    Running migration: 2_deploy_contract.js
    Replacing StarNotary...
    ... 0xd93a10e4badc4a2a454ccbd6a2c0bafd495c4acc243a1cd4aba890779ea17865
    StarNotary: 0x3349b3f4fdacfae33148ec4220b6bc9ccf5b4505
    Saving artifacts...

    Now "0x3349b3f4fdacfae33148ec4220b6bc9ccf5b4505" is our contract Address deployed to Rinkeby Testnet.



Client Application:

A web based client is provided to create and lookup the existing stars/

Setup
This program relies on MetaMask and npm package manager. To setup the client, run the following commands in the terminal:

Metamask should be running in chrome and when you will create a Star it will ask for the permission so allow it to create a Star.


Author:
Usman Umer