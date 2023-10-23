import { TabView, TabPanel } from 'primereact/tabview';
import { useState,useEffect } from "react";
import { DataView } from 'primereact/dataview';;
import { useRouter } from 'next/navigation'
import { Ripple } from 'primereact/ripple';
import {BiSolidUpArrow,BiSolidDownArrow} from 'react-icons/bi'
import { useDispatch,useSelector } from 'react-redux';
import { fetchTopGainersLosers,updateLoading } from '@/redux/features/gainerslosersSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import {get,set} from '@/utils/storage'
const Explore=()=>{
 
    const [products,setProducts]=useState([])
    const [topgainers,setTopGainers]=useState([])
    const [toplosers,setTopLosers]=useState([])
    const router=useRouter();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.topGainersLosers);
    
      useEffect(() => {
        if(get('topgainerslosers'))
        {
          const data=get('topgainerslosers')
          setTopGainers(data.top_gainers)
          setTopLosers(data.top_losers)
          dispatch(updateLoading(data))

        }
        else
          dispatch(fetchTopGainersLosers());
      
    }, [dispatch])
    useEffect(()=>{
      if(loading==='succeeded' && data)
      {
      
        setTopGainers(data.top_gainers)
        setTopLosers(data.top_losers)
        set('topgainerslosers',data)
      }
    },[loading])
    if(loading!=='succeeded')
    {
      return (<div className="card flex justify-content-center">
              <ProgressSpinner />
          </div>)
    }
 
    
    const images=[
      {
        img:'https://assets-netstorage.groww.in/intl-stocks/logos/GOOGL.png'
      },
      {
        img:'https://assets-netstorage.groww.in/intl-stocks/logos/AMZN.png'
      },{
        img:'https://assets-netstorage.groww.in/intl-stocks/logos/AAPL.png'
      },{
        img:'https://assets-netstorage.groww.in/intl-stocks/logos/MSFT.png'
      },{
        img:'https://assets-netstorage.groww.in/intl-stocks/logos/ADBE.png'
      }
    ]
   
    const handleClick=(product)=>{
     
      return router.push('/product/'+ `${product.ticker}`)
      
    }
  
    const gridItem = (product,layout) => {
       
        return (
         
            <div className="col-12 sm:col-6 xl:col-3 mb-3 cursor-pointer" onClick={()=>handleClick(product)} >
              <Ripple/>
                <div className="w-10 p-1 border-1 surface-border surface-card border-square sm:w-20 sm:h-20">
                  <div className="flex flex-column align-items-center gap-2 py-3">
                    <img className="w-4 shadow-2 border-round" src={images[(Math.floor(Math.random() * images.length))].img} alt={product.name} />
                    <div className="text-lg font-bold">{product.ticker}</div>
                  </div>
                  <div className="flex align-items-center justify-content-between">
                    <span className="text-lg font-semibold">${product.price}</span>
                    <span className="text-lg font-semibold " style={{color:layout==='grid'?'green':'red'}}>
                      {layout=='grid'?"+"+product.change_percentage:""+product.change_percentage}
                      {layout=='grid'?<BiSolidUpArrow/>:<BiSolidDownArrow/>}
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
        

        return gridItem(product,layout);
    };
  
    return (
      <>
        
        <div className="flex xl:pr-8 xl:pl-8 sm:pr-4 sm:pl-4">
            
            <TabView >
                <TabPanel header="Top Gainers" className="ml-5">
                    <DataView 
                    value={topgainers} 
                    itemTemplate={itemTemplate}
                    layout={'grid'}
                    />
                </TabPanel>
                <TabPanel header="Top Losers">
                    <DataView 
                    value={toplosers} 
                    itemTemplate={itemTemplate}
                    layout={'list'}
                    />
                </TabPanel>
            </TabView>

        </div>

        <span className=" text-primary flex flex-column justify-content-center align-items-center h-6rem">
                  <h3 className="">Load more</h3>
                  <BiSolidDownArrow/>
        </span>
      </>
    )
}
export default Explore