import { ethers } from "ethers";
import Head from "next/head";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { Base64 } from "../utils/base64";
import { contractAddress, abi } from "../utils/contract";

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
    <div
      className="container"
      style={{
        justifyContent: "center",
      }}
    >
      <Head>
        <title>OpenPalette</title>
        <meta
          name="description"
          content="Blockchain-based color palette data."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img
        style={{
          width: 300,
          height: 300,
          marginBottom: "4rem",
          filter: "drop-shadow(0px 2px 4px black)",
        }}
        src="/logo.png"
        alt=""
      />
      <button onClick={() => {}} disabled={true}>
        Sold out.
      </button>
      <span className={"status flickerAnimation"}>
        Thank you for the support! 🌈
      </span>
    </div>
  );
}
