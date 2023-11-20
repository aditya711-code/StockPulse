import { TabView, TabPanel } from "primereact/tabview";
import { useState, useEffect } from "react";
import { DataView } from "primereact/dataview";
import { useRouter } from "next/navigation";
import { Ripple } from "primereact/ripple";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopGainersLosers,
  updateLoading,
  updatePricePercentage,
  updateType,
} from "@/redux/features/gainerslosersSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import { get, set } from "@/utils/storage";
const Explore = () => {
  const [topgainers, setTopGainers] = useState([]);
  const [toplosers, setTopLosers] = useState([]);
  const [tab, setTab] = useState("gainers");
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, loading, error, price, change_percentage, type } = useSelector(
    (state) => state.topGainersLosers
  );
  const handleClickLoadMore = () => {
    set("topgainerslosers", "");
    dispatch(fetchTopGainersLosers());
  };
  useEffect(() => {
    if (get("topgainerslosers")) {
      const data = get("topgainerslosers");
      setTopGainers(data.top_gainers);
      setTopLosers(data.top_losers);
      dispatch(updateLoading(data));
    } else dispatch(fetchTopGainersLosers());
  }, [dispatch]);
  useEffect(() => {
    if (loading === "succeeded" && data && !get("topgainerslosers")) {
      setTopGainers(data.top_gainers);
      setTopLosers(data.top_losers);
      set("topgainerslosers", data);
    }
  }, [loading, data]);

  if (loading !== "succeeded") {
    return (
      <div className='card flex justify-content-center'>
        <ProgressSpinner />
      </div>
    );
  }

  const images = [
    {
      img: "https://assets-netstorage.groww.in/intl-stocks/logos/GOOGL.png",
    },
    {
      img: "https://assets-netstorage.groww.in/intl-stocks/logos/AMZN.png",
    },
    {
      img: "https://assets-netstorage.groww.in/intl-stocks/logos/AAPL.png",
    },
    {
      img: "https://assets-netstorage.groww.in/intl-stocks/logos/MSFT.png",
    },
    {
      img: "https://assets-netstorage.groww.in/intl-stocks/logos/ADBE.png",
    },
  ];

  const handleClick = (product) => {
    const p = product.price;
    const change_p = parseFloat(product.change_percentage).toFixed(2) + "%";

    if (type !== tab) {
      dispatch(updateType({ tab }));
    }
    if (price != p && change_percentage != change_p) {
      dispatch(
        updatePricePercentage({ price: p, change_percentage: change_p })
      );
    }
    return router.push("/product/" + `${product.ticker}`);
  };

  const gridItem = (product, layout) => {
    useEffect(() => {
      setTab(layout);
    }, [layout]);

    return (
      <div
        className='col-12 sm:col-6 xl:col-3 mb-3 cursor-pointer p-ripple'
        onClick={() => handleClick(product)}
      >
        <Ripple />
        <div className='w-10 p-1 border-1 surface-border surface-card border-square sm:w-20 sm:h-20'>
          <div className='flex flex-column align-items-center gap-2 py-3'>
            <img
              className='w-4 shadow-2 border-round'
              src={images[Math.floor(Math.random() * images.length)].img}
              alt={product.name}
            />
            <div className='text-lg font-bold'>{product.ticker}</div>
          </div>
          <div className='flex align-items-center justify-content-between'>
            <span className='text-lg font-semibold'>${product.price}</span>
            <span
              className='text-lg font-semibold '
              style={{ color: layout === "gainers" ? "green" : "red" }}
            >
              {layout == "gainers"
                ? "+" + parseFloat(product.change_percentage).toFixed(2) + "%"
                : "" + parseFloat(product.change_percentage).toFixed(2) + "%"}
              {layout == "gainers" ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
            </span>
          </div>
        </div>
      </div>
    );
  };
  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    return gridItem(product, layout);
  };

  return (
    <>
      <div className='flex xl:pr-8 xl:pl-8 sm:pr-4 sm:pl-4'>
        <TabView>
          <TabPanel header='Top Gainers' className='ml-5'>
            <DataView
              value={topgainers}
              itemTemplate={itemTemplate}
              layout={"gainers"}
            />
          </TabPanel>
          <TabPanel header='Top Losers'>
            <DataView
              value={toplosers}
              itemTemplate={itemTemplate}
              layout={"losers"}
            />
          </TabPanel>
        </TabView>
      </div>
      <span
        className=' text-primary flex flex-column justify-content-center align-items-center h-6rem pi-ripple cursor-pointer'
        onClick={handleClickLoadMore}
      >
        <Ripple />
        <h3 className=''>Load more</h3>
        <BiSolidDownArrow />
      </span>
    </>
  );
};
export default Explore;
