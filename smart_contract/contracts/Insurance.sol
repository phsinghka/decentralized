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
        uint monthlyPremium;
        uint coverageAmount;
        bool isInsuranceActive;
        bool isClaimActive;
        uint nextInstallment;
        uint startDate;
        uint claimAmount;
        address claimHospitalAddress;
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

    modifier isClient{
        require(clientMap[msg.sender].isInsuranceActive, 'Insurance is not active on this address');
        _;
    }

    modifier InsuranceActive(address addr){
        require(clientMap[addr].isInsuranceActive,'Insurance on this address is not active');
        _;
    }

    //GET FUNCTIONS

    function getInsuredAmount(address addr) public view InsuranceActive(addr) returns(uint){
        return clientMap[addr].coverageAmount;
    }

    function getInsuranceStatus(address addr) public view InsuranceActive(addr) returns(bool){
        return clientMap[addr].isInsuranceActive;
    }

    function getInsuranceStartDate(address addr) public view InsuranceActive(addr) returns(uint) {
        return clientMap[addr].startDate;
    }

    function getInsuranceNextInstallment(address addr) public view InsuranceActive(addr) returns(uint) {
        return clientMap[addr].nextInstallment;
    }

    


    //SET FUNCTIONS

    function setNewHospital() public payable{
        require(msg.value == hospitalDeposit, 'Deposit should be equal to 1 Ether');
        hospital[msg.sender] = true;
    }

    function setNewClient() public payable{
        require(msg.value == 0.01 ether,'Premium should be in 0.01 Ether');
        clientMap[msg.sender].isClaimActive = true;
        clientMap[msg.sender].monthlyPremium =  msg.value;
        clientMap[msg.sender].coverageAmount =  10 ether;
        clientMap[msg.sender].isClaimActive =  false;
        clientMap[msg.sender].isInsuranceActive =  true;
        clientMap[msg.sender].nextInstallment = block.timestamp + 30 days;
        clientMap[msg.sender].startDate = block.timestamp;
    }

    function payPremium(address addr) public payable{
        require(msg.value == 0.01 ether,'Premium should be in 0.01 Ether');
        uint temp = clientMap[addr].monthlyPremium + msg.value;
        clientMap[addr].monthlyPremium =  temp;
        clientMap[addr].isInsuranceActive = true;
        clientMap[addr].nextInstallment = clientMap[addr].nextInstallment + 30 days;
    }

    function acceptClaim() public payable isClient{
        require(clientMap[msg.sender].isClaimActive,'Client has no claim active');
        require(address(this).balance>= clientMap[msg.sender].claimAmount, 'Not Enough balance in Contract. Please Try again !!');
        uint temp = clientMap[msg.sender].coverageAmount - clientMap[msg.sender].claimAmount;
        clientMap[msg.sender].coverageAmount = temp;
        temp = clientMap[msg.sender].claimAmount;
        clientMap[msg.sender].claimAmount = 0;
        payable(clientMap[msg.sender].claimHospitalAddress).transfer(temp);
        clientMap[msg.sender].isClaimActive = false;
    }

    function fileClaim(address clientAddress, uint claimAmount) public isHospital InsuranceActive(clientAddress){
        if(block.timestamp>clientMap[clientAddress].nextInstallment){
            clientMap[clientAddress].isInsuranceActive = false;
        }
        claimAmount = claimAmount * (10 ** 18);
        require(!clientMap[clientAddress].isClaimActive,'Client Has another active claim, Please resolve the previos claim to file new claim !');
        require(address(this).balance>= claimAmount , 'Not Enough balance in Contract. Please Try again !!');
        require(clientMap[clientAddress].coverageAmount >= claimAmount, 'Claim is bigger than remaining coverage amount');

        clientMap[clientAddress].claimAmount = claimAmount;
        clientMap[clientAddress].isClaimActive = true;
        clientMap[clientAddress].claimHospitalAddress = msg.sender;
    }



}