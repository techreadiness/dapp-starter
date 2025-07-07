"use client";

import {ItemCard} from "@/components/Item/ItemCard";

export default function Store () {
    return (
        <div>
            <ItemCard itemIdentifier="item_1" name="item_1" imageUrl='/images/logo.png' price={1} currencyCode="USD" />
            <ItemCard itemIdentifier="item_2" name="item_2" imageUrl='/images/logo.png' price={2} currencyCode="USD" />
        </div>
    );
}