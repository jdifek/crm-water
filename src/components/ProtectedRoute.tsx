/* тестовый, без ролей с сервера */

// import { useContext } from 'react'
// import { Navigate } from 'react-router-dom'
// import { AuthContext } from '../helpers/context/AuthContext'

// interface ProtectedRouteProps {
// 	children: JSX.Element
// 	allowedRoles: string[]
// }

// const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
// 	const { user } = useContext(AuthContext)!

// 	if (!user) {
// 		return <Navigate to='/' />
// 	}

// 	if (!allowedRoles.includes(user.role)) {
// 		return <Navigate to='/' />
// 	}

// 	return children
// }

// export default ProtectedRoute

// import { useContext } from 'react'
// import { Navigate } from 'react-router-dom'
// import { AuthContext } from '../helpers/context/AuthContext'

// interface ProtectedRouteProps {
// 	children: JSX.Element
// 	allowedRoles: string[]
// }

// const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
// 	const { user } = useContext(AuthContext)!
// 	return user && allowedRoles.includes(user.role) ? (
// 		children
// 	) : (
// 		<Navigate to='/' />
// 	)
// }

// export default ProtectedRoute
