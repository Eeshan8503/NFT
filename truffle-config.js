module.exports = {

  contracts_build_directory: "./client/public/contracts",
  
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    }
  },
  mocha: {
    timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.8.11"
    }
  }
};
