// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Record{
  
    mapping(string=>string[]) record;

    function add(string memory _pid,string memory hash) external {
        record[_pid].push(hash);
    }

    function verify(string memory _pid,string memory hash) external view returns (bool) {
        string[] memory hashes = record[_pid];
        for (uint256 i = 0; i < hashes.length; i++) {
            if (keccak256(abi.encodePacked(hashes[i])) == keccak256(abi.encodePacked(hash))) {
                return true;
            }
        }
        return false;
    }
    
}