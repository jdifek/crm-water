import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './helpers/context/AuthContext.tsx'
import { DeviceProvider } from './helpers/context/DeviceContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<DeviceProvider>
				<App />
			</DeviceProvider>
		</BrowserRouter>
	</StrictMode>
)
