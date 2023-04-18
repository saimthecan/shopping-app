import React, { Component } from "react";
import { Badge } from "reactstrap";
import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
} from "reactstrap";
import { bindActionCreators } from "redux";
import * as cartAction from "../../redux/actions/cartActions";
import {Link} from "react-router-dom";
import alertify from "alertifyjs";
import cart from "../../assests/cart.png"

class CartSummary extends Component {
  removeFromCart(product){
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " deleted from the cart")
}
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
        <img src={cart} alt="cart logo" height="30" />
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
               <Badge color="danger" onClick={()=> this.removeFromCart(cartItem.product)}>X</Badge>
              {cartItem.product.productName} 
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}

         
          <DropdownItem divider />
          <DropdownItem><Link to={"/cart"}>Go To Cart</Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  renderEmpty() {
    return (
      <NavItem>
        <img src={cart} alt="cart logo" height="30" />
      </NavItem>
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
    }
  }
}


function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(CartSummary);
