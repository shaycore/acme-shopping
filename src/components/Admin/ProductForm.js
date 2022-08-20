import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct } from '../../store';

class ProductForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            type: '',
            description: '',
            size: '',
            color: '',
            image: '',
            price: ''
        }
        this.save = this.save.bind(this);
    }
    componentDidMount() {
        this.el.addEventListener('change', ev => {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ image: reader.result });
            })
            reader.readAsDataURL(file);
        })
    }
    save(ev) {
        ev.preventDefault();
        const newProduct = {
            name: this.state.name,
            type: this.state.type,
            description: this.state.description,
            size: this.state.size,
            color: this.state.color,
            image: this.state.image,
            price: this.state.price
        };
        this.props.create(newProduct);
    }
    render() {
        const { image, name, type, description, size, color, price } = this.state;
        const { save } = this;
        return (
            <form onSubmit={ save }>
                <img src={ image || null } style={{ height: 100, width: 100 }} /><br />
                <input type='file' ref={ el => this.el = el }/><br />
                <input placeholder='Name' value={ name } onChange={ ev => this.setState({ name: ev.target.value })}></input><br />
                <input placeholder='Type' value={ type } onChange={ ev => this.setState({ type: ev.target.value })}></input><br />
                <textarea placeholder='Description' value={ description } onChange={ ev => this.setState({ description: ev.target.value })}></textarea><br />
                <input placeholder='Size' value={ size } onChange={ ev => this.setState({ size: ev.target.value })}></input><br />
                <input placeholder='Color' value={ color } onChange={ ev => this.setState({ color: ev.target.value })}></input><br />
                <input placeholder='Price' value={ price } onChange={ ev => this.setState({ price: ev.target.value })}></input><br />
                <button disabled={ !name || !type || !description || !size || !color || !price }>Create</button>
            </form>
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: (product) => dispatch(createProduct(product))
    }
}

export default connect(null, mapDispatchToProps)(ProductForm);