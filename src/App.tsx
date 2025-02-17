/* временно прописанные роли пользователей */

// import { Route, Routes } from 'react-router-dom'
// import DevicesList from './components/DevicesList'
// import { Layout } from './components/Layout'
// import ProtectedRoute from './components/ProtectedRoute'
// import Users from './pages/admin/Users'
// import CardsList from './pages/cards/CardsList'
// import Dashboard from './pages/Dashboard'
// import { DeviceConfig } from './pages/devices/DeviceConfig'
// import DeviceDetails from './pages/devices/DeviceDetails'
// import DeviceRegulations from './pages/devices/DeviceRegulations'
// import DeviceSettings from './pages/devices/DeviceSettings'
// import { ReplacingValues } from './pages/devices/ReplacingValues'
// import MaintenanceHistory from './pages/maintenance/MaintenanceHistory'
// import Collection from './pages/statistics/Collection'
// import DailyStats from './pages/statistics/DailyStats'
// import DeviceStats from './pages/statistics/DeviceStats'
// import LiterStats from './pages/statistics/LiterStats'
// import SalesByDay from './pages/statistics/SalesByDay'
// import Statistics from './pages/statistics/Statistics'
// import YearlyReport from './pages/statistics/YearlyReport'

// function App() {
// 	return (
// 		<Layout>
// 			<Routes>
// 				<Route path='/' element={<Dashboard />} />

// 				{/* Devices */}
// 				<Route
// 					path='/devices/list'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Оператор',
// 								'Водитель',
// 								'Техник',
// 								'Инкассатор',
// 							]}
// 						>
// 							<DevicesList />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/devices/details/:id'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Оператор',
// 								'Водитель',
// 								'Техник',
// 								'Инкассатор',
// 							]}
// 						>
// 							<DeviceDetails />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/devices/settings/:id'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Оператор',
// 								'Водитель',
// 								'Техник',
// 								'Инкассатор',
// 							]}
// 						>
// 							<DeviceSettings />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/devices/replacing/:id'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Оператор',
// 								'Водитель',
// 								'Техник',
// 								'Инкассатор',
// 							]}
// 						>
// 							<ReplacingValues />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/devices/config/:id'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Оператор',
// 								'Водитель',
// 								'Техник',
// 								'Инкассатор',
// 							]}
// 						>
// 							<DeviceConfig />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/devices/regulations/:id'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Оператор',
// 								'Водитель',
// 								'Техник',
// 								'Инкассатор',
// 							]}
// 						>
// 							<DeviceRegulations />
// 						</ProtectedRoute>
// 					}
// 				/>

// 				{/* Statistics */}
// 				<Route
// 					path='/stats/sales'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Бухгалтер',
// 							]}
// 						>
// 							<Statistics />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/stats/by-days'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Бухгалтер',
// 							]}
// 						>
// 							<SalesByDay />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/stats/daily'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Бухгалтер',
// 							]}
// 						>
// 							<DailyStats />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/stats/devices'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Бухгалтер',
// 							]}
// 						>
// 							<DeviceStats />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/stats/collection'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Бухгалтер',
// 							]}
// 						>
// 							<Collection />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/stats/by-liters'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Бухгалтер',
// 							]}
// 						>
// 							<LiterStats />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				<Route
// 					path='/stats/yearly'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={[
// 								'Супер администратор',
// 								'Администратор',
// 								'Бухгалтер',
// 							]}
// 						>
// 							<YearlyReport />
// 						</ProtectedRoute>
// 					}
// 				/>

// 				{/* Cards */}
// 				<Route path='/cards/list' element={<CardsList />} />
// 				{/* <Route path="/cards/connections" element={<CardConnections />} /> */}

// 				{/* Maintenance */}
// 				<Route path='/maintenance/history' element={<MaintenanceHistory />} />

// 				{/* Settings */}
// 				{/* <Route path="/settings/branch" element={<BranchSettings />} /> */}
// 				{/* <Route path="/settings/admin" element={<AdminSettings />} /> */}

// 				{/* Administration */}
// 				<Route
// 					path='/admin/users'
// 					element={
// 						<ProtectedRoute
// 							allowedRoles={['Супер администратор', 'Администратор']}
// 						>
// 							<Users />
// 						</ProtectedRoute>
// 					}
// 				/>
// 				{/* <Route path="/admin/access" element={<Access />} /> */}
// 			</Routes>
// 		</Layout>
// 	)
// }

// export default App

import { Route, Routes } from 'react-router-dom'
import DevicesList from './components/DevicesList'
import { Layout } from './components/Layout'
import Users from './pages/admin/Users'
import CardsList from './pages/cards/CardsList'
import Dashboard from './pages/Dashboard'
import { DeviceConfig } from './pages/devices/DeviceConfig'
import DeviceDetails from './pages/devices/DeviceDetails'
import DeviceRegulations from './pages/devices/DeviceRegulations'
import DeviceSettings from './pages/devices/DeviceSettings'
import { ReplacingValues } from './pages/devices/ReplacingValues'
import MaintenanceHistory from './pages/maintenance/MaintenanceHistory'
import Collection from './pages/statistics/Collection'
import DailyStats from './pages/statistics/DailyStats'
import DeviceStats from './pages/statistics/DeviceStats'
import LiterStats from './pages/statistics/LiterStats'
import SalesByDay from './pages/statistics/SalesByDay'
import Statistics from './pages/statistics/Statistics'
import YearlyReport from './pages/statistics/YearlyReport'

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Dashboard />} />

				{/* Devices */}
				<Route path='/devices/list' element={<DevicesList />} />
				<Route path='/devices/details/:id' element={<DeviceDetails />} />
				<Route path='/devices/settings/:id' element={<DeviceSettings />} />
				<Route path='/devices/replacing/:id' element={<ReplacingValues />} />
				<Route path='/devices/config/:id' element={<DeviceConfig />} />
				<Route
					path='/devices/regulations/:id'
					element={<DeviceRegulations />}
				/>

				{/* Statistics */}
				<Route path='/stats/sales' element={<Statistics />} />
				<Route path='/stats/by-days' element={<SalesByDay />} />
				<Route path='/stats/daily' element={<DailyStats />} />
				<Route path='/stats/devices' element={<DeviceStats />} />
				<Route path='/stats/collection' element={<Collection />} />
				<Route path='/stats/by-liters' element={<LiterStats />} />
				<Route path='/stats/yearly' element={<YearlyReport />} />

				{/* Cards */}
				<Route path='/cards/list' element={<CardsList />} />
				{/* <Route path="/cards/connections" element={<CardConnections />} /> */}

				{/* Maintenance */}
				<Route path='/maintenance/history' element={<MaintenanceHistory />} />

				{/* Settings */}
				{/* <Route path="/settings/branch" element={<BranchSettings />} /> */}
				{/* <Route path="/settings/admin" element={<AdminSettings />} /> */}

				{/* Administration */}
				<Route path='/admin/users' element={<Users />} />
				{/* <Route path="/admin/access" element={<Access />} /> */}
			</Routes>
		</Layout>
	)
}

export default App
