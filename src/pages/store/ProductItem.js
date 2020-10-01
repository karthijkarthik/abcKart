import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CartContext } from '../../contexts/CartContext';
import styles from './ProductsGrid.module.css';

const ProductItem = ({product}) => {

    const { addProduct, cartItems, increase } = useContext(CartContext);
    const { id, photo, name, price } = product;

    const isInCart = product => {
        return !!cartItems.find(item => item.id === id);
    }

    return ( 
        <div className={`${styles.item} card card-body border-0`}>
            <img style={{display: "block", margin: "0 auto 10px", maxHeight: "200px"}} className="img-fluid" 
            src={photo} alt=""/>
            <p>{name}</p>
            <h3 className="text-left">₹{price}</h3>
            <div className="text-right">
                <Link  to="/" className="btn btn-link btn-sm mr-2">Details</Link>
                {
                    isInCart(product) && 
                    <button 
                    onClick={() => increase(product)}
                    className="btn btn-outline-primary btn-sm">Add more</button>
                }
                {
                    !isInCart(product) && 
                    <button 
                    onClick={() => addProduct(product)}
                    className="btn btn-primary btn-sm">Add to cart</button>
                }
                
            </div>
        </div>
     );
}

ProductItem.propTypes = {
    product: PropTypes.object
}
 
export default ProductItem;