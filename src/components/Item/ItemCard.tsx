"use client";

import styles from "./ItemCard.module.css";
import {useCallback, useEffect, useState} from 'react';
import {useWalletAccountStore} from "@/components/Wallet/Account/auth.hooks";
import {useKaiaWalletSdk} from "@/components/Wallet/Sdk/walletSdk.hooks";
import {
  Item,
  PG_TYPE,
  useCreatePaymentId,
  useFinalizePayment,
  usePaymentSdk
} from "@/components/Store/Sdk/paymentSdk.hooks";
import Image from "next/image";
import axios from "axios";

export type ItemCardProps = Item;
export const ItemCard = (props: ItemCardProps)=> {
  const { itemIdentifier, name, price, imageUrl, currencyCode} = props;
  const [kaiaPrice, setKaiaPrice] = useState<number>(0);
  const { account } = useWalletAccountStore();
  const { connectAndSign } = useKaiaWalletSdk();
  const { mutateAsync: createPaymentId } = useCreatePaymentId();
  const { mutateAsync: finalizePayment } = useFinalizePayment();
  const { startPayment } = usePaymentSdk();

  useEffect(() => {
    const getUsdToKaiaPrice = async () => {
      const res = await axios.get('/api/usd-to-kaia');
      const data = await res.data;
      setKaiaPrice(data?.kaia?.toFixed(2) * Number(price));
    };

    getUsdToKaiaPrice();
  }, [price]);



  const onPaymentButtonClick = useCallback(async(type:PG_TYPE)=>{
    if(!account){
      alert('Connect Wallet');
    }
    else {
      if (kaiaPrice) {
        try{
          const {data} = await createPaymentId({
            buyerDappPortalAddress: account,
            pgType: type,
            currencyCode: type==='CRYPTO'?'KAIA':currencyCode,
            price: type==='CRYPTO'? kaiaPrice: currencyCode==='USD'? price*100: price,
            items: [
              {
                itemIdentifier: itemIdentifier,
                name: name,
                imageUrl: imageUrl,
                price: type==='CRYPTO'? kaiaPrice: currencyCode==='USD'? price*100: price,
                currencyCode: type==='CRYPTO'?'KAIA':currencyCode,
              },
            ],
            testMode: true,
          });
          startPayment(data.id).then(()=> {
            finalizePayment({id: data.id});
            alert('Payment Successfully Done!');
          });
        }
        catch(error:unknown){
          alert(`Payment Failed!:${error}`);
        }
      }
    }
   },[account, createPaymentId, finalizePayment, imageUrl, itemIdentifier, kaiaPrice, name, startPayment]);

  return (
  <div className={styles.root}>
    <div><Image src={imageUrl} alt="thumbnail" width={100} height={100} /></div>
    <p>{name}</p>
    <div>
      <button onClick={()=> onPaymentButtonClick('CRYPTO')}>{kaiaPrice} KAIA</button>
      <button onClick={()=> onPaymentButtonClick('STRIPE')}>{price} USD</button>
    </div>
  </div>);
}