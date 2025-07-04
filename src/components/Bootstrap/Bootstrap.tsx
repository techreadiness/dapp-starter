"use client";

import {ReactNode} from "react";
import {useKaiaWalletSecurity} from "@/components/Wallet/Sdk/walletSdk.hooks";

export type BootstrapProps = {
    children?: ReactNode;
}

export const Bootstrap = ({children}: BootstrapProps) => {
    const { isSuccess } = useKaiaWalletSecurity();
    return (
        <div>{isSuccess && children}</div>
    )
}

