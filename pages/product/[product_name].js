import { useState, useEffect } from "react";
import { Tag } from "primereact/tag";
import { BlockUI } from "primereact/blockui";
import { Panel } from "primereact/panel";
import { Timeline } from "primereact/timeline";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "@/redux/features/productSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import { get, set } from "@/utils/storage";
import { updateLoading } from "@/redux/features/productSlice";
import { useRouter } from "next/router";
import StockGraph from "@/Components/StockGraph";
import Error from "@/Components/Error";
const Product = () => {
  const [details, setDetails] = useState([]);
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { product_name } = router.query;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.productDetails);
  const keywords = product_name;
  const { price, change_percentage, type } = useSelector(
    (state) => state.topGainersLosers
  );

  const processData = (data) => {
    const values = [];
    const properties = ["52WeekLow", "price", "52WeekHigh"];
    properties.map((property) => {
      values.push({
        key:
          property === "52WeekLow"
            ? "52-Week Low"
            : property === "price"
            ? "Current Price"
            : "52-Week High",
        value: data[property],
      });
    });
    return values;
  };
  useEffect(() => {
    const cachedData = get(keywords);
    if (cachedData) {
      const values = processData(cachedData);
      dispatch(updateLoading(cachedData));
      setEvents(values);
      setDetails(cachedData);
      return;
    } else {
      dispatch(fetchProductDetails(keywords));
    }
  }, [router.isReady == true]);

  useEffect(() => {
    if (loading === "succeeded" && data != null) {
      const new_data = {
        ...data,
        price: price,
        change_percentage: change_percentage,
        type: type,
      };
      const values = processData(new_data);
      setEvents(values);
      setDetails(new_data);
      set(keywords, new_data);
    }
  }, [loading, data]);

  const customizedContent = (item) => {
    return (
      <div
        className='xl:w-6rem'
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span style={{ fontWeight: "600" }}>{item.key}</span>
        <span>{item.value}</span>
      </div>
    );
  };
  if (error) {
    return <Error error={error} />;
  }
  if (loading !== "succeeded") {
    return (
      <div className='card flex justify-content-center'>
        <ProgressSpinner />
      </div>
    );
  }
  return (
    <div className='p-d-flex p-d-flex-column xl:pl-6 xl:pr-8 '>
      <StockGraph stockData={details} />
      <div className='surface-card p-4 mt-3  shadow-2 border-round'>
        <BlockUI>
          <Panel
            className='p-2 h-full '
            header={"About " + `${details.Symbol}`}
          >
            <p className='m-1'>{details.Description}</p>
            <Tag
              className='m-4'
              severity='info'
              value={"Industry: " + details.Industry}
            ></Tag>
            <Tag
              className='m-4'
              severity='info'
              value={"Sector: " + details.Sector}
            ></Tag>
            <Timeline
              className='customized-timeline w-10 ml-6'
              value={events}
              layout='horizontal'
              align='bottom'
              content={customizedContent}
            />
            <div className='flex-wrap flex justify-content-between'>
              <div className='flex flex-column sm:mb-3'>
                <span style={{ fontWeight: "600" }}>Market Cap</span>
                <span>{"$" + details["MarketCapitalization"]}</span>
              </div>
              <div className='flex flex-column'>
                <span style={{ fontWeight: "600" }}>P/E Ratio</span>
                <span>{details["PERatio"]}</span>
              </div>
              <div className='flex flex-column'>
                <span style={{ fontWeight: "600" }}>Beta</span>
                <span>{details["Beta"]}</span>
              </div>
              <div className='flex flex-column'>
                <span style={{ fontWeight: "600" }}>Dividend Yield</span>
                <span>{details["DividendYield"] + "%"}</span>
              </div>
              <div className='flex flex-column'>
                <span style={{ fontWeight: "600" }}>Profit Margin</span>
                <span>{details["ProfitMargin"]}</span>
              </div>
            </div>
          </Panel>
        </BlockUI>
      </div>
    </div>
  );
};
export default Product;
