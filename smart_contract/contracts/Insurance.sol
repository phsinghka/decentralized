//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;


contract Insurance {

    address owner;

    //VARIABLES

    //Client Variables 
    uint public  constant monthlyPremium  = 0.01 ether;

    //Hospital Variables
    uint public constant hospitalDeposit = 1 ether;


    
    struct Client{
        uint insuredAmount;
        uint monthlyPremium;
        uint coverageAmount;
        bool isInsuranceActive;
        bool isClaimActive;
        uint claimAmount;
    }
    
    mapping(address =>   Client) clientMap;

    mapping(address => bool) hospital;




    //CONSTRUCTOR
    constructor () {
        owner = msg.sender;
    }

    //MODIFIERS
    modifier isOwner {
        require(msg.sender == owner);
        _;
    }

    modifier isHospital{
        require(hospital[msg.sender], 'Caller is not a hospital');
        _;
    }

    //GET FUNCTIONS

    function getInsuredAmount(address addr) public view isHospital returns(uint){
        return clientMap[addr].insuredAmount;
    }

    function getInsuranceStatus(address addr) public view isHospital returns(bool){
        return clientMap[addr].isInsuranceActive;
    }


    //SET FUNCTIONS

    function setNewHospital() public payable{
        require(msg.value == hospitalDeposit, 'Deposit should be equal to 1 Ether');
        hospital[msg.sender] = true;
    }

    function setNewClient() public payable{
        require(msg.value == 0.01 ether,'Premium should be in 0.01 Ether');
        clientMap[msg.sender].monthlyPremium =  msg.value;


    }

    function payPremium() public payable{
        require(msg.value == 0.01 ether,'Premium should be in 0.01 Ether');
        uint temp = clientMap[msg.sender].monthlyPremium +msg.value;
        clientMap[msg.sender].monthlyPremium =  temp;
    }

    function fileClaim(address clientAddress, uint claimAmount) public {
        require(!clientMap[clientAddress].isInsuranceActive,'Client Insurance is not active, Please ak them to pay the premium !');
        require(!clientMap[clientAddress].isClaimActive,'Client Has another active claim, Please resolve the previos claim to file new claim !');

        require(clientMap[clientAddress].coverageAmount >= claimAmount, 'Claim is bigger than remaining coverage amount');

    }



}