import { ethers } from "ethers";
import Head from "next/head";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { fetchAllTokenIds } from ".";
import { Spacer } from "../components/Spacer";
import Starscape from "../components/StarScape";
import { abi, contractAddress } from "../utils/contract";

export default function About() {
  const ethereum = typeof window !== "undefined" && (window as any).ethereum;
  const [isConnected, setIsConnected] = useState(false);
  const [colors, setColors] = useState<string[] | undefined>();
  const [tokenIds, setTokenIds] = useState<number[]>();
  const [selectedId, setSelectedId] = useState<number | undefined>();

  const onClick = useCallback(() => {
    async function getColors() {
      await ethereum.enable();

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      const address = await signer.getAddress();

      const contract = new ethers.Contract(contractAddress, abi, provider);

      const tokenIds = await fetchAllTokenIds(contract, address);

      if (tokenIds.length > 0) {
        setTokenIds(tokenIds);
        setSelectedId(tokenIds[0]);
        setIsConnected(true);
      }
    }

    getColors().catch((e) => {
      console.error(e);

      setIsConnected(false);
    });
  }, [ethereum]);

  console.log("current id", selectedId, colors);

  useEffect(() => {
    if (selectedId === undefined) return;

    async function getColors() {
      await ethereum.enable();

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      const address = await signer.getAddress();

      const contract = new ethers.Contract(contractAddress, abi, provider);

      const colors = await contract.getColors(selectedId);

      setColors(colors.split(" "));
    }

    getColors().catch((e) => {
      console.error(e);
    });
  }, [ethereum, selectedId]);

  return (
    <div className="container">
      <Head>
        <title>About</title>
        <meta name="description" content="About OpenPalette" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          marginBottom: "4rem",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Art</h1>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {!isConnected && <button onClick={onClick}>Connect wallet</button>}
          {tokenIds && (
            <>
              <label style={{ fontSize: "1rem" }} htmlFor="palette-switcher">
                Current palette
              </label>
              <Spacer.Horizontal size={10} />
              <select
                id="palette-switcher"
                onChange={(event) => {
                  setSelectedId(Number(event.target.value));
                }}
              >
                {tokenIds.map((id) => (
                  <option value={id} key={id}>
                    Palette #{id}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        <Spacer.Vertical size={20} />
        {tokenIds && (
          <p>These shaders use your blockchain-based color palette.</p>
        )}
        <Spacer.Vertical size={20} />
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {colors && <Starscape colors={colors} index={1} />}
          {colors && <Starscape colors={colors} index={2} />}
        </div>
      </div>
    </div>
  );
}
