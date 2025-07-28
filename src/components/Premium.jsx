import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      {
        withCredentials: true,
      }
    );


    const {amount,keyId,orderId,notes,currency,} = order.data;

    var options = {
      key:keyId, 
      amount, 
      currency,
      name: "Dev Tinder", //your business name
      description: "Connect to other Developers",
      order_id: orderId, 
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email:notes.emailId,
        contact: "+919876543210", //Provide the customer's phone number for better conversion rates
      },
      theme: {
        color: "#3399cc",
      },
    };

    //it should open the Razorpay Dailouge box
    var rzp1 = new window.Razorpay(options); // this Razorpay is come from index.html script , thats why we need add window
    rzp1.open(); // this open the razorpay dailog box
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">
        Choose Your Premium Plan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Silver Plan */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border-2 border-gray-300 hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Silver Plan
          </h2>
          <p className="text-gray-600 mb-4">
            Perfect for getting started with exclusive features.
          </p>
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>✅ 10 Premium Connections</li>
            <li>✅ Priority Matching</li>
            <li>✅ Weekly Insights</li>
          </ul>
          <div className="text-3xl font-bold text-indigo-600 mb-4">
            ₹299/month
          </div>
          <button
            onClick={() => {
              handleBuyClick("silver");
            }}
            className="bg-indigo-100 cursor-pointer text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-200 transition"
          >
            Choose Silver
          </button>
        </div>

        {/* Gold Plan */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border-2 border-yellow-400 hover:scale-105 transition-all duration-300">
          <h2 className="text-2xl font-semibold text-yellow-700 mb-4">
            Gold Plan
          </h2>
          <p className="text-gray-600 mb-4">
            Best for active developers seeking premium reach.
          </p>
          <ul className="text-gray-700 space-y-2 mb-6">
            <li>🌟 Unlimited Premium Connections</li>
            <li>🌟 Top Profile Boost</li>
            <li>🌟 Personalized Matching</li>
            <li>🌟 Weekly Insights + Resume Review</li>
          </ul>
          <div className="text-3xl font-bold text-yellow-600 mb-4">
            ₹599/month
          </div>
          <button
            onClick={() => {
              handleBuyClick("gold");
            }}
            className="bg-yellow-100 text-yellow-800 cursor-pointer px-4 py-2 rounded-lg font-medium hover:bg-yellow-200 transition"
          >
            Choose Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
