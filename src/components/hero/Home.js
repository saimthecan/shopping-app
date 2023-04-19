import React, { useState, useEffect } from 'react';
import background from "../../assests/back1.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [transparentBackground, setTransparentBackground] = useState("");
    function applyImageTransparency(imageSrc, opacity) {
        return new Promise((resolve, reject) => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          const image = new Image();
      
          image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            context.globalAlpha = opacity;
            context.drawImage(image, 0, 0);
      
            resolve(canvas.toDataURL());
          };
      
          image.onerror = (error) => {
            reject(error);
          };
      
          image.src = imageSrc;
        });
      }
      useEffect(() => {
        applyImageTransparency(background, 0.4)
          .then((transparentImage) => {
            setTransparentBackground(transparentImage);
          })
          .catch((error) => {
            console.error("Error applying transparency:", error);
          });
      }, []);
    
      
      const containerStyle = {
        backgroundImage: `url(${transparentBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "27vh",
      };

      const titleBoxStyle = {
        backgroundColor: "tomato",
        padding: "1rem",
        borderRadius: "4px",
        marginBottom: "1rem",
        paddingBottom :"0.5rem"

      };

      const titleStyle = {
        fontSize: "3rem",
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        margin: 0,
      };
    
      const handleClick = () => {
        navigate("/products");
      };



      const buttonStyle = {
        backgroundColor: "#1e88e5",
        color: "#fff",
        fontSize: "1.2rem",
        fontWeight: "bold",
        padding: "0.8rem 1.5rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      };
    

    return (
        <div style={containerStyle}>
      <div style={titleBoxStyle}>
        <h1 style={titleStyle}>Welcome To Your Shop</h1>
      </div>
      <button style={buttonStyle} onClick={handleClick}>
        Get Products
      </button>
    </div>
    );
};

export default Home;
