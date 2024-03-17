import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { getFunctions, httpsCallable } from "@firebase/functions";
import { app } from "./firebase";
const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

export const loadCheckout = async (priceId) => {
  try {
    const snapshot = await createCheckoutSession(payments, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    window.location.assign(snapshot.url);
  } catch (error) {
    console.error("error creating checkout session", error);
  }
};

export default payments;
