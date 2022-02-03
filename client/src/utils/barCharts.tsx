/** @format */

import React, { useEffect, useState } from "react";
import { searchArtist } from "./SpotifyAPI";
import SpotifyLogo from "../../images/spotify.png";
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
  Label,
  AreaChart,
} from "recharts";

import { CustomToolTip, CustomToolTipFollowersGraph } from "./CustomToolTips";

export const ArtistFollowersChart = ({ artistsValues }: any) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={400}
          height={300}
          data={artistsValues}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Bar dataKey="followers" fill="#100f22" isAnimationActive={false}>
            {artistsValues.map((entry: any, index: any) => (
              <Cell
                cursor="pointer"
                fill={
                  index === artistsValues.length - 1 ? "#1DB954" : "#ffa600"
                }
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
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={400}
          height={300}
          data={graphData}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <Bar dataKey="popularity" fill="#1DB954" isAnimationActive={false} />
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Tooltip
            contentStyle={{ color: "black" }}
            wrapperStyle={{ color: "black" }}
            itemStyle={{ color: "black" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
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
            wrapperStyle={{ paddingTop: "20px", paddingLeft: "20px" }}
            payload={[
              {
                value: "Beats per second (BPS)",
                type: "square",
                id: "bps",
                color: "#db1a24",
              },
            ]}
          />
          <Tooltip />
          <Line
            isAnimationActive={false}
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
            isAnimationActive={false}
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
          <Bar dataKey="db" fill="#58508d" isAnimationActive={false} />
          <CartesianGrid strokeDasharray="1" vertical={false} />
          <XAxis dataKey="Decibels" />
          <YAxis />
          <Legend
            wrapperStyle={{ paddingTop: "10px", paddingLeft: "20px" }}
            payload={[
              {
                value: "Decibels (db)",
                type: "square",
                id: "db",
                color: "#58508d",
              },
            ]}
          />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export const CharacteristicsChart = ({ characteristicsValues }: any) => {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={characteristicsValues}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject"></PolarAngleAxis>
          <Tooltip
            content={<CustomToolTip />}
            allowEscapeViewBox={{ x: false, y: true }}
            cursor={{ stroke: "red", strokeWidth: 2 }}
            animationEasing="linear"
          />
          <Radar
            isAnimationActive={false}
            name="values"
            dataKey="A"
            stroke="#00CA4E"
            fill="#00CA4E"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

function customTick({ payload, x, y, textAnchor, stroke, radius }: any) {
  return (
    <g className="recharts-layer recharts-polar-angle-axis-tick text-white">
      <text
        radius={radius}
        stroke={stroke}
        x={x}
        y={y}
        className="recharts-text recharts-polar-angle-axis-tick-value"
        textAnchor={textAnchor}
        fill="white"
      >
        <tspan x={x} dy="0em">
          {payload.value}
        </tspan>
      </text>
    </g>
  );
}
