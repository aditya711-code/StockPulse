import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { API_URLS,API_KEY } from '@/utils/constant'
const initialState={
    data:null,
    loading:'idle',
    error:null,
}
export const fetchProductDetails=createAsyncThunk('productDetails/fetchData',async(keywords)=>{

    const url=`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${keywords}&apikey=${API_KEY}`
    // const url=`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`
    
    const config = { headers: { 'User-Agent': 'request' } };
    const response = await fetch(url, config);
    console.log("response",response)
    if (!response.ok || response.Information) {
    throw new Error('Request failed');
  }
  const data=await response.json()
  console.log("data_reducer",data)
  return data
})

const ProductDetailsSlice=createSlice({
    name:'productDetails',
    initialState,
    reducers:{
        updateLoading:(state,action)=>{
            if(action.payload)
            {
                
                state.loading='succeeded'
            }
            else
            {
                state.loading=state.loading
            }
        }
    },
    extraReducers:(builder)=>{
        builder.
        addCase(fetchProductDetails.pending,(state)=>{
            state.loading='pending'
            state.error=null
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            console.log("api-data",action.payload)
            state.loading='succeeded'
            state.data=action.payload
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading='failed',
            state.error=action.error.message
        })
    }
})
export const{updateLoading}=ProductDetailsSlice.actions
export default ProductDetailsSlice.reducer