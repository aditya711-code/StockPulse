import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { fillArrayWithRandomValues } from "@/utils/helpers";
import { useSelector } from "react-redux";
const StockGraph = (props) => {
  const { stockData } = props;
  const stockprices = fillArrayWithRandomValues(500, 1, 500);
  const negstockprices = fillArrayWithRandomValues(100, 10, 300);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "First Dataset",
          data: stockprices,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
        {
          type: "bar",
          label: "High",
          data: stockprices,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue("--green-500"),
          borderColor: documentStyle.getPropertyValue("--black-500"),
          tension: 0.4,
        },
        {
          type: "bar",
          label: "Low",
          data: negstockprices,
          fill: false,
          backgroundColor: documentStyle.getPropertyValue("--red-500"),
          borderColor: documentStyle.getPropertyValue("--black-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder },
        },
        y: {
          ticks: { color: textColorSecondary },
          grid: { color: surfaceBorder },
        },
      },
    };
    setDetails(stockData);
    setChartData(data);
    setChartOptions(options);
  }, [details]);

  return (
    <div className='surface-card p-4 shadow-2 border-round'>
      <div
        className='text-3xl font-medium text-900 mb-2 stockDetails'
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          className='text-3xl '
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          <img
            className='w-5 h-5 alignItems-center'
            src='https://assets-netstorage.groww.in/intl-stocks/logos/ADBE.png'
          />
          {details.Symbol}
        </div>

        <div className='p-d-flex p-d-flex-column'>
          <div className='font-medium text-900 mb-2'>{"$" + details.price}</div>

          <span
            className='text-lg font-semibold '
            style={{ color: details.type === "gainers" ? "green" : "red" }}
          >
            {details.type === "gainers" ? (
              <>
                {"+" + details.change_percentage}
                <BiSolidUpArrow />
              </>
            ) : (
              <>
                {details.change_percentage}
                <BiSolidDownArrow />
              </>
            )}
          </span>
        </div>
      </div>

      <div className='font-medium text-500 mb-3'>
        {details.Symbol},{details.AssetType}
      </div>

      <div
        style={{ height: "250px" }}
        className='border-2 border-dashed surface-border'
      >
        <Chart
          height='250px'
          type='line'
          data={chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
};
export default StockGraph;
