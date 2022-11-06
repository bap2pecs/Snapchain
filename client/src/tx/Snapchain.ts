import { Contract, ethers, Wallet } from "ethers";
import abi from "../contracts/Snapchain.json";

const contractAddress = '0xc6991004330cB5AB933a6490C07c803f2EeB5884';

const getContract = async () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
  const signer = provider.getSigner()
  
  // const wallet = new Wallet(privateKey, provider)

  const contract = new Contract(contractAddress, abi);
  return contract.connect(signer);
}


export async function secondPrice() {
  const contract = await getContract();

  // Call the contract, getting back the transaction
  const price = await contract.secondPrice();
  return Number(price._hex);
}

export async function deposit(ttlInSecs: number) {
  const contract = await getContract();

  // Call the contract, getting back the transaction
  const tx = await contract.deposit(ttlInSecs);
  // Wait for the transaction to have 2 confirmations.
  // See the note below on "Economic Value" for considerations
  // regarding the number of suggested confirmations
  const receipt = await tx.wait(2);

  // The receipt will have an "events" Array, which will have
  // the emitted event from the Contract. The "Return(uint256)"
  // call is the last event.
  const events = receipt.events.pop();

  // The sum is the first (and in this case only) parameter
  // in the "Return(uint256 sum)" event
  const sum = events.args[0];
  console.log(sum)
}