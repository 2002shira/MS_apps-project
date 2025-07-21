import React from 'react';
import { useDispatch } from 'react-redux';

import Navbar from './components/NavBar/NavBar';
import Images from './pages/Image/Images';

import { setCategory } from './redux/imageSlice';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  return (
    <div className="app-container">
      <Navbar onSelectCategory={(cat) => dispatch(setCategory(cat))} />
      <Images />
    </div>
  );
}

export default App;
