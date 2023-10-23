import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { API_URLS,API_KEY } from '@/utils/constant'
const initialState={
    data:null,
    loading:'idle',
    error:null,
    lastFetched:null,
}
export const fetchSearchedProducts=createAsyncThunk('searchProducts/fetchData',async(keywords)=>{
    ("keywords-search",keywords)
    const url=`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`
    const config = { headers: { 'User-Agent': 'request' } };
    const response = await fetch(url, config);
    if (!response.ok) {
    throw new Error('Request failed');
  }
  const data=await response.json()

  return data
})

const searchProductsSlice=createSlice({
    name:'searchProducts',
    initialState,
    reudcers:{},
    extraReducers:(builder)=>{
        builder.
        addCase(fetchSearchedProducts.pending,(state)=>{
            state.loading='pending'
            state.error=null
        })
        .addCase(fetchSearchedProducts.fulfilled,(state,action)=>{
            state.loading='succeeded'
            state.data=action.payload
        })
        .addCase(fetchSearchedProducts.rejected,(state,action)=>{
            state.loading='failed',
            state.error=action.error.message
        })
    }
})
export default searchProductsSlice.reducer