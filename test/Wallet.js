const Wallet = artifacts.require("Wallet");
contract("Wallet", async function (accounts) {
  it("works", async () => {
    const wallet = await Wallet.deployed();

    await wallet.add({ from: accounts[1], value: "10000000000000000000" });
    assert(
      Number(await wallet.getBalance({ from: accounts[1] })) == 10,
      "Add fn not working"
    );

    await wallet.withdraw("1", { from: accounts[1] });
    assert(
      Number(await wallet.getBalance({ from: accounts[1] })) == 9,
      "Withdraw fn not working"
    );
  });
});
