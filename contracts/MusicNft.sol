// contracts/GIF.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MusicNft is ERC721URIStorage {
    using Counters for Counters.Counter;

    // _tokenId is a unique id provided to every smart contract.
    Counters.Counter private _tokenId;

    // Address of market place, where we will sell the NFT
    address contractAddress;

    constructor(address marketPlaceAddress)
        ERC721("Music Streaming Token", "MST")
    {
        contractAddress = marketPlaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        //Set new tokenID for the token by incrementing it by 1
        _tokenId.increment();
        uint newTokenId = _tokenId.current();

        _mint(msg.sender, newTokenId); //Mint token

        _setTokenURI(newTokenId, tokenURI); //Generate URI

        setApprovalForAll(contractAddress, true); //Approve marketplace to sell the NFT

        return newTokenId;
    }
}
