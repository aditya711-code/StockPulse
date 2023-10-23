import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { API_URLS ,CACHE_TIMEOUT} from '@/utils/constant'

const initialState={
    data:null,
    loading:'idle',
    error:null,
    lastFetched:null,
}

export const fetchTopGainersLosers=createAsyncThunk('topGainersLosers/fetchData',async(_,{getState})=>{
   
    const url='https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo'
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

export const {updateLoading} = topGainersLosersSlice.actions
export default topGainersLosersSlice.reducer