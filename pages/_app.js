import '@/styles/globals.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';             
import 'primereact/resources/primereact.css';                      // css utility
import { PrimeReactProvider } from 'primereact/api';
import { Provider } from 'react-redux';
import store from '@/redux/store'
import Layout from '@/Components/layout';
export default function App({ Component, pageProps }) {
  const value = {
        ripple: false,
       
    }
  return( 
    <PrimeReactProvider value={value}>
    

      
          <Layout>
            <Component {...pageProps} />
          </Layout>
   
    </PrimeReactProvider>
  )
      
  
        
}
