"use client";
import React, {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

import { EChartsType } from "echarts/core";
import echarts, { MyChartRef, MyChartProps } from "./echarts.config";

const FindmeEchart: React.ForwardRefRenderFunction<MyChartRef, MyChartProps> = (
  { chartType, mapConfig, option, width, height = false, onClick, onBrushEnd },
  ref: ForwardedRef<MyChartRef>
) => {
  const cRef = useRef<HTMLDivElement>(null);
  const cInstance = useRef<EChartsType>();

  // 初始化注册组件，监听 cRef 和 option 变化
  useEffect(() => {
    if (cRef.current) {
      // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
      cInstance.current = echarts.getInstanceByDom(cRef.current);
      if (!cInstance.current) {
        cInstance.current = echarts.init(cRef.current, undefined, {
          renderer: "canvas",
        });
        cInstance.current.on("click", (event) => {
          const ec = event as any;
          if (ec && onClick) onClick(ec);
        });
        cInstance.current.on("brushEnd", (event) => {
          const ec = event as any;
          if (ec && onBrushEnd) onBrushEnd(ec);
        });
      }
      console.log(option);
      // 设置配置项
      // if (chartType == "map") {
      //   console.log(999922, chartType, geoJson);
      //   echarts.registerMap("china", geoJson);
      // }
      if (chartType === "map" && mapConfig) {
        echarts.registerMap(mapConfig?.mapName, mapConfig?.geoJson);
      }
      if (option) {
        cInstance.current.setOption(option);
      }
    }
  }, [cRef, option, mapConfig, chartType]);
  // 监听窗口大小变化重绘
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resize);
      return () => {
        window.removeEventListener("resize", resize);
      };
    }
  }, [option]);
  // 监听高度变化
  useLayoutEffect(() => {
    resize();
  }, [width, height]);
  // 重新适配大小并开启过渡动画
  const resize = () => {
    cInstance.current?.resize({
      animation: { duration: 300 },
    });
  };
  // 获取实例
  const instance = () => {
    return cInstance.current;
  };
  // 对父组件暴露的方法
  useImperativeHandle(ref, () => ({
    instance,
  }));
  return <div ref={cRef} style={{ width: "100%", height: "100%" }} />;
};
export default React.forwardRef(FindmeEchart);
