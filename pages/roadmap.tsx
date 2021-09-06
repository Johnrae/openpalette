import Head from "next/head";
import { Spacer } from "../components/Spacer";

const PaletteToken = ({
  color,
  outline,
}: {
  color: string;
  outline: string;
}) => {
  return (
    <span
      style={{
        display: "inline-flex",
        background: "rgba(0,0,0,0.3)",
        borderRadius: "4px",
        padding: "0px 6px",
        margin: "0 4px",
        fontFamily: "monospace",
        alignItems: "center",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "16px",
          height: "16px",
          borderRadius: "8px",
          backgroundColor: color,
          border: `1px solid ${outline}`,
        }}
      />
      <Spacer.Horizontal inline size={4} />
      {color}
    </span>
  );
};

export default function Roadmap() {
  return (
    <div className="container">
      <Head>
        <title>Roadmap Preview</title>
        <meta name="description" content="Roadmap Preview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="no-justify"
        style={{
          marginBottom: "2rem",
          maxWidth: "700px",
        }}
      >
        <h1>Roadmap Preview</h1>
        <p>
          To start, I seriously wasn&rsquo;t expecting this level of support.
          All 9,900 OpenPalettes were minted{" "}
          <em style={{ opacity: 1 }}>within the first 24 hours</em>. It&rsquo;s
          incredible how much love the project has received already, and the
          excitement for where it&rsquo;s going. 🌈
        </p>
        <p>
          I&rsquo;m going to break down this roadmap preview into two
          categories, short and long term, to give an idea of what’s coming
          next.
        </p>
        <h2>Short Term:</h2>
        <ol>
          <li>
            <p>
              OpenPalette is exciting because of the layers that can be built on
              top of it. To demonstrate what this means, we&rsquo;ll launch a
              pilot use case that&rsquo;s unlocked by OpenPalette NFTs:
            </p>
            <p>
              <strong>
                OpenPalette Art: Generative artwork that interacts with your
                OpenPalette to craft one-of-a-kind art NFTs
              </strong>
            </p>
            <p>
              If you have an OpenPalette, you&rsquo;ve tried the art page on
              this site — it&rsquo;s fun to see how different OpenPalettes bring
              the artwork to life, creating a collection of unique experiences.
              But it’s limited in the sense that the art is only made available
              to you temporarily (I&rsquo;ve seen everybody Tweet their
              screenshots, which is awesome btw 🌈).
            </p>
            <p>
              Get ready for OpenPalette Art, a vastly improved system that
              leverages new and existing art collaborations, and makes it
              possible for OpenPalette holders to mint never-before-seen,
              personalized art NFTs.
            </p>
          </li>
          <li>
            <p>
              <strong>Rarity attributes for OpenPalettes</strong>
            </p>
            <p>
              Personally, I just love building cool stuff, but I know a lot of
              people love trading and collecting NFTs, and things are in the
              works to support that too. I won&rsquo;t say much about this yet,
              but if you have a{" "}
              <PaletteToken color="#000000" outline="rgba(255,255,255,0.25)" />{" "}
              or
              <PaletteToken color="#ffffff" outline="rgba(0,0,0,0.25)" />, I
              might suggest holding onto it 👀.
            </p>
          </li>
        </ol>
        <h2>Longer term</h2>
        <p>
          OpenPalette is designed for collaboration — with NFT creators and
          artists, developers and the wider Web3 ecosystem.
        </p>
        <p>
          Initially I built OpenPalette myself, but the real value will be
          unlocked by the ecosystem that OpenPalette enables. I think we can
          look forward to multiple integrations and collaborations before even a
          fraction of its full potential is demonstrated.
        </p>
        <p>
          We&rsquo;re currently exploring different avenues for OpenPalette and
          the community behind it. Our goal is to discover ways in which we can
          continuously improve the project, while also unlocking benefits and
          value for those who own a piece of this creative project along the
          way.
        </p>
        <p>
          I love hearing from everyone who has ideas, feedback, or is just
          excited about OpenPalette. Though I&rsquo;m kind of swamped with
          messages right now, I try to check my Twitter and the new Discord
          whenever I can. Please reach out about collaborations!
        </p>
        <hr />
        <p>
          If you&rsquo;re following me on Twitter (@dvnabbott or @open_pal),
          you&rsquo;ll know this is my first foray into smart contracts, so
          I&rsquo;m seeing this world with fresh eyes and figuring some things
          out as I go. I&rsquo;ve really enjoyed being a part of the community
          so far, and I can&rsquo;t wait to see what we can build together!
        </p>
      </div>
    </div>
  );
}
