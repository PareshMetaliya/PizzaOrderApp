import React from 'react'
import { useState } from "react";
import "../style/home2.css";

function Home2() {
    const [index, setIndex] = useState(0);
    
  
  
    const images =[
      "https://img.freepik.com/free-psd/food-menu-delicious-pizza-web-banner-template_106176-420.jpg?w=996&t=st=1695577481~exp=1695578081~hmac=fe1b130d4ebecec47081cfe036e4441c65f931ec5c45dd942194d58f5116080a",
      "https://img.freepik.com/free-psd/food-menu-delicious-pizza-web-banner-template_106176-419.jpg?w=996&t=st=1695577462~exp=1695578062~hmac=afbc39c5d44faa572cb4dcc34db94e7241c3b58bc1fb41aad1d5d6af60fe6652",
      "https://img.freepik.com/premium-psd/super-delicious-pizza-social-media-facebook-cover-design_440834-336.jpg",
    ];
  
  
    const handleArrow = (direction) =>{
        if(direction==="l"){
            setIndex(index !== 0 ? index-1 : 2)
        }
        if(direction==="r"){
            setIndex(index !== 2 ? index+1 : 0)
        }
    }
  
    return (
      <div className="container">
        <div className="arrowContainer" style={{ left: 0 }} onClick={()=>handleArrow("l")}>
          <img src="/img/arrowl.png" alt="" layout="fill" objectFit="contain"/>
        </div>
        <div className="wrapper" style={{transform:`translateX(${-100*index}vw)`}}>
          {images.map((img, i) => (
            <div className="imgContainer" key={i}>
              <img src={img} alt="" layout="fill" objectFit="contain" />
            </div>
          ))}
        </div>
        <div className="arrowContainer" style={{ right: 0 }} onClick={()=>handleArrow("r")}>
          <img src="/img/arrowr.png" layout="fill" alt="" objectFit="contain"/>
        </div>
      </div>
    );
  }

export default Home2
