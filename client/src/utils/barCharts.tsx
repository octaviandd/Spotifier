/** @format */

import React, { useEffect, useState } from "react";
import { getArtist } from "./utils";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  Bar,
  Legend,
  BarChart,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  Area,
} from "recharts";

import CustomToolTip from "./customToolTip";

export const ArtistFollowersChart = ({ artistsValues, accessToken }: any) => {
  const [activeIndex, setActiveItem] = useState(0);
  const [graphData, setGraphData] = useState(artistsValues);
  // useEffect(() => {
  //   try {
  //     let id = "6eUKZXaKkcviH0Ku9w2n3V";
  //     getArtist(accessToken, id).then((data) => {
  //       graphData.push({ name: data.name, followers: data.followers.total });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [graphData]);

  console.log(graphData);
  return (
    <>
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
                fill={index === graphData.length - 1 ? "#e71430" : "#ffa600"}
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
                color: "#e71430",
              },
              {
                value: "Artists you follow",
                type: "square",
                id: "ID02",
                color: "#ffa600",
              },
            ]}
          />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </>
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
      <ResponsiveContainer width={800} height="100%">
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
          <Legend margin={{ top: 20 }} />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export const TemposChart = ({ tempoValues }: any) => {
  return (
    <>
      <ResponsiveContainer width={700} height="90%">
        <ComposedChart
          width={300}
          height={300}
          data={tempoValues}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Bar dataKey="db" fill="#8884d8" />
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <XAxis dataKey="Decibels" />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          <Tooltip />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <YAxis />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export const LoudnessChart = ({ loudnessValues }: any) => {
  return (
    <>
      <ResponsiveContainer width={700} height="80%">
        <ComposedChart
          width={300}
          height={300}
          data={loudnessValues}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Bar dataKey="db" fill="#8884d8" />
          <CartesianGrid strokeDasharray="3" vertical={false} />
          <XAxis dataKey="Decibels" />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          <Tooltip />
          <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <YAxis />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export const CharacteristicsChart = ({ characteristicsValues }: any) => {
  return (
    <>
      <ResponsiveContainer width={600} height="50%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={characteristicsValues}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Tooltip
            content={<CustomToolTip />}
            cursor={{ stroke: "red", strokeWidth: 2 }}
          />
          <Radar
            name="Mike"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};
