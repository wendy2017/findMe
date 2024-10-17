"use client";
import * as echarts from "echarts/core";
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];

const lineOpts = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
};
const wordCloudOpts = {
  backgroundColor: "#fff",
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  series: [
    {
      type: "wordCloud",
      gridSize: 1,
      sizeRange: [12, 55],
      rotationRange: [-45, 0, 45, 90],
      // maskImage: maskImage,
      textStyle: {
        normal: {
          color: function () {
            return (
              "rgb(" +
              Math.round(Math.random() * 255) +
              ", " +
              Math.round(Math.random() * 255) +
              ", " +
              Math.round(Math.random() * 255) +
              ")"
            );
          },
        },
      },
      left: "center",
      top: "center",
      right: null,
      bottom: null,
      // width: "90%",
      // height: "100%",
      xAxis: { show: false },
      data: [],
    },
  ],
};

const mapOpts = {
  // visualMap: {
  //   min: 0,
  //   max: 1000,
  //   left: "left",
  //   top: "bottom",
  //   text: ["高", "低"],
  //   calculable: false,
  //   orient: "horizontal",
  //   inRange: {
  //     color: ["#e0ffff", "#006edd"],
  //     symbolSize: [30, 100],
  //   },
  // },
  tooltip: {
    trigger: "item",
    formatter: (p) => {
      console.log(3333, p);

      let val = p.value;
      if (window.isNaN(val)) {
        val = 0;
      }
      let txtCon = p.name + "<br>" + "<hr>" + "数值 : " + val.toFixed(2);
      return txtCon;
    },
  },
  geo: {
    // 使用 registerMap 注册的地图名称。
    map: "china",
    // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
    // roam: true,
    // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
    // label: {
    //   show: true,
    //   color: "#666666",
    // },
    // 地图区域的多边形 图形样式。
    itemStyle: {
      normal: {
        show: true,
        areaColor: "#2E98CA",
        borderColor: "rgb(185, 220, 227)",
        borderWidth: "1",
      },
    },
    label: {
      normal: {
        show: true, //显示省份标签
        textStyle: {
          color: "rgb(249, 249, 249)", //省份标签字体颜色
          fontSize: 12,
        },
        formatter: (p) => {
          let val = p.value;
          if (window.isNaN(val)) {
            val = 0;
          }
          //
          switch (p.name) {
            case "内蒙古自治区":
              p.name = "内蒙古";
              break;
            case "西藏自治区":
              p.name = "西藏";
              break;
            case "新疆维吾尔自治区":
              p.name = "新疆";
              break;
            case "宁夏回族自治区":
              p.name = "宁夏";
              break;
            case "广西壮族自治区":
              p.name = "广西";
              break;
            case "香港特别行政区":
              p.name = "香港";
              break;
            case "澳门特别行政区":
              p.name = "澳门";
              break;
            default:
            // code
          }
          if (p.name === "内蒙古自治区") {
            p.name = "内蒙古";
          }
          let txtCon = p.name;
          return txtCon;
        },
      },
      emphasis: {
        //对应的鼠标悬浮效果
        show: true,
        textStyle: {
          color: "#000",
        },
      },
    },
  },
  series: [
    {
      type: "map",
      map: "china",
      geoIndex: 0,
      roam: true,
    },
    {
      type: "scatter",
      coordinateSystem: "geo",
      symbolSize: "20",
      itemStyle: {
        color: "#fa3534",
      },
      data: [],
    },
  ],
};

const barOpts = {
  brush: {
    throttleType: "debounce",
    throttleDelay: 500,
    toolbox: ["lineX"],
    xAxisIndex: 0, // 选择哪个 x 轴
    yAxisIndex: 0,
  },
  toolbox: {},
  // color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  // grid: {
  //   left: "3%",
  //   right: "4%",
  //   bottom: "3%",
  //   containLabel: true,
  // },
  xAxis: [
    {
      type: "category",
      data: [
        "2023-01",
        "2023-02",
        "2023-03",
        "2023-04",
        "2023-05",
        "2023-06",
        "2023-07",
        "2023-08",
        "2023-09",
        "2023-10",
        "2023-11",
        "2023-12",
      ],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  series: [
    {
      name: "wendy",
      type: "bar",
      barWidth: "40%",
      data: [1, 3, 4, 2, 6, 7, 5, 8, 10, 9, 11, 12],
    },
  ],
  label: {
    normal: {
      show: true,
      position: "top",
      formatter: "{c}",
    },
  },
  itemStyle: {
    normal: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgba(17, 168,171, 1)",
        },
        {
          offset: 1,
          color: "rgba(17, 168,171, 0.1)",
        },
      ]),
      shadowColor: "rgba(0, 0, 0, 0.1)",
      shadowBlur: 10,
    },
  },
};

const barBrushedLineOpts = {
  backgroundColor: "#fff",
  title: {
    text: "line",
    textStyle: {
      fontSize: 12,
      fontWeight: 400,
    },
    left: "center",
    top: "5%",
  },
  legend: {
    icon: "circle",
    top: "5%",
    right: "5%",
    itemWidth: 6,
    itemGap: 20,
    textStyle: {
      color: "#556677",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      label: {
        show: true,
        backgroundColor: "#fff",
        color: "#556677",
        borderColor: "rgba(0,0,0,0)",
        shadowColor: "rgba(0,0,0,0)",
        shadowOffsetY: 0,
      },
      lineStyle: {
        width: 0,
      },
    },
    backgroundColor: "#fff",
    textStyle: {
      color: "#5c6c7c",
    },
    padding: [10, 10],
    extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
  },
  grid: {
    top: "15%",
  },
  xAxis: [
    {
      type: "category",
      data: [
        "2023-01",
        "2023-02",
        "2023-03",
        "2023-04",
        "2023-05",
        "2023-06",
        "2023-07",
        "2023-08",
        "2023-09",
        "2023-10",
        "2023-11",
        "2023-12",
      ],
      axisLine: {
        lineStyle: {
          color: "rgba(107,107,107,0.37)", //x轴颜色
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#999", //坐标轴字颜色
        },
        margin: 15,
      },
      axisPointer: {
        label: {
          padding: [11, 5, 7],
          backgroundColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#fff", // 0% 处的颜色
              },
              {
                offset: 0.9,
                color: "#fff", // 0% 处的颜色
              },
              {
                offset: 0.9,
                color: "#33c0cd", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#33c0cd", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      boundaryGap: false,
    },
  ],
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(107,107,107,0.37)", //y轴颜色
        },
      },
      axisLabel: {
        textStyle: {
          color: "#999",
        },
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "wendy",
      type: "line",
      data: [1, 3, 4, 2, 6, 7, 5, 8, 10, 9, 11, 12],
      symbolSize: 1,
      symbol: "circle",
      smooth: true,
      yAxisIndex: 0,
      showSymbol: false,
      lineStyle: {
        width: 5,
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 0,
            color: "#9effff",
          },
          {
            offset: 1,
            color: "#9E87FF",
          },
        ]),
        shadowColor: "rgba(158,135,255, 0.3)",
        shadowBlur: 10,
        shadowOffsetY: 20,
      },
      itemStyle: {
        normal: {
          color: colorList[0],
          borderColor: colorList[0],
        },
      },
    },
  ],
};
export { lineOpts, wordCloudOpts, barOpts, barBrushedLineOpts, mapOpts };
