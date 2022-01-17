/** @format */

import React, { ReactElement, useEffect, useState } from "react";
import SongCard from "../utils/songCard";
import { getTracksAudioFeatures, getUserTopTracks } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    subject: "Danceability",
    A: 82,
    fullMark: 100,
  },
  {
    subject: "Valence",
    A: 90,
    fullMark: 100,
  },
  // {
  //   subject: "Tempo",
  //   A: 98,
  //   fullMark: 100,
  // },
  // {
  //   subject: "Loudness",
  //   A: 86,
  //   fullMark: 100,
  // },
  {
    subject: "Instrumentalness",
    A: 99,
    fullMark: 100,
  },
  {
    subject: "Acousticness",
    A: 85,
    fullMark: 100,
  },
  {
    subject: "Energy",
    A: 65,
    fullMark: 100,
  },
  {
    subject: "Speachiness",
    A: 65,
    fullMark: 100,
  },
  {
    subject: "Liveness",
    A: 65,
    fullMark: 100,
  },
];

interface Props {
  accessToken: string;
}

const aggregateValues = (values: any) => {
  if (values) {
    let aggregatedAcousticness = 0;
    let aggregatedLiveness = 0;
    let aggregatedSpeechiness = 0;
    let aggregatedEnergy = 0;
    let aggregatedInstrumentalness = 0;
    let aggregatedLoudness = 0;
    let aggregatedTempo = 0;
    let aggregatedValence = 0;
    let aggregatedDanceability = 0;

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

    return [
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
      // {
      //   subject: "Tempo",
      //   A: 98,
      //   fullMark: 100,
      // },
      // {
      //   subject: "Loudness",
      //   A: 86,
      //   fullMark: 100,
      // },
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
        subject: "Speachiness",
        A: aggregatedSpeechiness,
        fullMark: 100,
      },
      {
        subject: "Liveness",
        A: aggregatedLiveness,
        fullMark: 100,
      },
    ];
  }
};

const getItemsID = (arr: any): string[] => {
  let idsArray = [];
  for (let i = 0; i < arr.length; i++) {
    idsArray.push(arr[i].id);
  }
  return idsArray;
};

export default function SongsPanel({ accessToken }: Props): ReactElement {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("medium_term");
  const [state, setState] = useState({
    items: [],
    itemsIds: [],
    itemsAudio: undefined,
    aggregatedAudioValues: {},
  });

  const handleTimeRange = (e: string) => {
    setTimeRange(e);
  };

  useEffect(() => {
    const getTracks = () => {
      try {
        setLoading(true);
        getUserTopTracks(accessToken, timeRange).then((res) => {
          setState((prevState) => ({
            ...prevState,
            items: res.items,
            itemsIds: getItemsID(res.items),
          }));
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getTracks();
  }, [loading, timeRange]);

  useEffect(() => {
    const getAudio = () => {
      try {
        setLoading(true);
        getTracksAudioFeatures(accessToken, state.itemsIds).then((res) => {
          setState((prevState) => ({
            ...prevState,
            itemsAudio: res.audio_features,
            aggregatedAudioValues: aggregateValues(res.audio_features),
          }));
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getAudio();
  }, [state.items]);

  return (
    <div className="flex justify-center flex-col pt-5 px-6 ">
      <div className="mb-10">
        <div className="flex flex-row items-center pb-10 pt-5 border-b-2 border-grey-500">
          <div className="flex-grow">
            <span className="text-4xl font-mono">1. Favorite Songs</span>
          </div>
          <div className="flex-grow">
            <select
              value={timeRange}
              name="Date"
              onChange={(e) => handleTimeRange(e.target.value)}
              className="py-3 px-5 rounded-md"
            >
              <option value="short_term">Last Month</option>
              <option value="medium_term">Last Six Months</option>
              <option value="long_term">Last Year</option>
            </select>
            <button></button>
          </div>
        </div>
        {!loading ? (
          <div className="grid grid-cols-2">
            {state.items.map((item) => {
              return (
                <React.Fragment key={uuidv4()}>
                  <SongCard
                    item={item}
                    count={state.items.indexOf(item)}
                  ></SongCard>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div>wait</div>
        )}
      </div>
      <div className="flex-grow border-b-2 border-grey-500 pb-10 pt-5">
        <span className="text-4xl font-mono ">2. Songs Stats</span>
        {Object.keys(state.aggregatedAudioValues).length > 1 && (
          <ResponsiveContainer width={800} height="92.5%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
