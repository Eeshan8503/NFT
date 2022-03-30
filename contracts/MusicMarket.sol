// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MusicMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    // _marketItemId is a unique id provided to every smart contract.
    Counters.Counter private _marketItemId;

    //Track total items sold.
    Counters.Counter private _itemSold;

    address payable owner; //Admin so that he receieve commisions, for using his network
    uint256 listingPrice = 0.00005 ether; //Listing fee or the commision for publishing NFT

    constructor() {
        //Set owner for the smart contract
        owner = payable(msg.sender);
    }

    struct marketItem {
        uint itemId; // Id given to a marketplace listed item
        uint nftId; // Id of the nft as in MusicNft.sol
        address nftContract; // Address fo the MusicNft
        address payable owner; //Owner of the music
        uint price;
        bool sold;
    }

    mapping(uint256 => marketItem) marketIdToItem;

    event MarketItemCreated(
        uint itemId,
        uint nftId,
        address nftContract,
        address payable owner,
        uint price,
        bool sold
    );

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be greater than 0");
        require(
            msg.value == listingPrice,
            "Amount mush be equal to listing price"
        );

        _marketItemId.increment();
        uint256 itemId = _marketItemId.current();

        marketIdToItem[itemId] = marketItem(
            itemId,
            tokenId,
            nftContract,
            payable(msg.sender), // Person listing the nft is the owner
            price,
            false
        );

        IERC721(nftContract).safeTransferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        emit MarketItemCreated(
            itemId,
            tokenId,
            nftContract,
            payable(msg.sender),
            price,
            false
        );
    }

    function sellMarketItem(address nftContract, uint itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = marketIdToItem[itemId].price;
        uint tokenId = marketIdToItem[itemId].nftId;
        address payable nft_owner = marketIdToItem[itemId].owner;

        require(msg.value == price, "Please pay correct price of the NFT");
        nft_owner.transfer(msg.value); //Trsnsfer money to buyer->owner

        IERC721(nftContract).safeTransferFrom(
            address(this),
            msg.sender,
            tokenId
        ); //Transfer music from owner->buyer

        marketIdToItem[itemId].owner = payable(msg.sender); // Change owner
        marketIdToItem[itemId].sold = true; //Set market item sold to true
        _itemSold.increment();
    }

    function fetchMarketItems() public view returns (marketItem[] memory) {
        uint itemCount = _marketItemId.current();
        uint unsoldItemCount = itemCount - _itemSold.current();

        marketItem[] memory items = new marketItem[](unsoldItemCount);
        uint currentIndex = 0;

        for (uint i = 0; i < itemCount; i++) {
            if (marketIdToItem[i + 1].sold == false) {
                uint currentId = marketIdToItem[i + 1].itemId;
                marketItem storage currentItem = marketIdToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (marketItem[] memory) {
        //get total number of items ever created
        uint totalItemCount = _marketItemId.current();

        uint itemCount = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            //get only the items that this user has bought/is the owner
            if (marketIdToItem[i + 1].owner == msg.sender) {
                itemCount += 1; //total length
            }
        }

        marketItem[] memory items = new marketItem[](itemCount);
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (marketIdToItem[i + 1].owner == msg.sender) {
                uint currentId = marketIdToItem[i + 1].itemId;
                marketItem storage currentItem = marketIdToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyItemsOnSale() public view returns (marketItem[] memory) {
        //get total number of items ever created
        uint totalItemCount = _marketItemId.current();

        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            //get only the items that this user has bought/is the owner
            if (marketIdToItem[i + 1].owner == msg.sender) {
                itemCount += 1; //total length
            }
        }

        marketItem[] memory items = new marketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (marketIdToItem[i + 1].owner == msg.sender && marketIdToItem[i + 1].sold == false) {
                uint currentId = marketIdToItem[i + 1].itemId;
                marketItem storage currentItem = marketIdToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
