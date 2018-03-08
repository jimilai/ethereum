"use strict"
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
console.log(web3.eth.accounts)

const fs = require('fs')
const solc = require('solc')
const code = fs.readFileSync('Voting.sol').toString()
console.log(code)
const compiledCode = solc.compile(code)
console.log(compiledCode)

const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
console.log(abiDefinition)
const VotingContract = web3.eth.contract(abiDefinition)
const byteCode = compiledCode.contracts[':Voting'].bytecode
const deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data:byteCode,from:web3.eth.accounts[0],gas:4700000})
setTimeout(()=>{
  console.log(deployedContract.address)
  const contractInstance = VotingContract.at(deployedContract.address)
  
  console.log(contractInstance.totalVotesFor.call('Rama'))
  contractInstance.voteForCandidate('Rama',{from:web3.eth.accounts[0]})
  contractInstance.voteForCandidate('Rama',{from:web3.eth.accounts[0]})
  console.log(contractInstance.totalVotesFor.call('Rama'))
},1000)
