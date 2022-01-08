/** @format */

import React, { ReactElement, useRef, useEffect } from "react";
import * as d3 from "d3";
import { colors } from "../utils/data";

interface Props {
  dataset: any[];
}

export default function D3Circle({ dataset }: Props): ReactElement {
  const ref = useRef();

  const transformDataset = (dataset: string[]): any[] => {
    let returningList: any[] = [];

    dataset.map((item) => {
      returningList.push(
        Object.assign({}, { name: item, count: dataset.indexOf(item) })
      );
    });

    return returningList;
  };

  useEffect(() => {
    const svgElement = d3
      .select(ref.current)
      .append("svg")
      .attr("width", window.innerWidth / 2)
      .attr("height", window.innerHeight / 2)
      .attr("class", "bubble");

    var bubble = d3.pack().size([2000, 1400]).padding(10);

    var nodes = d3.hierarchy(transformDataset(dataset)).sum(function (d) {
      return 5;
    });

    var node = svgElement
      .selectAll(".node")
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function (d) {
        return !d;
      })
      .append("g")
      .attr("class", "node")
      .attr("fill-opacity", 0.8)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node.append("title").text(function (d) {
      console.log(d);
      //   return d.name + ": " + d.count;
      return "";
    });

    node
      .append("circle")
      .attr("r", function (d) {
        return d.r;
      })
      .style("fill", function (d, i) {
        return colors[i];
      });

    node
      .append("text")
      .attr("font-wight", "bold")
      .attr("line-height", "1.68")
      .attr("dy", ".2em")
      .style("text-anchor", "middle")
      //   .text(function (d) {
      //     return d.data.name.substring(0, d.r / 3);
      //   })
      .attr("font-family", "sans-serif")
      .attr("font-size", function (d) {
        return d.r / 5;
      })
      .attr("fill", "white");

    // var tooltip = d3.select(ref.current).append("div").attr("class", "tooltip");

    // node
    //   .on("mouseover", function (d) {
    //     return tooltip.style("visibility", "visible").text(d.data.Count);
    //   })

    //   .on("mousemove", function () {
    //     return tooltip
    //       .style("top", d3.event.pageY - 30 + "px")
    //       .style("left", d3.event.pageX + "px");
    //   })

    //   .on("mouseout", function () {
    //     return tooltip.style("visibility", "hidden");
    //   });
  }, [dataset]);
  return <div ref={ref}></div>;
}
