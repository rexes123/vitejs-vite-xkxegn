import { Routes, Route, BrowserRouter, Router } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expense';
import Trip from './pages/Trip';
import NewExpense from './pages/NewExpense';
import NewTrips from './pages/NewTrips';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AuthProvider } from './components/AuthProvider';
import Approvals from './pages/Approvals';
import Settings from './pages/Settings';
import Layout from './components/Layout';

export default function App() {

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Dashboard />} />
              <Route path='/newExpense' element={<NewExpense />} />
              <Route path='/expense' element={<Expense />} />
              <Route path='/trips' element={<Trip />} />
              <Route path='/newTrips' element={<NewTrips />} />
              <Route path='/approvals' element={<Approvals />} />
              <Route path='/settings' element={<Settings />} />
            </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
