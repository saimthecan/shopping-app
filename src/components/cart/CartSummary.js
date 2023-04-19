import React, { Component } from "react";
import {
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartAction from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import cart from "../../assests/cart.png";


class CartSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  removeFromCart(event, product) {
    event.stopPropagation();
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " deleted from the cart");
  }


  renderSummary() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
        <DropdownToggle nav caret>
          <img src={cart} alt="cart logo" height="30" />
        </DropdownToggle>
        <DropdownMenu
   
        >
          {this.props.cart.map((cartItem) => (
            
            <DropdownItem style={{ maxHeight: "300px"}} key={cartItem.product.id}>
             <Badge
              style={{marginRight:"0.5rem"}}
                id ="danger"
                color="danger"
                onClick={(event) => this.removeFromCart(event, cartItem.product)}
              >
                X
              </Badge>
              <span style={{ fontWeight: "bold" }}> {cartItem.product.productName.toUpperCase()}</span> - {cartItem.quantity} quantity
             
            </DropdownItem>
          ))}

          <DropdownMenu divider />
          <Link to="/cart" style={{ textDecoration: "none" }}>
          <DropdownItem style={{ backgroundColor: "green" , textAlign: "center", color: "white" }}>
          Go To Cart
          </DropdownItem>
          </Link>
        </DropdownMenu>
        </Dropdown>
    );
  }

  renderEmpty() {
    return (
      <NavItem onClick={this.toggleDropdown}>
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
    actions: {
      removeFromCart: bindActionCreators(cartAction.removeFromCart, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
