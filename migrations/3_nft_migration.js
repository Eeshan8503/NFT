let MusicMarket = artifacts.require("./MusicMarket.sol");
let MusicNft = artifacts.require("./MusicNft.sol");

module.exports = function (deployer) {
  deployer.deploy(MusicMarket);
};
