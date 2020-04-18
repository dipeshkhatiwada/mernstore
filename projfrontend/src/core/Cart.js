import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/carthelper";
import StripePayment from "./StripePayment";
import BraintreePayment from "./BraintreePayment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h2>This section for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">
        {products.length > 0 ? (
            loadAllProducts()
          ):(
            <h3 className="bg bg-info">Please, Add to cart</h3>
          )}
        </div>
        <div className="col-6">
          {products.length > 0 ? (
            // <StripePayment products={products} setReload={setReload} />
            <BraintreePayment products={products} setReload={setReload} />
          ):(
            <h3 className="bg bg-info">Please, Add to cart</h3>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
