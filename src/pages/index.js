import React, { useState } from 'react';
import { graphql } from 'gatsby';

import "../styles/styles.scss";
import SkinList from '../components/SkinList';

import { IconContext } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { BsEnvelopeHeart } from "react-icons/bs";

const IndexPage = ({data}) => {

  const knightSkins = data.allKnightSkin.nodes;

  const [searchField, setSearchField] = useState("");

  const filteredSkins = knightSkins.filter(
    skin => {
      return (
        skin
        .metadata.name
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        skin
        .metadata.author
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleSearchChange = e => {
    setSearchField(e.target.value);
  };

  return (
    <main>
      <div id='header'>
        <h1>HKSkins</h1>
        <IconContext.Provider value={{ size: "2em" }}>
          <div id='icons'>
            <a className="no-link" href="https://paypal.me/TadeasJun" title="Donate"><BsEnvelopeHeart /></a>
            <a className="no-link" href="https://github.com/Tadeas-Jun/hkskins" title="Source code"><BsGithub /></a>
          </div>
        </IconContext.Provider>
      </div>

      <p>A repository of skins for the game Hollow Knight. Created and maintained by <span style={{ color: "#ff652f" }}>Tadeas Jun</span>. Read more about this project on <a href="https://www.tadeasjun.com/blog/hollow-knight-skins/" target="_blank">my blog</a>. Support the project <a href="https://paypal.me/TadeasJun" target='_blank' rel="noreferrer">on PayPal</a>.</p>

      <h2>Sources</h2>
      <p>The skins were collected from all around the internet. A special thanks goes to <a href="https://www.twitch.tv/colettemslp" target='_blank' rel="noreferrer">ColleteMSLP</a> for <a href="https://docs.google.com/document/d/1qKfOtOXpYormusD05I700P8d79E74R1bTb3MP4vum-E/" target='_blank' rel="noreferrer">her list</a>, and to the Hollow Knight Discord communities (<a href="http://discord.gg/hollowknight" target='_blank' rel="noreferrer">main</a>, <a href="https://discord.gg/VDsg3HmWuB" target='_blank' rel="noreferrer">modding</a>) for spending countless hours tracking down skin files. Every skin in the list links to the original source. If one of the links breaks, please let me know -- all of the skins on this website are internally archived and broken links can be replaced. You can reach me via email at <a href="mailto:contact@tadeasjun.com">contact@tadeasjun.com</a>, or on Discord at <span style={{ color: "#7289DA" }}>@tadeasjun</span>.</p>

      <h2>Skins</h2>
      <p>At the moment, the repository records <b>{knightSkins.length} skins</b> for the Knight and other sprites in the game.</p>
      <p>If you know of a skin that is not on this list, please request it via <a href="https://github.com/Tadeas-Jun/hkskins/discussions/new?category=ideas" target='_blank'>GitHub Discussions</a> or by contacting me directly.</p>
      <p>The entire list (.zip file containing a directory for each skin, each including a metadata.json file and the preview.png file) can be downloaded <a href="/skins.zip">here</a>. Skins that don't include the Knight are currently not included in this archive, but are planned to be added later.</p>

      <div className="search">
        <input type="search" placeholder="Search skins by name or author" onChange={handleSearchChange} />
      </div>
      <div id="knight-skins">
        <SkinList filteredSkins={filteredSkins} />
      </div>
    </main>
  )
}

export default IndexPage;

export const Head = () => {
  return (
    <>
      <title>HKSkins</title>
      <script defer src="https://umami.tadeasjun.com/script.js" data-website-id="8234637c-736d-4090-bf13-43d84fb3ac5b"></script>
    </>
  )
}

export const knightQuery = graphql`
  query KnightSkins {
    allKnightSkin {
      nodes {
        subDir
        imagePath
        metadata {
          name
          source
		      author
          desc
          dateAdded
        }
      }
    }
  }
`;
