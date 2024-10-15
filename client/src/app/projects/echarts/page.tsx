"use client";
import { useState, useEffect } from "react";
import FindmeEchart from "@/app/(components)/FindmeEchart";
import { radarOpts, wordCloudOpts } from "./data";
import { clone } from "lodash";

const BIPage = () => {
  let num = Math.floor(Math.random() * 100);

  const [rate, setRate] = useState("♡♡♡♡♡");

  useEffect(() => {
    const getRating = (num: number) => {
      if (num < 0) return "♥♥♥♥♥";
      if (num >= 100) return "♥♥♥♥♥";
      const index = Math.floor(num / 20);
      const ratings = ["♡♡♡♡♡", "♥♡♡♡♡", "♥♥♡♡♡", "♥♥♥♡♡", "♥♥♥♥♡"];
      return ratings[index];
    };
    // 初始评分设定
    setRate(getRating(num));
    // 定义 interval
    const intervalId = setInterval(() => {
      setRate(getRating(num)); // 每秒更新评分
    }, 2000);

    return () => clearInterval(intervalId);
  }, [num]); // 依赖于 num
  // get radar chart options
  const getRadarOpts = () => {
    const formatRadarOpts = radarOpts;
    radarOpts.title[0].text = "能量" + rate;
    radarOpts.title[1].text = num + "";
    radarOpts.series[0].data[0].value = num;

    return formatRadarOpts;
  };
  return (
    <div className="h-80 grid grid-cols-2 gap-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <FindmeEchart option={wordCloudOpts} />
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <FindmeEchart option={wordCloudOpts} />
      </div>
    </div>
  );
};
export default BIPage;
