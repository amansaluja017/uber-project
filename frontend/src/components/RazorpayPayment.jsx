import React, { useState } from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RazorpayPayment = () => {
  const navigate = useNavigate();

  const { messages } = useSelector(state => state.socket);
  const handlePayment = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/payments/create-payment`, {
        amount: messages[0].fare,
        currency: "INR",
        receipt: "receipt_1",
      }, { withCredentials: true });

      const order = response.data.data;

      const api_key = import.meta.env.VITE_ROZARPAY_TEST_API_KEY

      const options = {
        key: api_key,
        amount: order.amount,
        currency: order.currency,
        name: "Uber clone",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/payments/verify-payment`, {
              rideId: messages[0]._id,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }, { withCredentials: true });

            if (verifyResponse.status === 200) {
              navigate('/home', {state: true});
              const successMessage = document.createElement('div');
              successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out flex items-center';
              successMessage.innerHTML = `
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="font-semibold">Payment Successful!</span>
                `;
              document.body.appendChild(successMessage);
              setTimeout(() => {
                successMessage.remove();
              }, 3000);
            } else {
              alert("Payment verification failed!");
            }
          } catch (error) {
            console.error("Verification failed", error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out flex items-center';
            errorMessage.innerHTML = `
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span class="font-semibold">Payment Failed! Please try again.</span>
            `;
            document.body.appendChild(errorMessage);
            setTimeout(() => {
              errorMessage.remove();
            }, 3000);
          }
        },
        prefill: {
          name: "aman",
          email: "amansaluja017@gmail.com",
          contact: "9306234357",
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Payment Details</h2>
        <div className="mb-6">
          <p className="text-gray-600 mb-2">Amount to Pay:</p>
          <p className="text-3xl font-bold text-gray-800">₹{messages[0].fare}</p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <span>Pay Now</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <p className="text-sm text-gray-500 mt-4 text-center">Secured by Razorpay</p>
      </div>
    </div>
  );
};

export default RazorpayPayment;
