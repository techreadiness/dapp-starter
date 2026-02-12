import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
    const img = await fetch(
        new URL("./og-asset/opengraph-image.png", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#000",
                }}
            >
                <img
                    src={img as never}
                    style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                        objectFit: 'contain',
                    }}
                    alt="og"
                />
            </div>
        ),
        size
    );
}
