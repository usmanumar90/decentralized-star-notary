pragma solidity ^0.4.23;
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 { 

    struct Coordinates {
        string Dec;
        string Mag;
        string Cent;
    }

    struct Star { 
        string name;
        Coordinates coords;
        string starStory; 
    }

    mapping(uint256 => Star) private _tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    mapping(bytes32 => bool) private isDecExist;
    mapping(bytes32 => bool) private isMagExist;
    mapping(bytes32 => bool) private isCentExist;

    function createStar(string _name, string _starStory, string _dec, string _mag, string _cent, uint256 _tokenId) public { 
        require(checkIfStarExist(_dec, _mag, _cent) == true, "This Star already exists, Please change the coordinates");
        isDecExist[keccak256(abi.encodePacked(_dec))] = true;
        isMagExist[keccak256(abi.encodePacked(_mag))] = true;
        isCentExist[keccak256(abi.encodePacked(_cent))] = true;

        Coordinates memory newCoords = Coordinates(_dec, _mag, _cent);
        Star memory newStar = Star(_name, newCoords, _starStory);

        _tokenIdToStarInfo[_tokenId] = newStar;

        mint(_tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender, "This User is not the owner of this star");
        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0, "This star is not for sale");
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost, "Please add more balance to buy this star");

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }

    function checkIfStarExist(string _dec, string _mag, string _cent) public view returns(bool) {
        return !isDecExist[keccak256(abi.encodePacked(_dec))]
            && !isMagExist[keccak256(abi.encodePacked(_mag))]
            && !isCentExist[keccak256(abi.encodePacked(_cent))];
    }

    function mint(uint256 _tokenId) public {
        _mint(msg.sender, _tokenId);
    }

    function tokenIdToStarInfo(uint256 _tokenId) public view returns(string, string, string, string, string){
        Star memory starInfo = _tokenIdToStarInfo[_tokenId];
        return (starInfo.name, starInfo.starStory, starInfo.coords.Dec, starInfo.coords.Mag, starInfo.coords.Cent);
    }
}