import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Navigate to="/dashboard"/>}/>
        <Route path='dashboard' element={<DashboardPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
