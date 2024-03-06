import { useEffect, useRef, useState } from "react";
import { statByQuestionId } from "../../../../services/answer";
import { EChartsOption } from "echarts";
import * as echarts from "echarts";
import useGetStatInfo from "../../../../hooks/useGetStat";
import React from "react";
import styles from "./index.module.scss";

const Echarts = () => {
  const { id, type, props } = useGetStatInfo();
  const types = ["questionRadio", "questionCheckbox"];

  useEffect(() => {
    if (types.indexOf(type) === -1) {
      return;
    }
    const fetchData = async () => {
      const newOptions: { value: number; name: string }[] = [];
      for (let i = 0; i < props.options.length; i++) {
        const res = await statByQuestionId({
          questionId: id,
          answerKey: props.options[i].value,
          page: 1,
          pageSize: 10,
        });

        const { data, total, totalPages, currentPage, count } = res.info[0];
        newOptions[props.options[i]] = total;
        newOptions.push({ value: total, name: props.options[i].text });
      }
      console.log(newOptions);

      setItemNum(newOptions);
      console.log(itemNum);
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
        name: "Access From",
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
  }, [echartsOption]);

  return (
    <>
      {types.indexOf(type) === -1 && <div>暂无统计图</div>}
      {types.indexOf(type) >= 0 && (
        <div className={styles.echartContainer} ref={echartRef}></div>
      )}
    </>
  );
};

export default Echarts;
