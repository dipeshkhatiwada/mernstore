import React from 'react';
import Imagehelper from './helper/Imagehelper';

const Card = ({product, addToCart = true, removeFromCart=false}) => {
    
    const cardTitle = product ? product.name:"A tshirt store"
    const cardDescription = product ? product.description:"A tshirt description"
    const cardPrice = product ? product.price:"NULL"
    
    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <div className="col-12">
                <button
                onClick={() => {}}
                className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                Add to Cart
                </button>
            </div>
            )
        )
    }
    const ShowRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <div className="col-12">
                    <button
                    onClick={() => {}}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                    >
                    Remove from cart
                    </button>
                </div>
            )
        )
    }
    return (
        <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
            <Imagehelper product={product} />
            <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
            </p>
            <p className="btn btn-success rounded  btn-sm px-4">Rs. {cardPrice}</p>
            <div className="row">
            {showAddToCart(addToCart)}
            {ShowRemoveFromCart(removeFromCart)}
            </div>
        </div>
        </div>
    );
};
export default Card