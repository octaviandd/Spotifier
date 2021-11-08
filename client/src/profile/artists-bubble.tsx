/** @format */

import React, { ReactElement, useEffect, useRef } from "react";
import * as d3 from "d3";

interface ArrayObjectProps {
  count: number;
  name: string;
}

interface Props {
  dataset: ArrayObjectProps[];
}

export default function Bubble({ dataset }: Props): ReactElement {
  const ref = useRef();

  // useEffect(() => {
  //   const svgElement = d3
  //     .select(ref.current)
  //     .append("svg")
  //     .attr("width", 800)
  //     .attr("height", 600)
  //     .attr("class", "bubble");

  //   var bubble = d3.pack().size([2000, 1400]).padding(5);

  //   var nodes = d3.hierarchy(dataset).sum(function (d) {
  //     return d.count;
  //   });

  //   var node = svgElement
  //     .selectAll(".node")
  //     .data(bubble(nodes).descendants())
  //     .enter()
  //     .filter(function (d) {
  //       return !d.children;
  //     })
  //     .append("g")
  //     .attr("class", "node")
  //     .attr("fill-opacity", 0.8)
  //     .attr("transform", function (d) {
  //       return "translate(" + d.x + "," + d.y + ")";
  //     });

  //   // node.append("title").text(function (d) {
  //   //   return d.Name + ": " + d.Count;
  //   // });

  //   // node
  //   //   .append("circle")
  //   //   .attr("r", function (d) {
  //   //     return d.r;
  //   //   })
  //   //   .style("fill", function (d, i) {
  //   //     return colors[i];
  //   //   });

  //   node
  //     .append("text")
  //     .attr("font-wight", "bold")
  //     .attr("line-height", "1.68")
  //     .attr("dy", ".2em")
  //     .style("text-anchor", "middle")
  //     .text(function (d: any) {
  //       return d.data.Name.substring(0, d.r / 3);
  //     })
  //     .attr("font-family", "sans-serif")
  //     .attr("font-size", function (d) {
  //       return d.r / 5;
  //     })
  //     .attr("fill", "white");

  //   var tooltip = d3.select(ref.current).append("div").attr("class", "tooltip");

  //   node
  //     .on("mouseover", function (d) {
  //       return tooltip.style("visibility", "visible").text(d.data.Count);
  //     })

  //     //   .on("mousemove", function () {
  //     //     return tooltip
  //     //       .style("top", d3.event.pageY - 30 + "px")
  //     //       .style("left", d3.event.pageX + "px");
  //     //   })

  //     .on("mouseout", function () {
  //       return tooltip.style("visibility", "hidden");
  //     });
  // }, [dataset]);

  return <div ref={ref}></div>;
}
