import { Route, Routes } from 'react-router-dom'
import {AuthPage} from '../../features/auth/page/AuthPage'
import {DashboardPage} from '../layouts/DashboardPage'
import {ProtectedRoutes} from '../routes/ProtectedRoutes'
import {UnauthorizedPage} from '../../features/auth/page/UnauthorizedPage'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<AuthPage/>}/> 
            <Route path='/unauthorized' element={<UnauthorizedPage/>}/>
            <Route path='/dashboard/*' element={
                <ProtectedRoutes>
                    <DashboardPage/>
                </ProtectedRoutes>
            }/>
        </Routes>
    )
}

