import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=kaia&vs_currencies=usd');
        const data = await res.json();

        const usdToKaia = 1 / data.kaia.usd;

        return NextResponse.json({ kaia: usdToKaia });
    } catch (error) {
        console.error('Error fetching KAIA price:', error);
        return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
    }
}
