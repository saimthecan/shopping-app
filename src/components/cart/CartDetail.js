import React , { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cartAction from "../../redux/actions/cartActions";
import { Table, Button } from "reactstrap";
import alertify from "alertifyjs";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import backgroundImage from "../../assests/emptyCart.jpg";

const CartDetail = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);

  const removeFromCart = (product) => {
    dispatch(cartAction.removeFromCart(product));
    alertify.error(product.productName + " deleted from the cart");
  };
  const [transparentBackgroundImage, setTransparentBackgroundImage] = useState(null);

  useEffect(() => {
    applyTransparencyToImage(backgroundImage, 128, (transparentImage) => {
      setTransparentBackgroundImage(transparentImage);
    });
  }, []);

  const renderSummary = () => (
    <div style={{ width: "60%", marginLeft: "2rem" }}>
      <p style={{ marginTop: "1rem", marginLeft: "3rem" }}>
        <span className="h2">Shopping Cart </span>
      </p>
      <Table bordered size="" striped style={{ marginTop: "0.5rem" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Last Name</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <th scope="row">{cartItem.product.id}</th>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.quantity}</td>

              <td style={{ maxWidth: "7rem" }}>
                <Button color="danger" onClick={() => removeFromCart(cartItem.product)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end">
        <Link to="/products">
          <MDBBtn style={{ backgroundColor: "burlywood" }} size="lg" className="me-2">
            Continue shopping
          </MDBBtn>
        </Link>
        <MDBBtn size="lg">Go To Checkout</MDBBtn>
      </div>
    </div>
  );

  const renderEmpty = () => {
    const containerStyle = {
      minHeight: "100vh",
      backgroundImage: `url(${transparentBackgroundImage})`,
      backgroundPosition: "center -20vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: "27vh",
      
    };

    const titleBoxStyle = {
      backgroundColor: "crimson",
      padding: "1rem",
      borderRadius: "4px",
      marginBottom: "0.5rem",
      paddingBottom :"0.5rem",
      maxWidth: "50%",
      maxHeight: "60%"

    };

    const titleStyle = {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      margin: 0,
    };
    return (
      <div style={containerStyle}>
        <Container className="d-flex flex-column align-items-center">
          <div className="text-center" style={titleBoxStyle}>
            <h5 style={titleStyle}> Your cart is empty, please add items to your cart.</h5>
          </div>
          <div className="mt-3">
            <Link to="/products">
              <MDBBtn style={{backgroundColor:"burlywood"}} size="lg" className="me-2">
                Start Shopping
              </MDBBtn>
            </Link>
          </div>
        </Container>
      </div>
    );
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={containerStyle}>
      {cart.length > 0 ? renderSummary() : renderEmpty()}
    </div>
  );
};

const applyTransparencyToImage = (src, alpha, callback) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = src;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i + 3] = alpha;
    }

    ctx.putImageData(imgData, 0, 0);
    callback(canvas.toDataURL("image/png"));
  };
};

export default CartDetail;
