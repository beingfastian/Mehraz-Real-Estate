"use client"
import React, { useState } from "react";
// import { Tabs, TabList, TabPanel, Tab } from "react-tabs";


const Waitingtime = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <div className="absolute top-20 right-0   flex flex-col-reverse w-full h-[calc(100vh-5rem)] bg-[#F9FAFC] ">
      <div className="flex bg-[#242424] w-full flex-row justify-center px-4 pt-1  border-b">
        <button
          className={
            
            ` ${tabIndex === 0
              ? "border-b-2 border-[#2F2F2F] py-2 px-4 text-[#2F2F2F] font-semibold bg-[#eecd8d]"
              : "py-2 px-4 text-white font-semibold"} min-w-48 h-12 flex items-center justify-center`
              
          }
          onClick={() => setTabIndex(0)}
        >
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 5H7M5 8a2 2 0 01-2 2v12a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2h-3.5m-4.5 2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-3.5m-4.5 2H9"
            />
          </svg>
          Chat
        </button>
        <button
          className={
            ` ${tabIndex === 1
                ? "border-b-2 border-[#2F2F2F] py-2 px-4 text-[#2F2F2F] font-semibold bg-[#eecd8d]"
                : "py-2 px-4 text-white font-semibold"} min-w-48 h-12 flex items-center justify-center`
          }
          onClick={() => setTabIndex(1)}
        >
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 8v12a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2zm0 2a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0-4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            />
          </svg>
          Payment
        </button>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {tabIndex === 0 && <Chat />}
        {tabIndex === 1 && <PleaseWait />}
      </div>
    </div>
  );
};

export default Waitingtime;


function Chat() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-4 p-4">
          <div className="bg-gray-200 p-4 rounded-md">
            <p className="text-lg">Hello, I need assistance with my project.</p>
          </div>
          <div className="bg-gray-200 p-4 rounded-md">
            <p className="text-lg">Of course, I'd be happy to help you with your project.</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <input type="text" className="w-full px-4 py-2 rounded-md" placeholder="Type a message..." />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Send</button>
      </div>
    </div>
  );
}

function Payment() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col space-y-4 p-4">
          <p className="text-lg">Please select a payment method:</p>
          <div className="flex items-center space-x-4">
            <input type="radio" id="bank-transfer" name="payment" value="bank-transfer" />
            <label htmlFor="bank-transfer">Bank Transfer</label>
          </div>
          <div className="flex items-center space-x-4">
            <input type="radio" id="credit-card" name="payment" value="credit-card" />
            <label htmlFor="credit-card">Credit Card</label>
          </div>
          <div className="flex items-center space-x-4">
            <input type="radio" id="paypal" name="payment" value="paypal" />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Make Payment</button>
      </div>
    </div>
  );
}


function PleaseWait() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-2xl text-center capitalize text-gray-700">
        <strong>Kindly Wait a little</strong>, <br/> 
        
        Architects are seeing your requirements <br/> and responding accordingly asap...
      </p>
      <span className="text-sm mt-2 text-gray-500 capitalize">
        We will notify you as Architects respond
      </span>
    </div>
  );
}

