import React, { useState, useEffect, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import {AiOutlineSearch} from 'react-icons/ai'
import { InputText } from 'primereact/inputtext';
import { useRouter } from 'next/router';
import { useDispatch,useSelector } from 'react-redux';
import {fetchSearchedProducts} from '@/redux/features/searchSlice';

const SearchBar=()=> {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchSymbol,setSearchSymbol]=useState('')
    const router=useRouter();
    const dispatch=useDispatch()
    const{data,loading,error}=useSelector((state)=>state.searchProducts)  
    useEffect(()=>{
        const keywords=searchSymbol
        dispatch(fetchSearchedProducts(keywords))

    },[searchSymbol])
    
    useEffect(()=>{
        if(loading==='succeeded')
        {
           
            setProducts(data.bestMatches)
        }
    },[loading])
       

    const op = useRef(null);
    const toast = useRef(null);
    const isMounted = useRef(false);

   
    const onSelection=(e)=>{
        (e.value["1. symbol"])
       return router.push('/product/'+ `${e.value["1. symbol"]}`)
    }
    
    return (
        <div className="card flex flex-column align-items-center gap-3">
                <span className="p-input-icon-left searchBar align-items-center"  onClick={(e) => op.current.toggle(e)}>
                    <AiOutlineSearch />
                    <InputText placeholder="Search" type="text" className="p-inputtext-sm" value={searchSymbol} onChange={(e)=>setSearchSymbol(e.target.value)}/>
                </span>
          
            <OverlayPanel ref={op} showCloseIcon closeOnEscape dismissable={false}>
                <DataTable value={products} selectionMode="single" paginator rows={5} selection={selectedProduct} onSelectionChange={(e)=>onSelection(e)}>
                    
                    <Column header="Equity" field="2. name" />
                    <Column header="" field="1. symbol" />
                </DataTable>
            </OverlayPanel>
        </div>
    );
}
        
export default SearchBar