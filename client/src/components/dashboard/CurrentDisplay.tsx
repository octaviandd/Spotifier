/** @format */

import React, { ReactElement } from "react";
import SongsPanel from "../panels/SongsPanel";
import PlaylistPanel from "../panels/PlaylistPanel";
import ArtistsPanel from "../panels/ArtistPanel";
import PlayerPanel from "../panels/PlayerPanel";

interface Props {
  parentState: any;
}

export default function CurrentDisplay({ parentState }: Props): ReactElement {
  const { songs, playlists, artists, player } = parentState;

  const selectCurrentDisplay = () => {
    if (songs) {
      return <SongsPanel></SongsPanel>;
    } else if (playlists) {
      return <PlaylistPanel></PlaylistPanel>;
    } else if (artists) {
      return <ArtistsPanel></ArtistsPanel>;
    } else if (player) {
      return <PlayerPanel></PlayerPanel>;
    }
  };

  return (
    <div className="flex bg-white font-sans text-white mt-24 py-10">
      {selectCurrentDisplay()}
    </div>
  );
}
