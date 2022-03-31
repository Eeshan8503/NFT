const MusicMarket = artifacts.require("MusicMarket");
const MusicNft = artifacts.require("MusicNft");

contract("MusicMarket", async function (accounts) {
  const eather = 1e18;
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
      musicMetadata
    );

    const id2 = await musicNft.createToken.call(
      "eeshanmattey.io",
      musicMetadata
    );

    console.log("ID:", id1);
    console.log("ID:", id2);

    const listingPrice = await musicMarket.getListingPrice();
    console.log(listingPrice.toString());

    // await musicMarket.createMarketItem(musicNftAddress, 1, "100000000", {
    //   value: listingPrice,
    // });

    // const arr = await musicMarket.fetchMarketItems();
    // console.log(arr);
  });
});
