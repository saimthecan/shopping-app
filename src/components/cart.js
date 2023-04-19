import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import * as cartAction from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { Table, Button} from "reactstrap";
import alertify from "alertifyjs";
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import backgroundImage from '../../assests/emptyCart.jpg';


class CartDetail extends Component {
    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + " deleted from the cart")
    }
    renderSummary() {
    return (
      <div style={{width:"60%", marginLeft:"2rem"}}> 
         <p style={{marginTop:"1rem",marginLeft:"3rem"}}>
              <span className="h2">Shopping Cart </span>
            </p>
       <Table bordered size="" striped style={{marginTop:"0.5rem"}}>
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
  {this.props.cart.map((cartItem) => (
                <tr key={cartItem.product.id}>
                  <th scope="row">{cartItem.product.id}</th>
                  <td>{cartItem.product.productName}</td>
                  <td>{cartItem.product.unitPrice}</td>
                  <td>{cartItem.quantity}</td>

                  <td style={{maxWidth:"7rem"}}> 
                  <Button color="danger" onClick ={() => this.removeFromCart(cartItem.product)}>
                    Delete
                  </Button>
                  </td>
                </tr>
              ))}
  </tbody>
</Table>
<div className="d-flex justify-content-end">
                <Link to="/products">
                <MDBBtn style={{backgroundColor:"burlywood"}} size="lg" className="me-2">
                Continue shopping
              </MDBBtn>
              </Link>
              <MDBBtn size="lg">Go To Checkout</MDBBtn>
            
            </div>

      </div>
      
    )
  }


renderEmpty() {
  const containerStyle = {
    minHeight: '100vh', // Navbar yüksekliği düşünülerek ayarlanmıştır.
    paddingTop: '1vh', // Bu değeri navbar yüksekliğine göre ayarlayın.
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "100px 10px center",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <div style={containerStyle}>
      <Container className="d-flex flex-column align-items-center">
        <div className="text-center">
          <h4>Your cart is empty, please add items to your cart.</h4>
        </div>
        <div className="mt-3">
          <Link to="/products">
            <MDBBtn color="light" size="lg" className="me-2">
              Continue shopping
            </MDBBtn>
          </Link>
        </div>
      </Container>
    </div>
  );
}

render() {
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div style={containerStyle}>
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renderEmpty()}
      </div>
  );
}
}

function mapDispatchToProps(dispatch) {
    return {
      actions:{
        removeFromCart: bindActionCreators(cartAction.removeFromCart, dispatch)
      },
    };
  }

  
  function mapStateToProps(state) { 
    return {
      cart: state.cartReducer,
    };
  }

  
  export default connect(mapStateToProps,mapDispatchToProps)(CartDetail);

  