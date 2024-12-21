
import './App.css';
import Home from './home';
import Header from './component/header/header';
import Footer from './component/footer/footer';
import Menu from './component/menu/menu';
import Cart from './component/cart/cart';
import { Provider } from 'react-redux';
import HelmetComponent from './component/helmet/helmet';
import FoodDetail from './component/foodDetails/foodDetails';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './saga/store';
function App() {
  return (
    <div className='app'>
      
      <HelmetComponent
        title="Welcome to our Restaurant"
        description="Order food online from our wide selection of meals."
        keywords="restaurant, food delivery, online ordering, best food, order food online"
        ogTitle="Best Place to Order Food Online"
        ogDescription="Explore our wide variety of delicious food items available for online ordering. Get your favorite meals delivered to your doorstep!"
        ogUrl="http://192.168.43.46:3000"
        ogImage="https://i.imgur.com/lQAb1MH.png"
        ogImageAlt="Delicious food banner"
        ogImageWidth="300"
        ogImageHeight="200"
      />
      <Provider store={store}>
    <Router>
      <Header/>
      <hr></hr>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/food/:id" element={<FoodDetail />} />
        
      </Routes>
      <Footer/>
   </Router>
   </Provider>
    </div>
  );
}

export default App;
