import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class _Product extends Component {
    constructor(){
        super();
        this.state = {
            product: {},
            quantity: 1
        };
    }
    componentDidMount(){
        this.setState({
            product: this.props.product
        })
    }
    componentDidUpdate(prevProps){
        if(!prevProps.product.id && this.props.product.id) {
            this.setState({
                product: this.props.product
            })
        }
    }
    changeQty = (type) => {
        if(type==='increment') {
            this.setState({quantity: this.state.quantity + 1})
        } else if (type==='decrement') {
            if (this.state.quantity > 1) {
                this.setState({quantity: this.state.quantity - 1})
            } 
        }
    }
    render(){
        const { product } = this.state;
        const { changeQty } = this;
        return (
            <div id='product'>
                <Link to={'/products/'}>Return to All Products</Link>
                <br />
                <img src={ product.image } alt='Product Image' />
                <ul>
                    <li>{ product.name }</li>
                    <li>Type: { product.type }</li>
                    <li>Description: { product.description }</li>
                    <li>Price: ${ product.price }</li>
                    <li>Size: { product.size }</li>
                    <li>Color: { product.color }</li>
                    <li>Rating: { product.rating }</li>

                </ul>
                <button onClick={()=>{ changeQty('decrement') }}>-</button>
                <button onClick={()=>{ changeQty('increment') }}>+</button>

                 Quantity: {this.state.quantity} 
                <br />
                <button>Add to Cart</button>
                <button>Add to Wishlist</button>
            </div>
        );
    }
}

const mapState = ({ products }, ownProps) => {
    const id = ownProps.match.params.id;
    const product = products.find( product => product.id === id*1) || {};
    return {
        product
    };
};

const Product = connect(mapState)(_Product);

export default Product;