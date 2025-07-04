import {NextRequest, NextResponse} from "next/server";

type PG_TYPE = 'CRYPTO' | 'STRIPE';
type CurrencyCode =  'USD'| 'KRW'|'JPY'|'TWD'|'THB'|'KAIA';
type Item = {
    itemIdentifier: string,
    name: string,
    imageUrl: string,
    price: number,
    currencyCode: CurrencyCode,
}

interface purchaseRequest {
    buyerDappPortalAddress: string,
    pgType: PG_TYPE,
    currencyCode: CurrencyCode,
    price: number,
    items: Item[],
    testMode: boolean,
}

export async function POST(req: NextRequest) {
    try {
        const data: purchaseRequest = await req.json();
        const result = await fetch(
            "https://payment.dappportal.io/api/payment-v1/payment/create",
            {
                method: "POST",
                headers: {
                    "X-Client-Id": process.env.NEXT_PUBLIC_CLIENT_ID as string,
                    "X-Client-Secret": process.env.CLIENT_SECRET as string,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    buyerDappPortalAddress: data.buyerDappPortalAddress,
                    pgType: data.pgType,
                    currencyCode: data.currencyCode,
                    price: data.price,
                    items: data.items,
                    testMode: data.testMode,
                    paymentStatusChangeCallbackUrl: `${process.env.API_URL}/webhook/status-change`,
                }),
            }
        );
        const { id } = await result.json();
        return NextResponse.json({id: id },{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Payment is failed" }, { status: 400 });
    }
}
