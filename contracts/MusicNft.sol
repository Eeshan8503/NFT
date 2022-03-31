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

    //Music metadata
    struct musicMetadata {
        uint104 genre;
        uint104 language;
        string title;
        string description;
    }

    mapping(uint256 => musicMetadata) metadataToId;

    constructor(address marketPlaceAddress) ERC721("Music Token", "MST") {
        contractAddress = marketPlaceAddress;
    }

    event tokenCreated(
        uint,
        musicMetadata
    );

    function createToken(string memory tokenURI, musicMetadata memory details) public returns (uint256) {
        //Set new tokenID for the token by incrementing it by 1
        _tokenId.increment();
        uint256 newTokenId = _tokenId.current();

        //Not emmited
        emit tokenCreated(newTokenId, details);

        _mint(msg.sender, newTokenId); //Mint token

        _setTokenURI(newTokenId, tokenURI); //Generate URI

        setApprovalForAll(contractAddress, true); //Approve marketplace to sell the NFT

        metadataToId[newTokenId] = details; //Set detils
        
        return newTokenId;
    }
}
