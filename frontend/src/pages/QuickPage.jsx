import React from "react";
import QuickSubscription from "../Components/subscriptions/QuickSubscription";

const QuickPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Subscription Management
          </h1>
          <p className="text-gray-600">
            Add new subscriptions to track which members watched which movies
          </p>
        </div>

        <QuickSubscription />
      </div>
    </div>
  );
};

export default QuickPage;
