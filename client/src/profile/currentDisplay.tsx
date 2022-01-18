/** @format */

import React, { ReactElement } from "react";
import SongsPanel from "./songsPanel";
import PlaylistPanel from "./playlistPanel";
import ArtistsPanel from "./artistsPanel";
import PlayerPanel from "./playerPanel";

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
  const { songs, playlist, artists, player } = parentState;

  const selectCurrentDisplay = () => {
    if (songs) {
      return <SongsPanel accessToken={accessToken}></SongsPanel>;
    } else if (playlist) {
      return <PlaylistPanel accessToken={accessToken}></PlaylistPanel>;
    } else if (artists) {
      return <ArtistsPanel accessToken={accessToken}></ArtistsPanel>;
    } else if (player) {
      return <PlayerPanel accessToken={accessToken}></PlayerPanel>;
    }
  };

  return (
    <div className="flex bg-white drop-shadow-xl font-custom my-10 py-10 w-full">
      {selectCurrentDisplay()}
    </div>
  );
}
