import * as echarts from "echarts/core";
import { MapChart } from "echarts/charts";
import "echarts-wordcloud";
import { EChartsType } from "echarts/core";
import { UniversalTransition } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";
// 引入用到的图表
// import {LineChart, BarChart, PieChart } from 'echarts/charts';
import { BarChart, LineChart, RadarChart } from "echarts/charts";
// 引入提示框、数据集等组件
// import { TitleComponent, TooltipComponent } from 'echarts/components';
import {
  DatasetComponent,
  DatasetComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  BrushComponent,
  BrushComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
// 引入标签自动布局、全局过渡动画等特性
import { LabelLayout } from "echarts/features";
// 引入 Canvas 渲染器，必须
import { CanvasRenderer } from "echarts/renderers";

// 类型相关
// 系列类型的定义后缀都为 SeriesOption
import type {
  LineSeriesOption,
  BarSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
} from "echarts/charts";
// 组件类型的定义后缀都为 ComponentOption
import type {
  TooltipComponentOption,
  TitleComponentOption,
} from "echarts/components";
// 通过引入 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
import type { ComposeOption } from "echarts/core";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | LineSeriesOption
  | BarSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
>;

// 注册必须的组件
echarts.use([
  VisualMapComponent,
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  BrushComponent,
  TooltipComponent,
  LineChart,
  RadarChart,
  BarChart,
  UniversalTransition,
  SVGRenderer,
  MapChart,
  // LineChart,
  // BarChart,
  // PieChart,
  // TitleComponent,
  // TooltipComponent,
  // CanvasRenderer,
  // LabelLayout,
]);

export type MyChartOption = echarts.ComposeOption<
  | DatasetComponentOption
  | DataZoomComponentOption
  | GridComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | ToolboxComponentOption
  | BrushComponentOption
  | TooltipComponentOption
  | LineSeriesOption
  | BarSeriesOption
>;
export type ChartType = "bar" | "line" | "map";

// 定义图表组件的属性类型
export interface BaseChartProps {
  chartType?: ChartType;
  option: MyChartOption | null | undefined | any;
  width?: number | string;
  height?: number | string;
  merge?: boolean;
  loading?: boolean;
  empty?: React.ReactElement;
  style?: any;
  onClick?(event: any): any;
  onBrushEnd?(event: any): any;
}

export interface MapChartConfigProps {
  mapName: string;
  geoJson: any;
}
export type MyChartProps =
  | (BaseChartProps & { chartType: "map"; mapConfig: MapChartConfigProps }) // 当 chartType 为 'map' 时 geoJson 是必需的
  | (BaseChartProps & {
      chartType?: Exclude<ChartType, "map">;
      mapConfig?: MapChartConfigProps;
    }); // 其他情况 geoJson 是可选的
// 定义图表组件的引用类型
export interface MyChartRef {
  instance(): EChartsType | undefined;
}

export default echarts;
