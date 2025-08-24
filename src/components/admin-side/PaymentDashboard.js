"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  Filter,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Loader2,
  X,
} from "lucide-react";
import { getVerifiedPayments } from "@/Firebase/admin-side/payment/verifyPayment";

const PaymentDashboard = () => {
  const [verifiedPayments, setVerifiedPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");

  // Fetch verified payments on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError(null);
        const paymentsData = await getVerifiedPayments();
        setVerifiedPayments(paymentsData);
        setFilteredPayments(paymentsData);
      } catch (err) {
        console.error("Error fetching verified payments:", err);
        setError("Failed to load verified payments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Filter functionality
  useEffect(() => {
    let filtered = verifiedPayments;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        payment =>
          payment.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.userId.includes(searchTerm) ||
          payment.fileName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Project type filter
    if (selectedProjectType !== "all") {
      filtered = filtered.filter(
        payment => payment.projectType === selectedProjectType,
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "today":
          filterDate.setDate(now.getDate());
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        default:
          break;
      }

      filtered = filtered.filter(payment => payment.verifiedAt >= filterDate);
    }

    setFilteredPayments(filtered);
  }, [searchTerm, selectedProjectType, dateFilter, verifiedPayments]);

  // Calculate statistics
  const stats = {
    totalPayments: filteredPayments.length,
    totalAmount: filteredPayments.reduce(
      (sum, payment) => sum + (payment.amount || 0),
      0,
    ),
    fastHomesPayments: filteredPayments.filter(
      p => p.projectType === "fast-homes",
    ).length,
    highCustomPayments: filteredPayments.filter(
      p => p.projectType === "high-custom",
    ).length,
    fastHomesAmount: filteredPayments
      .filter(p => p.projectType === "fast-homes")
      .reduce((sum, payment) => sum + (payment.amount || 0), 0),
    highCustomAmount: filteredPayments
      .filter(p => p.projectType === "high-custom")
      .reduce((sum, payment) => sum + (payment.amount || 0), 0),
  };

  const formatDate = date => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const refreshPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const paymentsData = await getVerifiedPayments();
      setVerifiedPayments(paymentsData);
      setFilteredPayments(paymentsData);
    } catch (err) {
      setError("Failed to refresh payments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openPaymentDetails = payment => {
    setSelectedPayment(payment);
  };

  const closePaymentDetails = () => {
    setSelectedPayment(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading payment dashboard...</p>
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
              onClick={refreshPayments}
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                PAYMENT DASHBOARD
              </h1>
              <button
                onClick={refreshPayments}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors">
                Refresh
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 mb-2" />
                <div className="ml-3">
                  <p className="text-blue-100 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold">
                    PKR {stats.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
              <div className="flex items-center">
                <Users className="h-8 w-8 mb-2" />
                <div className="ml-3">
                  <p className="text-green-100 text-sm">Total Payments</p>
                  <p className="text-2xl font-bold">{stats.totalPayments}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 mb-2" />
                <div className="ml-3">
                  <p className="text-purple-100 text-sm">Fast Homes</p>
                  <p className="text-xl font-bold">
                    {stats.fastHomesPayments} payments
                  </p>
                  <p className="text-sm">
                    PKR {stats.fastHomesAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 mb-2" />
                <div className="ml-3">
                  <p className="text-orange-100 text-sm">High Custom</p>
                  <p className="text-xl font-bold">
                    {stats.highCustomPayments} payments
                  </p>
                  <p className="text-sm">
                    PKR {stats.highCustomAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filters:
              </span>
            </div>

            <select
              value={selectedProjectType}
              onChange={e => setSelectedProjectType(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="all">All Projects</option>
              <option value="fast-homes">Fast Homes</option>
              <option value="high-custom">High Custom</option>
            </select>

            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    CLIENT
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    PROJECT TYPE
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    AMOUNT
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    VERIFIED DATE
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    RECEIPT
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPayments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={index % 2 === 0 ? "bg-green-50" : "bg-white"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-gray-600">
                            {payment.fullname.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {payment.fullname}
                          </div>
                          <div className="text-sm text-gray-500">
                            {payment.userId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          payment.projectType === "fast-homes"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                        }`}>
                        {payment.projectType === "fast-homes"
                          ? "Fast Homes"
                          : "High Custom"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm font-bold text-green-600">
                        PKR {payment.amount?.toLocaleString() || "0"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-900">
                          {formatDate(payment.verifiedAt)}
                        </div>
                        <div className="text-xs text-gray-500">
                          by {payment.verifiedBy}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {payment.fileName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => openPaymentDetails(payment)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200 flex items-center space-x-1 mx-auto">
                        <Eye className="h-3 w-3" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <DollarSign className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-gray-500">
                {searchTerm ||
                selectedProjectType !== "all" ||
                dateFilter !== "all"
                  ? "No payments found matching your filters"
                  : "No verified payments found"}
              </p>
            </div>
          )}
        </div>

        {/* Total Count */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredPayments.length}</span> of{" "}
            <span className="font-semibold">{verifiedPayments.length}</span>{" "}
            verified payments
          </p>
        </div>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Payment Details
              </h3>
              <button
                onClick={closePaymentDetails}
                className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Client Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Client Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium ml-2">
                      {selectedPayment.fullname}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium ml-2">
                      {selectedPayment.userId}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Project Type:</span>
                    <span className="font-medium ml-2 capitalize">
                      {selectedPayment.projectType}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold ml-2 text-green-600">
                      PKR {selectedPayment.amount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Payment Information
                </h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Receipt File:</span>
                    <span className="font-medium ml-2">
                      {selectedPayment.fileName}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Verified Date:</span>
                    <span className="font-medium ml-2">
                      {formatDate(selectedPayment.verifiedAt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Verified By:</span>
                    <span className="font-medium ml-2">
                      {selectedPayment.verifiedBy}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Receipt Preview */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Receipt Preview
                </h4>
                <div className="bg-gray-100 rounded-lg p-4">
                  <img
                    src={selectedPayment.receiptUrl}
                    alt="Payment Receipt"
                    className="w-full h-auto rounded-lg max-h-96 object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={closePaymentDetails}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDashboard;
