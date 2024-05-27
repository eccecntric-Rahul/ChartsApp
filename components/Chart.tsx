import { Line } from "react-chartjs-2";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const Chart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Asset Price",
        data: [],
        borderColor: "#FFA500",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api/data");
        setData({
          labels: result.data.map((d) => d.timestamp),
          datasets: [
            {
              ...data.datasets[0],
              data: result.data.map((d) => d.price),
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;

      const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
      gradient.addColorStop(0, "rgba(255, 165, 0, 0.4)");
      gradient.addColorStop(1, "rgba(255, 165, 0, 0)");

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [data]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Line
          ref={chartRef}
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: false,
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(context.parsed.y);
                    }
                    return label;
                  },
                },
              },
            },
            hover: {
              mode: "index",
              intersect: false,
            },
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "minute",
                },
                ticks: {
                  color: "#FFFFFF",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                position: "right",
                ticks: {
                  color: "#FFFFFF",
                },
                grid: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 2,
                borderColor: "#FFA500",
              },
              point: {
                radius: 0,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
