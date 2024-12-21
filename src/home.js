import React from 'react'
import Baner from './component/baner/baner';
import Items from './component/fooditems/items';
import HelmetComponent from './component/helmet/helmet';
export default function home() {
  return (
    <div>

<HelmetComponent
        title="Welcome to our Restaurant - Best Place to Order Food Online"
        description="Explore our wide variety of delicious food items available for online ordering. Get your favorite meals delivered to your doorstep!"
        keywords="restaurant, food delivery, online ordering, best food, order food online"
        ogTitle="Best Place to Order Food Online"
        ogDescription="Explore our wide variety of delicious food items available for online ordering. Get your favorite meals delivered to your doorstep!"
        ogUrl="http://192.168.43.46:3000"
        ogImage="https://i.imgur.com/lQAb1MH.png"
        ogImageAlt="Delicious food banner"
        ogImageWidth="300"
        ogImageHeight="200"
      />
    <Baner/>
    <Items/>
    </div>
  )
}



