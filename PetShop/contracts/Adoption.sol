pragma solidity ^0.5.0;

contract Adoption {
    address[16] public adopters;

    modifier isOwner(uint256 petId) {
        require(
            adopters[petId] == msg.sender,
            "Error: Only Pet Owner can do this."
        );
        _;
    }

    function adopts(uint256 petId) public returns (uint256) {
        require(adopters[petId] == 0x0000000000000000000000000000000000000000,"Already adopted" );
        require(petId >= 0 && petId <= 15);
        adopters[petId] = msg.sender;
        return petId;
    }

    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }

    function removeAdoption(uint256 petId) public isOwner(petId) returns (bool) {
        require(adopters[petId] != 0x0000000000000000000000000000000000000000, "You cannot unadopt this");
        adopters[petId] = 0x0000000000000000000000000000000000000000;
        return true;
    }
}
