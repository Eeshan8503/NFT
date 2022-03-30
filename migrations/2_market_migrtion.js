let MusicMarket = artifacts.require("./MusicMarket.sol");

module.exports = function (deployer) {
  deployer.deploy(MusicMarket);
};
