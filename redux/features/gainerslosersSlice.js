import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { API_URLS ,API_KEY} from '@/utils/constant'

const initialState={
    data:null,
    loading:'idle',
    error:null,
    price:null,
    change_percentage:null,
    type:'gainers',
}

export const fetchTopGainersLosers=createAsyncThunk('topGainersLosers/fetchData',async(_,{getState})=>{
   
    const url=`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`
    const config = { headers: { 'User-Agent': 'request' } };
    const response = await fetch(url, config);
    if (!response.ok) {
    throw new Error('Request failed');
  }
  const data=await response.json()

   
  return data
})


 const topGainersLosersSlice=createSlice({
    name:'topGainersLosers',
    initialState,
    reducers:{
        updateLoading:(state,action)=>{

            if(action.payload)
            {
                state.loading='succeeded'
            }
            else{
                state.loading=state.loading
            }
        },
        updatePricePercentage:(state,action)=>{
            const{price,change_percentage}=action.payload

            if(price && change_percentage)
            {
                state.price=price
                state.change_percentage=change_percentage
            }
            
        },
        updateType:(state,action)=>{
            console.log("action",action.payload)
            const {tab}=action.payload
            console.log("tab",tab)
            if(action.payload)
            {
                state.type=action.payload.tab
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTopGainersLosers.pending,(state)=>{
            state.loading='pending'
            state.error=null
        })
        .addCase(fetchTopGainersLosers.fulfilled,(state,action)=>{
            state.loading='succeeded'
            state.data=action.payload
        })
        .addCase(fetchTopGainersLosers.rejected,(state,action)=>{
            state.loading='failed'
            state.error=action.error.message
        })
    }
})

export const {updateLoading,updatePricePercentage,updateType} = topGainersLosersSlice.actions
export default topGainersLosersSlice.reducer