// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MedIntel is Ownable {
    struct PostOpRecord {
        string encryptedData;
        uint256 timestamp;
        address agent;
    }

    mapping(address => PostOpRecord[]) public records;
    address public medToken;

    constructor(address _medToken) {
        medToken = _medToken;
    }

    function storeRecord(string memory _encryptedData, address _agent) public {
        records[msg.sender].push(PostOpRecord(_encryptedData, block.timestamp, _agent));
    }

    function getRecord() public view returns (string memory, address) {
        require(records[msg.sender].length > 0, "No records found");
        PostOpRecord memory record = records[msg.sender][records[msg.sender].length - 1];
        return (record.encryptedData, record.agent);
    }

    function verifyComputation(string memory data) public pure returns (string memory) {
        return string(abi.encodePacked("Verified: ", data));
    }
}
