import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard  from './pages/Dashboard';
import Expense from './pages/Expense';
import Trip from './pages/Trip';
import NewExpense from './pages/NewExpense';
import NewTrips from './pages/NewTrips';

export default function App() {

  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/newExpense' element={<NewExpense/>}/>
      <Route path='/expense' element={<Expense/>}/>
      <Route path='/trips' element={<Trip/>}/>
      <Route path='/newTrips' element={<NewTrips/>}/>

    </Routes>
    </BrowserRouter>
    </div>
  );
}
