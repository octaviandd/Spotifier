/** @format */

import { useState, useEffect } from "react";
import SpotifyLogo from "../assets/spotify.png";

export const aggregateValues = (values: any, items: any) => {
  if (values && items) {
    let aggregatedAcousticness = 0;
    let aggregatedLiveness = 0;
    let aggregatedSpeechiness = 0;
    let aggregatedEnergy = 0;
    let aggregatedInstrumentalness = 0;
    let aggregatedLoudness = 0;
    let aggregatedTempo = 0;
    let aggregatedValence = 0;
    let aggregatedDanceability = 0;
    let tempoValues = [];
    let loudnessValues = [];

    if (values.length > 1) {
      for (let i = 0; i < values.length; i++) {
        aggregatedAcousticness += values[i].acousticness;
        aggregatedLiveness += values[i].liveness;
        aggregatedSpeechiness += values[i].speechiness;
        aggregatedEnergy += values[i].energy;
        aggregatedInstrumentalness += values[i].instrumentalness;
        aggregatedLoudness += values[i].loudness;
        aggregatedTempo += values[i].tempo;
        aggregatedValence += values[i].valence;
        aggregatedDanceability += values[i].danceability;
        tempoValues.push(values[i].tempo);
        loudnessValues.push(values[i].loudness);
      }
    }

    aggregatedAcousticness = Number(
      ((aggregatedAcousticness * 100) / 50).toFixed(0)
    );
    aggregatedLiveness = Number(((aggregatedLiveness * 100) / 50).toFixed(0));
    aggregatedSpeechiness = Number(
      ((aggregatedSpeechiness * 100) / 50).toFixed(0)
    );
    aggregatedEnergy = Number(((aggregatedEnergy * 100) / 50).toFixed(0));
    aggregatedInstrumentalness = Number(
      ((aggregatedInstrumentalness * 100) / 50).toFixed(0)
    );
    aggregatedLoudness = Number((aggregatedLoudness / 50).toFixed(0));
    aggregatedTempo = Number((aggregatedTempo / 50).toFixed(0));
    aggregatedValence = Number(((aggregatedValence * 100) / 50).toFixed(0));
    aggregatedDanceability = Number(
      ((aggregatedDanceability * 100) / 50).toFixed(0)
    );

    const tempoData = [];
    for (let i = 0; i < tempoValues.length; i++) {
      tempoData.push({
        BPS: tempoValues[i],
        // icon: items[i].images[0]
        //   ? items[i].images[0].url
        //   : items[i].images[1]
        //   ? items[i].images[1].url
        //   : items[i].images[2]
        //   ? items[i].images[2].url
        //   : SpotifyLogo,
      });
    }

    const loudnessData: any[] = [];
    for (let i = 0; i < loudnessValues.length; i++) {
      loudnessData.push({ db: loudnessValues[i] });
    }

    const data = [
      {
        subject: "Danceability",
        A: aggregatedDanceability,
        fullMark: 100,
      },
      {
        subject: "Valence",
        A: aggregatedValence,
        fullMark: 100,
      },
      {
        subject: "Instrumentalness",
        A: 99,
        fullMark: 100,
      },
      {
        subject: "Acousticness",
        A: aggregatedAcousticness,
        fullMark: 100,
      },
      {
        subject: "Energy",
        A: aggregatedEnergy,
        fullMark: 100,
      },
      {
        subject: "Speechiness",
        A: aggregatedSpeechiness,
        fullMark: 100,
      },
      {
        subject: "Liveness",
        A: aggregatedLiveness,
        fullMark: 100,
      },
    ];

    return { data, secondaryData: { tempoData, loudnessData } };
  }
};

export const getItemsID = (arr: any): string[] => {
  let idsArray = [];
  for (let i = 0; i < arr.length; i++) {
    idsArray.push(arr[i].id);
  }
  return idsArray;
};

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
