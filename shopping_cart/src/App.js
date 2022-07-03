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

  // let [cart, setCart] = useState([])
  // let localCart = localStorage.getItem("cart");

  const[cartItems,setCartItems]=useState([]);
  // useEffect(()=>{
  //   // window.localStorage.setItem('Cart',JSON.stringify(cartItems))
  // },[cartItems])
   const onAdd=(product)=>{
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    if(Cart)
    {
      localStorage.removeItem("Cart")
      localStorage.setItem("Cart", JSON.stringify(cartItems))
    }else{
    localStorage.setItem("Cart", JSON.stringify(cartItems))
    }
    console.log('Added')
    console.log(cartItems)
   };
   const onRemove=(product)=>{
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
   };
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products onAdd={onAdd} products={products} />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} />} />
      </Routes> 
      {/* <Products onAdd={onAdd} products={products} />
        <Cart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} /> */}
        
    </div>
  );
}

export default App;
