import './App.css';
import Header from './components/Header';
import Products from './components/Products';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Cart from './components/Cart';
import {useState,useEffect} from 'react';
import {Routes,Route} from 'react-router-dom';
function App(props) {
  const[products,setProducts]=useState([]);
  const url='http://localhost:8000/'
  useEffect(()=>{
    const getProducts= async()=>{
      const res=await fetch(`${url}`);
      const getProduct= await res.json();
      setProducts(getProduct);
  }
  getProducts();
  },[]);
  return (
    <div>
      <Header />
        <Home products={products} />
        
    </div>
  );
}

export default App;
