import '@/styles/globals.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primeflex/primeflex.css';             
import 'primereact/resources/primereact.css';                      
import { PrimeReactProvider } from 'primereact/api';;
import Layout from '@/Components/layout';
export default function App({ Component, pageProps }) {
 
  return( 
    <PrimeReactProvider >
          <Layout>
            <Component {...pageProps} />
          </Layout>
    </PrimeReactProvider>
  )
      
  
        
}
