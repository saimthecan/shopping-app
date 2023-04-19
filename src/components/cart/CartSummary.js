import React, { Component } from "react";
import {
  Badge,
  UncontrolledDropdown,
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
      <UncontrolledDropdown nav isOpen={this.state.dropdownOpen}>
        <DropdownToggle nav caret onClick={this.toggleDropdown}>
          <img src={cart} alt="cart logo" height="30" />
        </DropdownToggle>
        <DropdownMenu
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            width: "auto",
            position: "absolute",
            zIndex: 1000,
          }}
        >
          {this.props.cart.map((cartItem) => (
            <DropdownItem style={{ maxHeight: "300px" }} key={cartItem.product.id}>
              <Badge
                color="danger"
                onClick={(event) => this.removeFromCart(event, cartItem.product)}
              >
                X
              </Badge>
              {cartItem.product.productName}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>
            <Link to={"/cart"}>Go To Cart</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
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
