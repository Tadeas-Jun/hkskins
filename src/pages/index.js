import React, { useState } from 'react';
import { graphql } from 'gatsby';

import "../styles/styles.scss";
import SkinList from '../components/SkinList';

import { IconContext } from "react-icons";
import { BsGithub } from "react-icons/bs";
import { BsEnvelopeHeart } from "react-icons/bs";
import TabRadio from '../components/TabRadio';

const IndexPage = ({data}) => {

  const skins = data.allSkin.nodes;

  const [tab, setTab] = useState("hollowKnight");
  const handleTabChange = e => {
    setTab(e.target.value);
  };

  const [searchField, setSearchField] = useState("");

  const [showCharacterSkins, setShowCharacterSkins] = useState(true);
  const [showOtherSkins, setShowOtherSkins] = useState(true);


  const getCharacterName = () => {

    if (tab === "hollowKnight") {
      return "Knight";
    } else if (tab === "silksong") {
      return "Hornet";
    }

    return "character";

  }

  const filterFunction = (skin) => {

    return (
      // Search term included in name or authors
      (
        skin
          .metadata.name
          .toLowerCase()
          .includes(searchField.toLowerCase())
        ||
        skin
          .metadata.author
          .toLowerCase()
          .includes(searchField.toLowerCase())
      ) &&
      // Game matches with selected tab
      (
        skin.metadata.game === tab
      ) &&
      // Type matches filters
      (
        (
          skin.metadata.type === "character" && showCharacterSkins
        ) ||
        (
          skin.metadata.type !== "character" && showOtherSkins
        )
      )
    )

  }

  const filteredSkins = skins.filter(filterFunction);

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

      <p>A repository of skins for the game Hollow Knight and its sequel, Silksong. Created and maintained by <span style={{ color: "#ff652f" }}>Tadeas Jun</span>. Read more about this project on <a href="https://www.tadeasjun.com/blog/hollow-knight-skins/" target="_blank" rel="noreferrer">my blog</a>. Support the project <a href="https://paypal.me/TadeasJun" target='_blank' rel="noreferrer">on PayPal</a>.</p>

      <h2>Sources</h2>
      <p>The skins were collected from all around the internet. A special thanks goes to <a href="https://www.twitch.tv/colettemslp" target='_blank' rel="noreferrer">ColetteMSLP</a> for <a href="https://docs.google.com/document/d/1qKfOtOXpYormusD05I700P8d79E74R1bTb3MP4vum-E/" target='_blank' rel="noreferrer">her list</a>, and to the Hollow Knight Discord communities (<a href="http://discord.gg/hollowknight" target='_blank' rel="noreferrer">main</a>, <a href="https://discord.gg/VDsg3HmWuB" target='_blank' rel="noreferrer">modding</a>) for spending countless hours tracking down skin files.</p>
      <p>Every skin in the list links to the original source. If one of the links breaks, please let me know -- all of the skins on this website are internally archived and broken links can be replaced. You can reach me via email at <a href="mailto:contact@tadeasjun.com">contact@tadeasjun.com</a>. Some of the links lead directly to a Discord message. If you click on a link which opens Discord and you aren't able to access the skin, please make sure that you have a Discord account and have joined the two Hollow Knight servers listed above.</p>
      <p>To install a skin, please refer to the <a href="https://prashantmohta.github.io/HollowKnight.CustomKnight/" target='_blank' rel='noreferrer'>CustomKnight documentation</a>.</p>

      <h2>Skins</h2>
      <p>At the moment, the repository records <b>{skins.length} skins</b> for the Knight, Hornet, and other sprites in the games.</p>
      <p>If you know of a skin that is not on this list, please request it via <a href="https://github.com/Tadeas-Jun/hkskins/discussions/new?category=ideas" target='_blank' rel="noreferrer">GitHub Discussions</a> or by contacting me directly.</p>
      <p>The entire list (.zip file containing a directory for each skin, each including a metadata.json file and the preview.png file) can be downloaded <a href="/skins.zip">here</a>. At the moment, the list of skins that don't include the player character is incomplete. I am working on adding these skins when I find some free time.</p>

      <div className='tabs'>
        <TabRadio name='tab' value='hollowKnight' checked={tab === 'hollowKnight'} text='Hollow Knight' icon={'/images/knight-icon.png'} iconAlt="The head of the Knight from Hollow Knight." onChange={handleTabChange} />
        <TabRadio name='tab' value='silksong' checked={tab === 'silksong'} text='Silksong' icon={'/images/hornet-icon.png'} iconAlt="The head of Hornet from Hollow Knight." onChange={handleTabChange} />
      </div>
      <div className="search">
        <input type="search" placeholder="Search skins by name or author" onChange={handleSearchChange} />
        <div>
          <label className='checkbox-label'>
            <input type="checkbox" checked={showCharacterSkins} onChange={() => setShowCharacterSkins(!showCharacterSkins)} />
            {getCharacterName()} skins
          </label>
          <label className='checkbox-label'>
            <input type="checkbox" checked={showOtherSkins} onChange={() => setShowOtherSkins(!showOtherSkins)} />
            Non&#8209;{getCharacterName()} skins
          </label>
        </div>
      </div>

      <hr />

      <div id="skins">
        <SkinList filteredSkins={filteredSkins} />
      </div>
      <p className='copyright'>Copyright © 2024 - 2025 Tadeas Jun</p>
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
  query Skins {
    allSkin {
      nodes {
        subDir
        imagePath
        metadata {
          name
          source
		      author
          game
          type
          desc
          dateAdded
        }
      }
    }
  }
`;
