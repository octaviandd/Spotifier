/** @format */

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

export const getUserTopTracks = async (token: string) => {
  try {
    let res = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?" +
        new URLSearchParams({
          time_range: "medium_term",
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
