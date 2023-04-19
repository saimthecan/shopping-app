import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import * as cartAction from "../../redux/actions/cartActions";
import { connect } from "react-redux";
import { Table, Button} from "reactstrap";
import alertify from "alertifyjs";
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';


class CartDetail extends Component {
    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + " deleted from the cart")
    }
    renderSummary() {
    return (
      <div>
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

                  <td style={{maxWidth:"3.5rem"}}> 
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
                <MDBBtn color="light" size="lg" className="me-2">
                Continue shopping
              </MDBBtn>
              </Link>
              <MDBBtn size="lg">Go To Checkout</MDBBtn>
            
            </div>

      </div>
      
    )
  }


renderEmpty() {
  return (
    <Container>
      Your cart is empty please add items to your cart
   
    <div className="d-flex justify-content-end">
    <Link to="/products">
    <MDBBtn color="light" size="lg" className="me-2">
    Continue shopping
  </MDBBtn>
  </Link>
  </div>
  </Container>
  );
}

render() {
  return (
    <div>
      {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
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

  