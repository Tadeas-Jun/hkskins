import React from 'react';

import SkinCard from "./SkinCard";

function getKey(skin) {
  return (skin.metadata.name + skin.metadata.author).toString().toLowerCase();
}

// Adapted from https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58
function SkinList({ filteredSkins }) {
  const filtered = filteredSkins
    .sort((a, b) => getKey(a).localeCompare(getKey(b)))
    .map(skin => <SkinCard key={getKey(skin)} image={skin.imagePath} name={skin.metadata.name} source={skin.metadata.source} author={skin.metadata.author} description={skin.metadata.desc} dateAdded={skin.metadata.dateAdded} />);

  return (
    <div id='knight-skins'>
      {filtered}
    </div>
  );

}

export default SkinList;