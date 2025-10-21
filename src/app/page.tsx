"use client";
import styles from "./page.module.css";
import {WalletButton} from "@/components/Wallet/Button/WalletButton";
import {useState, useEffect} from "react";
import {useWalletAccountStore} from "@/components/Wallet/Account/auth.hooks";
import {useKaiaWalletSdk} from "@/components/Wallet/Sdk/walletSdk.hooks";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setAccount } = useWalletAccountStore();
    const { getAccount, disconnectWallet } = useKaiaWalletSdk();
    const [count, setCount] = useState(0);


    useEffect(() => {
        (async ()=>{
            try {
                const account = await getAccount();
                if (account) {
                    setAccount(account);
                    setIsLoggedIn(true);
                }
            }
            catch(error){
                if(error) {
                    disconnectWallet();
                }
            }
        })();
    }, [getAccount, setIsLoggedIn, setAccount, disconnectWallet]);


    return (
    <div className={styles.page}>
      <main className={styles.main}>
          {isLoggedIn?<button className={styles.button} onClick={()=> setCount(count=> count+1)}>{count} combo</button>
          :<WalletButton setIsLoggedIn={setIsLoggedIn}/>}
      </main>
    </div>
  );
}
