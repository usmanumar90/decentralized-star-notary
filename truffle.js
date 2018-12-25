/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

// module.exports = {
//   // See <http://truffleframework.com/docs/advanced/configuration>
//   // to customize your Truffle configuration!
// };


const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "skull witness dune nominee juice marble enrich check burst leg chat daring"
const infura = "https://rinkeby.infura.io/v3/7aa0a33866364e0c9bf90126840821ae"

module.exports = {
networks: {
//   development: {
//    host: "127.0.0.1",
//    port: 7545,
//    network_id: "*" 
//   }
// ,
 rinkeby: {
  provider: function() {
 return new HDWalletProvider(mnemonic,infura)
     },
      network_id: '4',
      gas: 4500000,
      gasPrice: 10000000000,
    }
   },
 };