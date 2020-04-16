import React,{useState,useEffect} from 'react';
import Imagehelper from './helper/Imagehelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeCart } from './helper/cardhelper';

const Card = ({
    product,
    addToCart = true,
    removeFromCart=false,
    setReload= f =>f,
    // function (f) {return f}
    reload=undefined
}) => {
    
    const cardTitle = product ? product.name:"A tshirt store"
    const cardDescription = product ? product.description:"A tshirt description"
    const cardPrice = product ? product.price:"NULL"
    
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count)

    const addToCarts = ()=>{
        addItemToCart(product,()=>setRedirect(true))
    }

    const getRedirect = (redirect)=>{
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (addToCart) => {
        return (
            addToCart && (
                <div className="col-12">
                <button
                onClick={addToCarts}
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
                    onClick={() => {
                        removeCart(product._id)
                        setReload(!reload)
                    }}
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
            {getRedirect(redirect)}
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