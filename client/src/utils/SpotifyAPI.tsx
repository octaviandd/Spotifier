/** @format */
import axios from "axios";

const EXPIRATION_TIME = 3600 * 1000;
const setTokenTimestamp = () =>
  window.localStorage.setItem("spotify_token_timestamp", String(Date.now()));
const getLocalRefreshToken = () =>
  window.localStorage.getItem("spotify_refresh_token");
const getLocalAccessToken = () =>
  window.localStorage.getItem("spotify_access_token");
const setLocalAccessToken = (token: string) => {
  setTokenTimestamp();
  window.localStorage.setItem("spotify_access_token", token);
};
const setLocalRefreshToken = (token: string) =>
  window.localStorage.setItem("spotify_refresh_token", token);
const getTokenTimestamp = () =>
  window.localStorage.getItem("spotify_token_timestamp");

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/refresh_token#refresh_token=${getLocalRefreshToken()}`
    );
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

const getHashParams = () => {
  const hashParams: any = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }
  console.log(Date.now() - Number(getTokenTimestamp()), EXPIRATION_TIME);
  if (Date.now() - Number(getTokenTimestamp()) > EXPIRATION_TIME) {
    console.warn("Access token has expired, refreshing...");
    refreshAccessToken();
  }
  const localAccessToken = getLocalAccessToken();

  if ((!localAccessToken || localAccessToken === "undefined") && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const logOut = () => {
  window.localStorage.removeItem("spotify_access_token");
  window.localStorage.removeItem("spotify_refresh_token");
  window.localStorage.removeItem("spotify_token_timestamp");
  history.replaceState(null, "", "/");
  window.location.reload();
};

export const token = getAccessToken();

export const getMe = async () => {
  try {
    let res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocalAccessToken()}`,
      },
    });

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserTopTracks = async (time_range: string) => {
  try {
    let res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?" +
        new URLSearchParams({
          time_range: time_range,
          limit: "50",
        }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowedArtists = async () => {
  try {
    let res = await fetch(
      "https://api.spotify.com/v1/me/following?" +
        new URLSearchParams({
          type: "artist",
          limit: "50",
        }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecommendedGenres = async () => {
  try {
    let res = await fetch(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds?" +
        new URLSearchParams({
          type: "artist",
          limit: "25",
        }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTracksAudioFeatures = async (ids: string[]) => {
  try {
    let params = ids.toString();
    let res = await fetch(
      "https://api.spotify.com/v1/audio-features?" +
        new URLSearchParams({ ids: params }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedArtists = async (id: string) => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/artists/${id}/related-artists`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedPlaylists = async () => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/browse/featured-playlists`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlaylist = async (id: string) => {
  try {
    let res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocalAccessToken()}`,
      },
    });

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getArtist = async (id: string) => {
  try {
    let res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocalAccessToken()}`,
      },
    });

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecommendedSongs = async (seedArtists: any, soundData: any) => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/recommendations?` +
        new URLSearchParams({
          seed_artists: seedArtists,
          limit: "50",
          target_danceability: soundData.danceability,
          target_acousticness: soundData.acousticness,
          target_energy: soundData.energy,
          target_instrumentalness: soundData.instrumentalness,
          target_liveness: soundData.liveness,
          target_loudness: soundData.loudness,
          target_speechiness: soundData.speechiness,
          target_valence: soundData.valence,
        }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchArtist = async (name: string) => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/search?` +
        new URLSearchParams({ q: name, type: "artist", limit: "20" }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlaylists = async (userID: string) => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists?` +
        new URLSearchParams({ limit: "20" }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeeklyTrendingSongsGlobally = async () => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getLocalAccessToken()}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
