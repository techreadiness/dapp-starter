import Web3 from 'web3';
import type { AbiItem } from "web3-utils";

const web3 = new Web3();

const erc20Abi: AbiItem[] = [
    {
        "constant": false,
        "inputs": [
            { "name": "to", "type": "address" },
            { "name": "amount", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    }
];

export const usdtContractAddress: string =
    "0xd077a400968890eacc75cdc901f0356c943e4fdb";

const contract = new web3.eth.Contract(
    erc20Abi,
    usdtContractAddress
);

interface TransferData {
    to: string;
    amount: string;
}


export const getSmartContractInput = ({to, amount}: TransferData)=>{
    const transferAmount: string = web3.utils.toWei(amount, "mwei");

    const input: string = contract.methods
        .transfer(
            to,
            transferAmount
        )
        .encodeABI();
    return input;
}