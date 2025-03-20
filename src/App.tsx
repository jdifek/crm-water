/* временно прописанные роли пользователей */
import { Route, Routes, Navigate } from 'react-router-dom'
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
import { useAuth } from './helpers/context/AuthContext'

interface ProtectedRouteProps {
	component: React.ComponentType
	allowedRoles: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	component: Component,
	allowedRoles,
}) => {
	const { userRole } = useAuth()
	if (!userRole || !allowedRoles.includes(userRole)) {
		return <Navigate to='/' />
	}
	return <Component />
}

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Dashboard />} />

				{/* Devices */}
				<Route
					path='/devices/list'
					element={
						<ProtectedRoute
							component={DevicesList}
							allowedRoles={[
								'super_admin',
								'admin',
								'operator',
								'driver',
								'technician',
								'collector',
							]}
						/>
					}
				/>
				<Route
					path='/devices/details/:id'
					element={
						<ProtectedRoute
							component={DeviceDetails}
							allowedRoles={[
								'super_admin',
								'admin',
								'operator',
								'driver',
								'technician',
								'collector',
							]}
						/>
					}
				/>
				<Route
					path='/devices/settings/:id'
					element={
						<ProtectedRoute
							component={DeviceSettings}
							allowedRoles={['super_admin', 'admin', 'operator', 'technician']}
						/>
					}
				/>
				<Route
					path='/devices/replacing/:id'
					element={
						<ProtectedRoute
							component={ReplacingValues}
							allowedRoles={['super_admin', 'admin', 'operator', 'technician']}
						/>
					}
				/>
				<Route
					path='/devices/config/:id'
					element={
						<ProtectedRoute
							component={DeviceConfig}
							allowedRoles={['super_admin', 'admin', 'operator', 'technician']}
						/>
					}
				/>
				<Route
					path='/devices/regulations/:id'
					element={
						<ProtectedRoute
							component={DeviceRegulations}
							allowedRoles={['super_admin', 'admin', 'operator', 'technician']}
						/>
					}
				/>

				{/* Statistics */}
				<Route
					path='/stats/sales'
					element={
						<ProtectedRoute
							component={Statistics}
							allowedRoles={['super_admin', 'admin', 'operator', 'accountant']}
						/>
					}
				/>
				<Route
					path='/stats/by-days'
					element={
						<ProtectedRoute
							component={SalesByDay}
							allowedRoles={['super_admin', 'admin', 'operator', 'accountant']}
						/>
					}
				/>
				<Route
					path='/stats/daily'
					element={
						<ProtectedRoute
							component={DailyStats}
							allowedRoles={['super_admin', 'admin', 'operator', 'accountant']}
						/>
					}
				/>
				<Route
					path='/stats/devices'
					element={
						<ProtectedRoute
							component={DeviceStats}
							allowedRoles={['super_admin', 'admin', 'operator', 'accountant']}
						/>
					}
				/>
				<Route
					path='/stats/collection'
					element={
						<ProtectedRoute
							component={Collection}
							allowedRoles={[
								'super_admin',
								'admin',
								'operator',
								'collector',
								'accountant',
							]}
						/>
					}
				/>
				<Route
					path='/stats/by-liters'
					element={
						<ProtectedRoute
							component={LiterStats}
							allowedRoles={['super_admin', 'admin', 'operator', 'accountant']}
						/>
					}
				/>
				<Route
					path='/stats/yearly'
					element={
						<ProtectedRoute
							component={YearlyReport}
							allowedRoles={['super_admin', 'admin', 'operator', 'accountant']}
						/>
					}
				/>

				{/* Cards */}
				<Route
					path='/cards/list'
					element={
						<ProtectedRoute
							component={CardsList}
							allowedRoles={['super_admin', 'admin', 'operator']}
						/>
					}
				/>

				{/* Maintenance */}
				<Route
					path='/maintenance/history'
					element={
						<ProtectedRoute
							component={MaintenanceHistory}
							allowedRoles={['super_admin', 'admin', 'operator', 'technician']}
						/>
					}
				/>

				{/* Administration */}
				<Route
					path='/admin/users'
					element={
						<ProtectedRoute component={Users} allowedRoles={['super_admin']} />
					}
				/>
			</Routes>
		</Layout>
	)
}

export default App

// import { Route, Routes } from 'react-router-dom'
// import DevicesList from './components/DevicesList'
// import { Layout } from './components/Layout'
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
// 				<Route path='/devices/list' element={<DevicesList />} />
// 				<Route path='/devices/details/:id' element={<DeviceDetails />} />
// 				<Route path='/devices/settings/:id' element={<DeviceSettings />} />
// 				<Route path='/devices/replacing/:id' element={<ReplacingValues />} />
// 				<Route path='/devices/config/:id' element={<DeviceConfig />} />
// 				<Route
// 					path='/devices/regulations/:id'
// 					element={<DeviceRegulations />}
// 				/>

// 				{/* Statistics */}
// 				<Route path='/stats/sales' element={<Statistics />} />
// 				<Route path='/stats/by-days' element={<SalesByDay />} />
// 				<Route path='/stats/daily' element={<DailyStats />} />
// 				<Route path='/stats/devices' element={<DeviceStats />} />
// 				<Route path='/stats/collection' element={<Collection />} />
// 				<Route path='/stats/by-liters' element={<LiterStats />} />
// 				<Route path='/stats/yearly' element={<YearlyReport />} />

// 				{/* Cards */}
// 				<Route path='/cards/list' element={<CardsList />} />
// 				{/* <Route path="/cards/connections" element={<CardConnections />} /> */}

// 				{/* Maintenance */}
// 				<Route path='/maintenance/history' element={<MaintenanceHistory />} />

// 				{/* Settings */}
// 				{/* <Route path="/settings/branch" element={<BranchSettings />} /> */}
// 				{/* <Route path="/settings/admin" element={<AdminSettings />} /> */}

// 				{/* Administration */}
// 				<Route path='/admin/users' element={<Users />} />
// 				{/* <Route path="/admin/access" element={<Access />} /> */}
// 			</Routes>
// 		</Layout>
// 	)
// }

// export default App
