import React, {useState, useEffect} from 'react';
import "../styles.css";
import Base from "./Base";
import { loadCart, addItemToCart } from './helper/cardhelper';
import Card from './Card';

const Cart = () => {

  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

 useEffect(() => {
   setProducts(loadCart())
 }, [reload]);

  const loadAllProducts =products=>{
      return(
          <div>
              <h2>for loading product</h2>
              {products.map((product,index) =>(
                    <Card
                    key={index}
                    product={product}
                    removeFromCart={true}
                    addToCart={false}
                    setReload={setReload}
                    reload={reload}
                    />  
                ))}
          </div>
      )
  }
  const loadCheckout =()=>{
    return(
        <div>
            <h2>for loading Checkout</h2>
        </div>
    )
  }
  return (
    <Base title="Cart Page" description="Ready to checkout">
          {/* <h1 className="text-white"> ALl Tshorts</h1> */}
        <div className="row  text-center">
            <div className="col-6">{loadAllProducts(products)}</div>
            <div className="col-6">{loadCheckout()}</div>
        </div>
    </Base>
  );
};
export default Cart;
