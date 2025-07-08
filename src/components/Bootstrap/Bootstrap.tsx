"use client";

import {ReactNode} from "react";
import {useKaiaWalletSecurity} from "@/components/Wallet/Sdk/walletSdk.hooks";

export type BootstrapProps = {
    className?: string;
    children?: ReactNode;
}

export const Bootstrap = ({className, children}: BootstrapProps) => {
    const { isSuccess } = useKaiaWalletSecurity();
    return (
        <div className={className}>{isSuccess && children}</div>
    )
}

