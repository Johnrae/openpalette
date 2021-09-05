import Head from "next/head";

export default function About() {
  return (
    <div className="container">
      <Head>
        <title>About</title>
        <meta name="description" content="About OpenPalette" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>OpenPalette</h1>
      <div
        style={{
          marginBottom: "4rem",
          maxWidth: "500px",
        }}
      >
        <p>
          An <strong>OpenPalette</strong> is a randomized color palette
          generated on the ethereum blockchain. It can act as a public data
          source for generative art, games, website themes, and more. Feel free
          to use OpenPalette in any way you want.
        </p>
        <p>
          There are <strong>10,000</strong> palettes total, with #0 to #9899
          claimable by anyone, and #9900 to #9999 currently reserved for the
          contract deployer.
        </p>
        <p>
          OpenPalette was created by{" "}
          <a href="https://twitter.com/dvnabbott">Devin Abbott</a> and heavily
          inspired by <a href="https://www.lootproject.com/">Loot</a> and{" "}
          <a href="https://twitter.com/developer_dao">Developer DAO</a>.
        </p>
      </div>
    </div>
  );
}
