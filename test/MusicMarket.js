const MusicMarket = artifacts.require("MusicMarket");
const MusicNft = artifacts.require("MusicNft");

contract("MusicMarket", async function (accounts) {
  it("Has A Valid Address", async () => {
    const musicMarket = await MusicMarket.deployed();
    const musicMarketAddress = await musicMarket.address;
    const musicNft = await MusicNft.deployed(musicMarketAddress);
    const musicNftAddress = await musicNft.address;

    console.log("A1:", musicMarketAddress, "A2:", musicNftAddress);

    const musicMetadata = {
      genre: 1,
      language: 2,
      title: "Rock Me",
      description: "Rocking Music",
    };

    const id1 = await musicNft.createToken.call(
      "rhythmshandlya.io",
      musicMetadata,
      { from: accounts[1] }
    );
    console.log(id1);
  });
});
