import { useLocation } from "react-router-dom";

function Invoice() {
  const location = useLocation();
  const order = location.state?.order; // Access the order passed from the previous page

  if (!order) {
    return <div>No order details available</div>;
  }

  // Check if order.items exists or fallback to empty array
  const items = order.items || [];
  console.log(items);

  return (
    <div className="max-w-4xl mx-auto p-8 border border-gray-300 shadow-md">
      {/* Invoice Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invoice</h1>
        <div className="text-right">
          <p className="text-lg font-semibold">Order ID: {order.orderId}</p>
          <p className="text-gray-600">
            Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <p className="border p-2">
          {order.paymentMethod ? "Offline" : "Online"}
        </p>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Product Name</th>
              <th className="border px-4 py-2 text-left">Quantity</th>
              <th className="border px-4 py-2 text-left">Unit Price</th>
              <th className="border px-4 py-2 text-left">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {item.product?.title || "Unknown Product"}
                  </td>
                  <td className="border px-4 py-2">{item.quantity || 0}</td>
                  <td className="border px-4 py-2">
                    ₹{item.product?.discountPrice || 0}
                  </td>
                  <td className="border px-4 py-2">
                    ₹{item.quantity * item.product?.discountPrice || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No items available for this order.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="text-right">
        <h3 className="text-xl font-semibold">Total Amount</h3>
        <p className="text-2xl font-bold">₹{order.totalAmount || 0}</p>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-600 italic">
        <p>Thank you for your purchase!</p>
        <p>
          If you have any questions, please contact us at support@techdukaan.com
        </p>
      </div>
    </div>
  );
}

export default Invoice;
