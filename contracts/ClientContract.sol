// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RequestContract {
    
    struct Client {
        address _client_id;
        string _client_name;
        Perscription[] _perscription;
    }

    struct Perscription {
        string _drug_id;
        string _drug_name;
    }

    struct Request {
        address _client_id;
        string _client_name;
        Perscription _perscription;
    }
        
    uint public clientCount = 0;
    Client[] public clients;
    
    uint public requestCount = 0;
    Request[] requests;
    
    address owner;

    modifier isDoctor() {
        require(msg.sender == owner, "caller is not a doctor");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function requestPerscription(address _client_id, string memory _client_name, string memory _drug_id, string memory _drug_name) public {
        requests.push(Request(_client_id, _client_name, Perscription(_drug_id, _drug_name)));
        requestCount++;
    }

    function getRequest(uint index) public view isDoctor returns(address, string memory, string memory, string memory)  {
        return (requests[index]._client_id, requests[index]._client_name, requests[index]._perscription._drug_id, requests[index]._perscription._drug_name);
    }

    function givePerscription(string memory _client_id, string memory _client_name) public {

    }
}