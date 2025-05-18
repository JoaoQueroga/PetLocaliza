import { createRoot } from 'react-dom/client'
import './global.css'
import './prime-react.css'
import App from './App.jsx'

import ApiProvider from './context/contextApi'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
createRoot(document.getElementById('root')).render(<ApiProvider><App/></ApiProvider>)