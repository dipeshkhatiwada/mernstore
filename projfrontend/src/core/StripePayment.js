import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { emptyCart, loadCart } from './helper/carthelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { createOrder } from './helper/orderhelper';
const StripePayment = ({
    products,
    setReload=f=>f,
    reload=undefined
}) => {
    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getTotalAmount = ()=>{
        let amount = 0;
        products.map(p=>{
            amount = amount +p.price
        });
        return amount
    }


    const makePayment = token => {
        const body ={
            token,
            products
        };
        console.log("BODY",body);
        const headers = {
            "Contet-Type":"application/json"
        };
        return fetch(`${API}/stripe/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response=> {
            return console.log(response);
            // further call
        }).catch(error => console.log(error))
    };

    const ShowStripeButton = ()=>{
        return isAuthenticated() ?(
            <StripeCheckoutButton
            stripeKey="pk_test_jw8A2OaaBw4epmRByw075RJw00wJEEM9t8"
            token={makePayment}
            amount={getTotalAmount(products) * 100}
            name="Buy T-shirts"
            shippingAddress
            billingAddress
            >
                <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Sign in</button>
            </Link>

        )
    }


  return (
    <div>
        <h3 className="text-white">stripe Checkout {getTotalAmount()}</h3>
        {ShowStripeButton()}
    </div>
  );
}
export default StripePayment;
