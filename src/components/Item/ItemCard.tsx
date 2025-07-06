"use client";

import styles from "./ItemCard.module.css";
import { useCallback } from 'react';
import {useWalletAccountStore} from "@/components/Wallet/Account/auth.hooks";
import {useKaiaWalletSdk} from "@/components/Wallet/Sdk/walletSdk.hooks";
import {useCreatePaymentId, usePaymentSdk} from "@/components/Store/Sdk/paymentSdk.hooks";
import Image from "next/image";

export const ItemCard = ()=> {
  const { account } = useWalletAccountStore();
  const { connectAndSign } = useKaiaWalletSdk();
  const { mutateAsync: createPaymentId } = useCreatePaymentId();
  const { startPayment } = usePaymentSdk();

  const onCryptoButtonClick = useCallback(async()=>{
    if(!account){
      await connectAndSign("connect wallet");
    }
    else{
      const { data } = await createPaymentId({
        buyerDappPortalAddress: account,
        pgType:'CRYPTO',
        currencyCode:'KAIA',
        price: 1,
        items:[{
          itemIdentifier: 'item_1',
          name:'ppippi',
          price: 1,
          imageUrl: './ppippi.png',
          currencyCode:'KAIA',
        }],
        //paymentStatusChangeCallbackUrl: '/webhooks/status-change',
        testMode:true,
      });
      console.log(data);
      await startPayment(data.id);
    }
   },[account, connectAndSign, createPaymentId, startPayment]);
  return (
  <div className={styles.root}>
    <div><Image src="img" alt="thumbnail" width={10} height={10} /></div>
    <p>name</p>
    <div>
      <button onClick={onCryptoButtonClick}>1 KAIA</button>
      <button>1 USD</button>
    </div>
  </div>);
}