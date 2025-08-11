export const keiHexToKaia: (hex:string) => string = (hex:string) => {
    const clean = hex.startsWith("0x") || hex.startsWith("0X") ? hex.slice(2) : hex;
    if (clean === "") return "0";

    const kei: bigint = BigInt("0x"+clean);

    const TEN18 = BigInt(10) ** BigInt(18);

    const whole = kei / TEN18;           // integer kaia part
    const rem = kei % TEN18;             // remainder in kei for fractional part

    if (rem === BigInt(0)) {
        return whole.toString();           // exact integer
    }

    // build fractional part with leading zeros to 18 digits
    const fracRaw = rem.toString().padStart(18, "0"); // decimal string of remainder
    // trim trailing zeros
    const fracTrimmed = fracRaw.replace(/0+$/g, "");
    return `${whole.toString()}.${fracTrimmed}`;
}