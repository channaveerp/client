import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './component/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/fetaures/authSlice';

function App() {
  const dispatch = useDispatch();
  // refers to the component localstorage data store into redux stores
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('profile'));
    dispatch(setUser(user));
  }, []);

  return (
    <div className='App'>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
