/** @format */

import React, { ReactElement } from "react";
import SongsPanel from "../panels/SongsPanel";
import PlaylistPanel from "../panels/PlaylistPanel";
import ArtistsPanel from "../panels/ArtistPanel";
import PlayerPanel from "../panels/PlayerPanel";

interface Props {
  parentState: any;
  setParentState: any;
  accessToken: string;
}

export default function CurrentDisplay({
  parentState,
  setParentState,
  accessToken,
}: Props): ReactElement {
  const { songs, playlists, artists, player } = parentState;

  const selectCurrentDisplay = () => {
    if (songs) {
      return <SongsPanel accessToken={accessToken}></SongsPanel>;
    } else if (playlists) {
      return <PlaylistPanel accessToken={accessToken}></PlaylistPanel>;
    } else if (artists) {
      return <ArtistsPanel accessToken={accessToken}></ArtistsPanel>;
    } else if (player) {
      return <PlayerPanel accessToken={accessToken}></PlayerPanel>;
    }
  };

  return (
    <div className="flex bg-white drop-shadow-xl font-sans text-white mt-24 py-10 w-full">
      {selectCurrentDisplay()}
    </div>
  );
}
