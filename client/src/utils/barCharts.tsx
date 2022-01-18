/** @format */

import React from "react";
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
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  Area,
} from "recharts";

import CustomToolTip from "./customToolTip";

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
          <CartesianGrid strokeDasharray="3 3" />
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
          <CartesianGrid strokeDasharray="3 3" />
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
