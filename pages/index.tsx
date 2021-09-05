import { ethers } from "ethers";
import Head from "next/head";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { Base64 } from "../utils/base64";
import { contractAddress, abi } from "../utils/contract";

function getOpenSeaUrl(index: number) {
  return `https://testnets.opensea.io/assets/${contractAddress}/${index}`;
}

function fromUTF8(uint8Array: Uint8Array) {
  const decoder = new TextDecoder();
  return decoder.decode(uint8Array);
}

function decodeTokenData(uri: string) {
  const data = uri.replace("data:application/json;base64,", "");
  return JSON.parse(fromUTF8(Base64.decode(data)));
}

async function fetchAllTokenIds(contract: ethers.Contract, address: string) {
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
  const ethereum = typeof window !== "undefined" && (window as any).ethereum;
  console.log(Object.keys(ethereum));
  const [enabled, setEnabled] = useState(true);
  const [isMinting, setIsMinting] = useState(false);
  const [tokenUri, setTokenUri] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<ReactNode>(
    ethereum ? (
      "Click the button to mint. It's free (minus gas)."
    ) : (
      <>
        {`Your browser doesn't support web3. Consider installing `}
        <a href="https://metamask.io/">MetaMask</a>.
      </>
    )
  );

  const mint = useCallback(() => {
    async function mint() {
      setStatus("Requesting permission...");

      await ethereum.enable();

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, provider);

      const address = await signer.getAddress();

      const contractWithSigner = contract.connect(signer);

      const transaction = await contractWithSigner.claim();

      setIsMinting(true);

      setStatus("Minting... this usually takes about 30 seconds.");

      await transaction.wait();

      setIsMinting(false);

      setStatus("Minted.");

      const tokenIds = await fetchAllTokenIds(contract, address);

      tokenIds.reverse();

      const [newest] = tokenIds;

      console.log(tokenIds, newest);

      const tokenUri = await contract.tokenURI(newest);

      setTokenUri(tokenUri);
      setStatus(
        <div>
          Minted: <a href={getOpenSeaUrl(newest)}>Palette #{newest}</a>
          <em>&nbsp;(It may take a minute to show)</em>
        </div>
      );
    }

    setEnabled(false);

    mint()
      .catch((e) => {
        console.error(e);

        setStatus("Aborted.");

        setEnabled(true);
      })
      .then(() => {
        setIsMinting(false);
      });
  }, [ethereum]);

  const svgString = useMemo(() => {
    if (!tokenUri) return;

    // console.log(tokenUri);

    const tokenData = decodeTokenData(tokenUri);
    const imageData = tokenData.image;

    // console.log(tokenData, imageData);

    return imageData;
  }, [tokenUri]);

  return (
    <div
      className="container"
      style={{
        justifyContent: "center",
      }}
    >
      <Head>
        <title>Mint</title>
        <meta name="description" content="Mint an OpenPalette" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {svgString ? (
        <div
          style={{
            width: 500,
            height: 500,
            backgroundSize: "cover",
            backgroundImage: `url('${svgString}')`,
          }}
        />
      ) : (
        <button onClick={mint} disabled={!enabled}>
          Mint my <strong>OpenPalette</strong>
        </button>
      )}
      <span className={"status " + (isMinting ? "flickerAnimation" : "")}>
        {status}
      </span>
    </div>
  );
}
