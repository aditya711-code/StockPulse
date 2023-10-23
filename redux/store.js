import {configureStore} from '@reduxjs/toolkit'
import topGainersLosersReducer from './features/gainerslosersSlice'
import productDetailsReducer from './features/productSlice'
import searchProductsReducer from './features/searchSlice'
 const store=configureStore({
    reducer:{
        topGainersLosers:topGainersLosersReducer,
        productDetails:productDetailsReducer,
        searchProducts:searchProductsReducer
    },
    
})
export default store