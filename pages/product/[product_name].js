import { useState,useEffect} from 'react';
import { Chart } from 'primereact/chart';
import { Tag } from 'primereact/tag';
import { BlockUI } from 'primereact/blockui';
import { Panel } from 'primereact/panel';
import { Timeline } from 'primereact/timeline';
import {BiSolidUpArrow,BiSolidDownArrow} from 'react-icons/bi'
import { useDispatch,useSelector } from 'react-redux';
import { fetchProductDetails } from '@/redux/features/productSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import { fillArrayWithRandomValues } from '@/utils/helpers';
import {get,set} from '@/utils/storage'
import { updateLoading } from '@/redux/features/productSlice';
import { useRouter } from 'next/router';

const Product=()=>{
    const [details,setDetails]=useState([])
    const [events,setEvents]=useState([])
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const router=useRouter();
    const {product_name}=router.query
    const dispatch=useDispatch()
    const{data,loading,error}=useSelector((state)=>state.productDetails)
    const keywords=product_name
    const {price,change_percentage,type}=useSelector((state)=>state.topGainersLosers)

    useEffect( ()=>{

        const cachedData=get(keywords)
        if(cachedData)
        {
           
            const values=[]
            const data=cachedData
            values.push({
                "key":"52-Week Low",
                "value":"$"+data["52WeekLow"]
            })
            values.push({
                "key":"Current Price",
                "value":"$"+price
            })
            values.push({
                "key":"52-WeekHigh",
                "value":"$"+data["52WeekHigh"]
            })
            dispatch(updateLoading(data))
            setEvents(values);
            setDetails(cachedData)
            
            
        }
        else{
           
            dispatch(fetchProductDetails(keywords))
           
        }
 
    },[dispatch,keywords])
    
    
    useEffect(()=>{
        if(loading==='succeeded' && data!=null)
        {
            setDetails(data)
            set(keywords,data);
            
        }
      
    },[loading,router])

    const stockprices=fillArrayWithRandomValues(500,1,500)
    const negstockprices=fillArrayWithRandomValues(100,10,300)
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['9:00am', '9:15am','10:00am', '11:00am', '12:00pm', '13:00pm', '14:00pm', '15:00pm'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: stockprices,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    tension: 0.4
                },
                {
                    type:'bar',
                    label: 'High',
                    data: stockprices,
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--black-500'),
                    tension: 0.4
                },
                {
                    type:'bar',
                    label:'Low',
                    data:negstockprices,
                    fill:false,
                    backgroundColor: documentStyle.getPropertyValue('--red-500'),
                    borderColor: documentStyle.getPropertyValue('--black-500'),
                    tension: 0.4
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
   
    const customizedContent=(item)=>{
            return(
                <div className="xl:w-6rem" style={{display:'flex', flexDirection:'column'}}>
                                <span style={{fontWeight:'600'}}>{item.key}</span>
                                <span>{item.value}</span>
                </div>
            )
    }
     if(loading!=='succeeded')
   {
         return (<div className="card flex justify-content-center">
              <ProgressSpinner />
          </div>)
   }
    return (

        <div className="p-d-flex p-d-flex-column xl:pl-6 xl:pr-8 ">
            <div className="surface-card p-4 shadow-2 border-round">
                
                <div className="text-3xl font-medium text-900 mb-2 " style={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
                    <div className="text-3xl" style={{display:"flex",alignItems:"center",flexWrap:'wrap'}}>
                         <img className="w-5 h-5 alignItems-center" src="https://assets-netstorage.groww.in/intl-stocks/logos/ADBE.png"/>
                         {details.Symbol}
                    </div>
                   
                    <div className="p-d-flex p-d-flex-column" >
                        <div className="font-medium text-900 mb-2">{"$"+price}</div>
                        
                        <span className="text-lg font-semibold " style={{color:type==='gainers'?"green":"red"}}>
                            {type==='gainers'? (
                                <>
                                    {"+"+change_percentage}
                                    <BiSolidUpArrow/>
                                </>
                            ):(
                                <>
                               
                                    {change_percentage}
                                    <BiSolidDownArrow/>
                                </>
                            )
                        }
                            
                        </span>
                    </div>
                </div>
                
                <div className="font-medium text-500 mb-3">{details.Symbol},{details.AssetType}</div>
                
                <div style={{ height: '250px' }} className="border-2 border-dashed surface-border">
                    <Chart height="250px" type="line" data={chartData} options={chartOptions} />
                </div>
            </div>
            <div className="surface-card p-4 mt-3  shadow-2 border-round">
                <BlockUI  >
                    <Panel className="p-2 h-full "header={"About "+`${details.Symbol}`}  >
                        <p className="m-1">
                            {details.Description}
                        </p>
                        <Tag className="m-4" severity="info" value={"Industry: "+details.Industry}></Tag>
                        <Tag className="m-4" severity="info" value={"Sector: "+details.Sector}></Tag>
                        <Timeline  className="customized-timeline w-10 ml-6" value={events} layout="horizontal" align="bottom"  content={customizedContent} />
                        <div className="flex-wrap flex justify-content-between" >
                            <div className="flex flex-column sm:mb-3">
                                <span style={{fontWeight:'600'}}>Market Cap</span>
                                <span>{"$"+details["MarketCapitalization"]}</span>
                            </div>
                            <div className="flex flex-column">
                                <span style={{fontWeight:'600'}}>P/E Ratio</span>
                                <span>{details["PERatio"]}</span>
                            </div>
                            <div className="flex flex-column">
                                <span style={{fontWeight:'600'}}>Beta</span>
                                <span>{details["Beta"]}</span>
                            </div>
                            <div className="flex flex-column">
                                <span style={{fontWeight:'600'}}>Dividend Yield</span>
                                <span>{details["DividendYield"]+"%"}</span>
                            </div>
                            <div className="flex flex-column">
                                <span style={{fontWeight:'600'}}>Profit Margin</span>
                                <span>{details["ProfitMargin"]}</span>
                            </div>
                           
                        </div>


                    </Panel>

                </BlockUI>
            </div>
         </div>
             
    )
}
export default Product