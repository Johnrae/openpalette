import Head from "next/head";

export default function About() {
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
          maxWidth: "500px",
        }}
      >
        <h1>OpenPalette</h1>
        <p>
          An <strong>OpenPalette</strong> is a randomized color palette
          generated on the ethereum blockchain. It can act as a publicly
          available data source for generative art, games, website themes, and
          more. Feel free to use OpenPalette in any way you want.
        </p>
        <h2>Supply</h2>
        <p>
          There are <strong>10,000</strong> palettes total, with #0 to #9899
          claimable by anyone, and #9900 to #9999 currently reserved for the
          contract deployer.
        </p>
        <h2>Author</h2>
        <p>
          OpenPalette was created by{" "}
          <a href="https://twitter.com/dvnabbott">Devin Abbott</a>. It was
          heavily inspired by <a href="https://www.lootproject.com/">Loot</a>{" "}
          and <a href="https://twitter.com/developer_dao">Developer DAO</a>. The
          OpenPalette logo was designed by{" "}
          <a href="https://twitter.com/souporserious">Travis Arnold</a>.
        </p>
        <h2>Contract</h2>
        <p>
          Here{"'"}s the contract on{" "}
          <a href="https://etherscan.io/address/0x1308c158e60d7c4565e369df2a86ebd853eef2fb#code">
            Etherscan
          </a>
          . The most interesting part turned out to be finding a contrasting
          text color to draw over each background color. The calculation is
          conceptually simple... but tricky to do without floating point math!
        </p>
      </div>
    </div>
  );
}
