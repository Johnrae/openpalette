import { ethers } from "ethers";
import Head from "next/head";
import { Spacer } from "../components/Spacer";
import { Base64 } from "../utils/base64";
import { contractAddress } from "../utils/contract";

function getOpenSeaUrl(index: number) {
  return `https://opensea.io/assets/${contractAddress}/${index}`;
}

function fromUTF8(uint8Array: Uint8Array) {
  const decoder = new TextDecoder();
  return decoder.decode(uint8Array);
}

function decodeTokenData(uri: string) {
  const data = uri.replace("data:application/json;base64,", "");
  return JSON.parse(fromUTF8(Base64.decode(data)));
}

export async function fetchAllTokenIds(
  contract: ethers.Contract,
  address: string
) {
  let tokens: number[] = [];

  for (let index = 0; index < 10000; index++) {
    try {
      const tokenId = await contract.tokenOfOwnerByIndex(address, index);

      tokens.push(+tokenId);
    } catch {
      break;
    }
  }

  return tokens;
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>OpenPalette</title>
        <meta
          name="description"
          content="Blockchain-based color palette data."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>OpenPalette</h1>
      <p>On-chain, randomly generated color palette data.</p>
      <Spacer.Vertical size={40} />
      <img
        style={{
          width: 250,
          height: 250,
          filter: "drop-shadow(0px 2px 4px black)",
          alignSelf: "center",
        }}
        src="/logo.png"
        alt=""
      />
      <h2>Community Projects</h2>
      <p>
        <div>
          <a href="https://openpalette-explorer.vercel.app/">Palette browser</a>
          <br />
          <a href="https://uniodex.github.io/red-billion/">
            Open Palette Drifting (game)
          </a>
        </div>
      </p>
      <p></p>
    </div>
  );
}
