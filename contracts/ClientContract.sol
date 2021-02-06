// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract RequestContract {
    
    struct Client {
        address _client_id;
        string _client_name;
    }

    struct Perscription {
        string _drug_id;
        address _client_id;
    }

    struct Request {
        uint _request_number;
        Perscription _perscription;
    }
        
    uint public clientCount = 0;
    Client[] public clients;
    
    uint public requestCount = 0;
    Request[] requests;
    
    uint public perscriptionCount = 0;
    Perscription[] perscriptions;
    
    address owner;

    modifier isDoctor() {
        require(msg.sender == owner, "caller is not a doctor");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function addClient(address _client_id, string memory _client_name) public {
        clients.push(Client(_client_id, _client_name));
        clientCount++;
    }

    function getClient(uint index) public view isDoctor returns(address, string memory) {
        return (clients[index]._client_id, clients[index]._client_name);
    }

    function requestPerscription(address _client_id, string memory _drug_id) public {
        requests.push(Request(requestCount, Perscription(_drug_id, _client_id)));
        requestCount++;
    }

    function getRequest(uint index) public view isDoctor returns(string memory, address)  {
        return (requests[index]._perscription._drug_id, requests[index]._perscription._client_id);
    }

    function givePerscriptionWithIndex(address _client_id, string memory _drug_id, uint _index) public {
        perscriptions.push(Perscription(_drug_id, _client_id));
        perscriptionCount++;
        removeRequest(_index);
    }
    
    function givePerscriptionWithoutIndex(address _client_id, string memory _drug_id) public {
        perscriptions.push(Perscription(_drug_id, _client_id));
        perscriptionCount++;
        removeRequestWithoutIndex(_client_id, _drug_id);
    }
    
    function removeRequest(uint index) public isDoctor {
        if (index >= requestCount) return;
        
        for (uint i = index; i < requestCount-1; i++){
            requests[i] = requests[i+1];
            requests[i]._request_number--;
        }
        delete(requests[requests.length-1]);
        requestCount--;
    }
    
    function removeRequestWithoutIndex(address _client_id, string memory _drug_id) public isDoctor {
        for (uint i = 0; i < requestCount; i++) {
            if (requests[i]._perscription._client_id == _client_id) {
                if (keccak256(bytes(requests[i]._perscription._drug_id)) == keccak256(bytes(_drug_id))) {
                    removeRequest(i);
                    break;
                }
            }
        }
    }
}