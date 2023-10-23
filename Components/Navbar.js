import React ,{ useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import Link from 'next/link';
import {AiOutlineLineChart,AiOutlineSearch} from 'react-icons/ai'
import SearchBar from './SearchBar';
const NavBar = () => {
   
  return (
    <div className="navbar">
      <div className="leftNav">
       <AiOutlineLineChart style={{fontSize:'2.5rem'}}/>
        <h3>
            <Link href="/" prefetch={false} style={{textDecoration:'none',color:'inherit'}} >
              StockPulse
            </Link>
          </h3>
      </div>
      <div className="rightNav">
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
