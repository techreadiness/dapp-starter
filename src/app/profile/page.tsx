"use client";

import {useWalletAccountStore} from "@/components/Wallet/Account/auth.hooks";
import {useKaiaWalletSdk} from "@/components/Wallet/Sdk/walletSdk.hooks";
import {useCallback} from "react";
import styles from "./page.module.css";
import {getSmartContractInput, usdtContractAddress} from "@/utils/smartContract";

export default function Event () {
    const { account, setAccount } = useWalletAccountStore();
    const { disconnectWallet, sendTransaction } = useKaiaWalletSdk();
    const onDisconnectButtonClick = useCallback(()=>{
        disconnectWallet().then(()=> {
            setAccount(null);
        });
    },[disconnectWallet, setAccount]);

    const onUSDTSendButtonClick = useCallback(async ()=>{
        const toAddress = "0xa28077ec587f65fd86a50b2fd9fd4ea243349857"; // Example Address
        const input = getSmartContractInput({to: toAddress, amount: "1"});

            if(account){
            const tx = await sendTransaction([{
                typeInt: 48,// USDT in kaia chain
                from: account,
                to: usdtContractAddress,
                input: input,
                depositTokenAddress: usdtContractAddress,
                depositAmount: "1",
                value:"0x0" //Kaia Amount
            }]);
             console.log(tx);
            }
        },[sendTransaction,account]
    );
    return (
        <div className={styles.root}>
            <div className={styles.body}>
                {
                    account ?
                        <>
                            <p>wallet address: {account.slice(0, 5) + '...' + account.slice(-3)}</p>
                            <button className={styles.button} onClick={onDisconnectButtonClick}>disconnect</button>
                        </>
                        : <>need login</>
                }
                <div>
                    {account && <button className={styles.button} onClick={onUSDTSendButtonClick}>send USDT</button>}
                </div>
            </div>
        </div>
    );
}