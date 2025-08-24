"use client";
import React, { useState, useEffect } from "react";
import { Search, Eye, Check, X, Loader2 } from "lucide-react";
import getClientsFromFirestore from "@/Firebase/admin-side/clients/getClientsFromFirestore";
import { verifyPayment } from "@/Firebase/admin-side/payment/verifyPayment";

const ClientAdmin = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [verifiedClients, setVerifiedClients] = useState(new Set());
  const [error, setError] = useState(null);
  const [verifyingReceipt, setVerifyingReceipt] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  // Fetch clients on component mount
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError(null);
        const clientsData = await getClientsFromFirestore();
        setClients(clientsData);
        setFilteredClients(clientsData);

        // Set verified clients
        const verified = new Set();
        clientsData.forEach(client => {
          if (client.isVerified) {
            verified.add(client.id);
          }
        });
        setVerifiedClients(verified);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError("Failed to load clients. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = clients.filter(
      client =>
        client.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phonenumber.includes(searchTerm),
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const handleVerify = async client => {
    try {
      setVerifyingReceipt(client.id);

      const amount = parseFloat(paymentAmount);
      if (!amount || amount <= 0) {
        setError("Please enter a valid payment amount");
        return;
      }

      const receiptData = {
        userId: client.phonenumber,
        fileName: client.fileName,
        receiptUrl: client.receiptUrl,
        amount: amount,
        fullname: client.fullname,
      };

      const result = await verifyPayment(receiptData);

      if (result.success) {
        setVerifiedClients(prev => new Set([...prev, client.id]));
        setSelectedReceipt(null);
        setPaymentAmount("");
        setError(null);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setError(`Failed to verify payment: ${error.message}`);
    } finally {
      setVerifyingReceipt(null);
    }
  };

  const openReceiptPreview = client => {
    setSelectedReceipt(client);
    setPaymentAmount("");
  };

  const closeReceiptPreview = () => {
    setSelectedReceipt(null);
    setPaymentAmount("");
  };

  const refreshClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const clientsData = await getClientsFromFirestore();
      setClients(clientsData);
      setFilteredClients(clientsData);
    } catch (err) {
      setError("Failed to refresh clients. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={refreshClients}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">CLIENTS</h1>
              <button
                onClick={refreshClients}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors">
                Refresh
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="SEARCH"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    NAME
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    NUMBER
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    PAYMENT
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    PROJECT STATUS
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClients.map((client, index) => (
                  <tr
                    key={client.id}
                    className={index % 2 === 0 ? "bg-yellow-50" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-600">
                            {client.fullname.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {client.fullname}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {client.phonenumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-col items-center space-y-2">
                        {verifiedClients.has(client.id) || client.isVerified ? (
                          <div className="flex flex-col items-center">
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                              VERIFIED
                            </div>
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-1">
                            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              RECEIPT UPLOADED
                            </div>
                            <button
                              onClick={() => openReceiptPreview(client)}
                              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200 flex items-center space-x-2">
                              <Eye className="h-4 w-4" />
                              <span>VERIFY</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-xs text-gray-400 bg-gray-100 px-3 py-2 rounded">
                        Future Use
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-xs text-gray-400 bg-gray-100 px-3 py-2 rounded">
                        Future Use
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClients.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-500">
                {searchTerm
                  ? "No clients found matching your search criteria"
                  : "No clients found with payment receipts"}
              </p>
            </div>
          )}
        </div>

        {/* Total Count */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Total Clients:{" "}
            <span className="font-semibold">{filteredClients.length}</span>
          </p>
        </div>
      </div>

      {/* Receipt Preview Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Payment Receipt - {selectedReceipt.fullname}
              </h3>
              <button
                onClick={closeReceiptPreview}
                className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4">
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <img
                  src={selectedReceipt.receiptUrl}
                  alt="Payment Receipt"
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="text-sm text-gray-600 mb-4">
                <p>
                  <strong>File:</strong> {selectedReceipt.fileName}
                </p>
                {selectedReceipt.receiptCount > 1 && (
                  <p>
                    <strong>Total Receipts:</strong>{" "}
                    {selectedReceipt.receiptCount}
                  </p>
                )}
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount (PKR)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(e.target.value)}
                  placeholder="Enter payment amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleVerify(selectedReceipt)}
                  disabled={verifyingReceipt === selectedReceipt.id}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  {verifyingReceipt === selectedReceipt.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Verify Payment</span>
                    </>
                  )}
                </button>
                <button
                  onClick={closeReceiptPreview}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                  Close
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 border-t border-red-200">
                <p className="text-red-600 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 text-sm underline mt-2">
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientAdmin;
