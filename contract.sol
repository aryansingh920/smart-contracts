pragma solidity ^0.8.0;

contract ImageStorage {
    mapping(address => string) private images;

    function uploadImage(string memory imageHash) public {
        images[msg.sender] = imageHash;
    }

    function getImage(address user) public view returns (string memory) {
        return images[user];
    }
}
