"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { clone, cloneDeep, findIndex, get, slice } from "lodash";
import axios from "axios";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MyChartRef } from "@/app/(components)/FindmeEchart/echarts.config";
// import FindmeEchart from "@/app/(components)/FindmeEchart";

import {
  lineOpts,
  wordCloudOpts,
  mapOpts,
  barOpts,
  barBrushedLineOpts,
} from "./data";
import dynamic from "next/dynamic";

const FindmeEchart = dynamic(
  () => {
    return import("@/app/(components)/FindmeEchart");
  },
  { ssr: false }
);
type WordCloudType = {
  name: string;
  value: number;
};
type SelectedRegionType = {
  name: string;
  adcode: number;
};

const breadcrumbItems = [
  { name: "Home", url: "" },
  { name: "BIPage", url: "" },
  { name: "WordCloud", url: "" },
];
const DEFALULT_MAP = {
  name: "中国",
  adcode: 100000,
};
const BIPage = () => {
  const mapRef = useRef<MyChartRef>(null);

  const [wordCloudDatas, setWordCloudDatas] = useState<WordCloudType[]>([]);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [selectedWordList, setSelectedWordList] = useState<string[]>(["词云"]);
  const [brushRange, setBrushRange] = useState<number[]>([]);

  const [geoJson, setGeoJson] = useState<any>(null);
  const [selectedRegion, setSelectedRegion] =
    useState<SelectedRegionType>(DEFALULT_MAP);
  const [selectedRegionList, setSelectedRegionList] = useState<
    SelectedRegionType[]
  >([DEFALULT_MAP]);

  useEffect(() => {
    setWordCloudDatas([
      {
        name: "HTML5",
        value: 10000,
      },
      {
        name: "JavaScript",
        value: 6181,
      },
      {
        name: "CSS3",
        value: 4386,
      },
    ]);
    getGeoJson({ adcode: 100000 });
  }, []);

  const getGeoJson = async ({ adcode }: { adcode: number }) => {
    try {
      // const url = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full`;
      axios
        .get(
          `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full`
        )
        .then((response) => {
          setGeoJson(response.data);
          getMapOpts();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getWordCloudOpts = () => {
    const opts: any = clone(wordCloudOpts);
    opts.series[0].data = wordCloudDatas;
    return opts;
  };
  const getLineOpts = () => {
    const opts = clone(lineOpts);
    return opts;
  };
  const getMapOpts = () => {
    const opts = clone(mapOpts);
    const { name, adcode } = selectedRegion;

    opts.series[0].data = geoJson.features.map((item: any) => {
      return item.properties;
    });
    opts.geo.map = name;
    opts.series[0].map = name;
    console.log("selectedRegion", opts, name, adcode);

    return opts;
  };
  const handleWordClick = (e: any) => {
    const name = get(e, "data.name");
    if (name) {
      setSelectedWord(name);
      setSelectedWordList((prevList: string[]) => {
        return [...prevList, name];
      });
    }
  };
  const handleBreadcrumWordClick = (item: string) => {
    setSelectedWord("");
    setSelectedWordList(["词云"]);
  };

  const handleMapClick = (e: any) => {
    const { adcode, name, level } = get(e, "data");
    if (level === "district") {
      alert("无此区域地图显示！");
      setSelectedRegion(DEFALULT_MAP);
      return;
    }
    if (adcode) {
      getGeoJson({ adcode });
    }
    setSelectedRegion({ name, adcode });
    setSelectedRegionList((prevList) => [...prevList, { name, adcode }]);
  };
  const handleDrillMapClick = (item: SelectedRegionType) => {
    const { adcode, name } = item || {};
    if (adcode) {
      getGeoJson({ adcode });
    }
    setSelectedRegion({ name, adcode });
    setSelectedRegionList((prevList) => {
      return slice(
        prevList,
        0,
        findIndex(prevList, { adcode }) + 1 || prevList.length
      );
    });
  };

  const handleBarBrush = (e: any) => {
    console.log(33, e);

    setBrushRange(get(e, "areas[0].coordRange"));
  };
  const getBarBrushedLineOpts = () => {
    if (brushRange.length === 0) return barBrushedLineOpts;
    const [start, end] = brushRange || [];
    const opts = cloneDeep(barBrushedLineOpts);
    const xAxisData = cloneDeep(opts.xAxis[0].data);
    const seriesData = cloneDeep(opts.series[0].data);
    opts.xAxis[0].data = xAxisData.slice(start, end);
    opts.series[0].data = seriesData.slice(start, end);

    return opts;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">点击看看哦</h1>
      {/* 词云下钻 */}
      <div className="h-144 bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="h-full flex flex-col ">
          <div className="h-[24px] flex justify-between items-center">
            <h4>词云下钻</h4>
            <Breadcrumb className="">
              <BreadcrumbList>
                {selectedWordList.map((item, index) => (
                  <>
                    <BreadcrumbItem
                      onClick={() => handleBreadcrumWordClick(item)}
                      style={{ cursor: "pointer" }}
                    >
                      {item}
                    </BreadcrumbItem>
                    {index < selectedWordList.length - 1 && (
                      <BreadcrumbSeparator />
                    )}
                  </>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex-1 overflow-y-auto">
            {selectedWord ? (
              <FindmeEchart option={getLineOpts()} />
            ) : (
              <FindmeEchart
                option={getWordCloudOpts()}
                onClick={(e) => handleWordClick(e)}
              />
            )}
          </div>
        </div>
      </div>
      {/* 框选筛选联动 */}
      <div className="h-144 grid grid-cols-2 shadow-md gap-4 p-4 mb-4 bg-white">
        <div className="h-full flex flex-col  shadow-md rounded-lg">
          <div className="flex-1 overflow-y-auto">
            <FindmeEchart
              chartType="bar"
              option={barOpts}
              onBrushEnd={(e: any) => handleBarBrush(e)}
            />
          </div>
        </div>
        <div className="h-full  shadow-md  rounded-lg">
          <FindmeEchart chartType="bar" option={getBarBrushedLineOpts()} />
        </div>
      </div>
      {/* 地图china展示 */}
      <div className="h-144 bg-white shadow-md rounded-lg p-4">
        <div className="h-full flex flex-col ">
          <Breadcrumb className="h-[24px]">
            <BreadcrumbList>
              {selectedRegionList.map((item, index) => (
                <>
                  <BreadcrumbItem
                    key={index}
                    onClick={() => handleDrillMapClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </BreadcrumbItem>
                  {index < selectedRegionList.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex-1 overflow-y-auto">
            {geoJson && (
              <FindmeEchart
                chartType="map"
                mapConfig={{ mapName: selectedRegion.name, geoJson }}
                ref={mapRef}
                option={getMapOpts()}
                onClick={(e: any) => handleMapClick(e)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BIPage;
