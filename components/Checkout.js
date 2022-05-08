import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CardIcon from "./images/credit-card.svg";
import ProductImage from "./images/product-image.jpg";

import CheckoutStyle from "../styles/stylesCheck.module.css";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51KwvgQJzoW9zA9ZABORWbiw2NExGzCagTBgOGTA2HgtyqteyjF47CeUF6AL3w88AYJ0xYfk5K0ZaUHo8QRKb2uoE00pYLMmPZE");
  }

  return stripePromise;
};

const Checkout = () => {
  const [isLoading, setLoading] = useState(false);
  const [stripeError, setStripeError] = useState(null);

  const item = {
    price: "price_1Kww1YJzoW9zA9ZA1r61B1Ig",
    quantity: 1
  };

  const checkoutOption = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOption);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };
  if (stripeError) alert(stripeError);

  return (
    <div className={CheckoutStyle.checkout}>
      <h1>Stripe Checkout</h1>
      <p className={CheckoutStyle.checkoutTitle}>Giulio Gomes</p>
      {/* <p className="checkout-description">
        Learn how to build a website with React Hooks
      </p> */}
      <h1 className={CheckoutStyle.checkoutPrice}>$19</h1>
      <img
        className={CheckoutStyle.checkoutProductImage}
        src={ProductImage}
        alt="Product"
      />
      <button
        className={CheckoutStyle.checkoutButton}
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className={CheckoutStyle.greyCircle}>
          <div className={CheckoutStyle.purpleCircle}>
            <img className={CheckoutStyle.icon} src={CardIcon} alt="credit-card-icon" />
          </div>
        </div>
        <div className={CheckoutStyle.textContainer}>
          <p className={CheckoutStyle.text}>{isLoading ? "Loading..." : "Buy"}</p>
        </div>
      </button>
    </div>
  );
};

export default Checkout;
