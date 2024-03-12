import { useEffect, useRef, useState } from "react";
import { statByQuestionId } from "../../../../services/answer";
import { EChartsOption } from "echarts";
import * as echarts from "echarts";
import useGetStatInfo from "../../../../hooks/useGetStat";
import React from "react";
import styles from "./index.module.scss";
import { LineChartOutlined } from "@ant-design/icons";

const Echarts = () => {
  const { id, type, props } = useGetStatInfo();
  const TYPES = ["questionRadio", "questionCheckbox"];

  useEffect(() => {
    if (TYPES.indexOf(type) === -1) {
      return;
    }
    const fetchData = async () => {
      let chooseItem = [];
      if (type == TYPES[0]) {
        chooseItem = props.options;
      } else {
        chooseItem = props.list;
      }
      const newOptions: { value: number; name: string }[] = [];
      for (let i = 0; i < chooseItem.length; i++) {
        const res = await statByQuestionId({
          questionId: id,
          answerKey: chooseItem[i].value,
        });

        const { info, code} = res;
        if (code == 0) {
          newOptions[chooseItem[i]] = info;
          newOptions.push({ value: info, name: chooseItem[i].text });
        }
      }
      setItemNum(newOptions);
    };

    fetchData();
  }, [id, type, props]);

  const [itemNum, setItemNum] = useState<{ value: number; name: string }[]>([]);
  const echartRef = useRef<HTMLDivElement>(null);

  const echartsOption: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "选择人数",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: itemNum,
      },
    ],
  };

  useEffect(() => {
    if (!echartRef.current) return;
    const myChart = echarts.getInstanceByDom(echartRef.current);
    if (myChart) {
      // 如果已经存在图表实例，则销毁它
      myChart.dispose();
    }
    const newChart = echarts.init(echartRef.current);
    newChart.setOption(echartsOption);

    // newChart.on("click", (params: any) => {
    //   // 在此处处理点击事件，params 包含了点击事件的信息，例如点击的数据项等
    //   console.log("点击事件信息：", params);
    // });
  }, [echartsOption]);

  return (
    <>
      {TYPES.indexOf(type) === -1 && (
        <div className={styles.notEcharts}>
          暂无统计图&nbsp;
          <LineChartOutlined />
        </div>
      )}
      {TYPES.indexOf(type) >= 0 && (
        <div className={styles.echartContainer} ref={echartRef}></div>
      )}
    </>
  );
};

export default Echarts;
