/** @format */

import { useState, useEffect } from "react";

export const useIsVisible = (elementRef: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(elementRef.current);
            }
          });
        },
        { root: null, rootMargin: "0px 0px 0px 0px", threshold: 0 }
      );
      observer.observe(elementRef.current);
    }
  }, [elementRef]);

  return isVisible;
};

const generateRandomString = function (length: number): string {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const scope: string =
  "user-read-private user-read-email user-read-playback-state user-top-read user-read-recently-played user-follow-read user-library-read";

export const URL: string =
  `https://accounts.spotify.com/authorize?` +
  new URLSearchParams({
    client_id: "c80dc2ae16884491b82fca219719f0c4",
    response_type: "token",
    scope: scope,
    redirect_uri: "http://localhost:8080",
    show_dialog: "true",
    state: generateRandomString(16),
  });

export const getMe = async (token: string) => {
  try {
    let res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserTopTracks = async (token: string, time_range: string) => {
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowedArtists = async (token: string) => {
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecommendedGenres = async (token: string) => {
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTracksAudioFeatures = async (token: string, ids: string[]) => {
  try {
    let params = ids.toString();
    let res = await fetch(
      "https://api.spotify.com/v1/audio-features?" +
        new URLSearchParams({ ids: params }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRelatedArtists = async (token: string, id: string) => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/artists/${id}/related-artists`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedPlaylists = async (token: string) => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/browse/featured-playlists`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlaylist = async (token: string, id: string) => {
  try {
    let res = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getArtist = async (token: string, id: string) => {
  try {
    let res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecommendedSongs = async (
  token: string,
  seedArtists: any,
  soundData: any
) => {
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
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchArtist = async (token: string, name: string) => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/search?` +
        new URLSearchParams({ q: name, type: "artist", limit: "20" }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPlaylists = async (token: string, userID: string) => {
  try {
    let res = await fetch(
      `https://api.spotify.com/v1/users/${userID}/playlists?` +
        new URLSearchParams({ limit: "20" }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
