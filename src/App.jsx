import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard  from './pages/Dashboard';

export default function App() {

  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}
