/** @format */

import React, { useEffect, useState } from "react";
import { searchArtist } from "./SpotifyAPI";
import SpotifyLogo from "../assets/spotify.png";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  Bar,
  Legend,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

import { CustomToolTip, CustomToolTipFollowersGraph } from "./CustomToolTips";

export const ArtistFollowersChart = ({ artistsValues, accessToken }: any) => {
  const [graphData, setGraphData] = useState(artistsValues);

  const getTopArtist = () => {
    searchArtist(accessToken, "Ed Sheeran").then((res) => {
      graphData.push({
        name: res.artists.items[0].name,
        followers: res.artists.items[0].followers.total,
        icon: res.artists.items[0].images[0]
          ? res.artists.items[0].images[0].url
          : res.artists.items[0].images[1]
          ? res.artists.items[0].images[1].url
          : res.artists.items[0].images[2]
          ? res.artists.items[0].images[2].url
          : SpotifyLogo,
      });
    });
  };

  useEffect(() => {
    try {
      getTopArtist();
    } catch (error) {
      console.log(error);
    }
  }, [graphData]);

  return (
    <div className="h-80">
      <ResponsiveContainer width={800} height="100%">
        <ComposedChart
          width={400}
          height={300}
          data={graphData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Bar dataKey="followers" fill="#100f22">
            {graphData.map((entry: any, index: any) => (
              <Cell
                cursor="pointer"
                fill={index === graphData.length - 1 ? "#1DB954" : "#ffa600"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
          <CartesianGrid vertical={false} strokeWidth={1} />
          <XAxis dataKey="name" />
          <YAxis domain={["auto", "auto"]} width={100} />
          <Legend
            height={20}
            wrapperStyle={{ paddingTop: "20px" }}
            margin={{ top: 40 }}
            payload={[
              {
                value: "Most followed artist",
                type: "square",
                id: "ID01",
                color: "#1DB954",
              },
              {
                value: "Artists you follow",
                type: "square",
                id: "ID02",
                color: "#ffa600",
              },
            ]}
          />
          <Tooltip content={<CustomToolTipFollowersGraph />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ArtistPopularityChart = ({ artistsValues }: any) => {
  let graphData = [];
  for (let i = 0; i < artistsValues.length; i++) {
    graphData.push({
      popularity: artistsValues[i].popularity,
      name: artistsValues[i].name,
    });
  }
  return (
    <>
      <ResponsiveContainer width={800} height="90%">
        <ComposedChart
          width={400}
          height={300}
          data={graphData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Bar dataKey="popularity" fill="#003f5c" />
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export const TemposChart = ({ tempoValues }: any) => {
  return (
    <>
      <ResponsiveContainer width="90%" height="100%">
        <AreaChart
          width={600}
          height={300}
          data={tempoValues}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f70411" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#e4863a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <XAxis dataKey="Decibels" />
          <YAxis />
          <Legend
            wrapperStyle={{ paddingTop: "10px", paddingLeft: "20px" }}
            payload={[
              {
                value: "Beats per second",
                type: "square",
                id: "bps",
                color: "#db1a24",
              },
            ]}
          />
          <Tooltip />
          <Line
            type="monotone"
            unit="M"
            strokeLinecap="round"
            strokeWidth={2}
            style={{ strokeDasharray: `40% 60%` }}
            dataKey="close"
            stroke="#db1a24"
            dot={false}
            legendType="none"
          />
          <Area
            type="monotone"
            dataKey="BPS"
            fill="url(#colorUv)"
            strokeWidth={2}
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export const LoudnessChart = ({ loudnessValues }: any) => {
  return (
    <>
      <ResponsiveContainer width="90%" height="100%">
        <ComposedChart
          width={600}
          height={300}
          data={loudnessValues}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Bar dataKey="db" fill="#58508d" />
          <CartesianGrid strokeDasharray="3" vertical={false} />
          <XAxis dataKey="Decibels" />
          <YAxis />
          <Legend />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export const CharacteristicsChart = ({ characteristicsValues }: any) => {
  return (
    <>
      <ResponsiveContainer width={800} height="80%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={characteristicsValues}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="subject"
            label={<CustomLabel />}
          ></PolarAngleAxis>
          <Tooltip
            allowEscapeViewBox={{ x: false, y: true }}
            content={<CustomToolTip />}
            cursor={{ stroke: "red", strokeWidth: 2 }}
            animationEasing="linear"
          />
          <Radar
            name="values"
            dataKey="A"
            stroke="#1DB954"
            fill="#1DB954"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

const CustomLabel = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} style={{ fill: "white" }}>
      {value}
    </text>
  );
};
