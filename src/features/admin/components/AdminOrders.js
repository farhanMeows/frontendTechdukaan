import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});
  // Inside AdminOrders component
  const navigate = useNavigate();

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = (order) => {
    // console.log(order.item.orderId);

    navigate(`/invoice/${order.orderId}`, { state: { order } }); // Navigate with the specific item
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-300 text-purple-800";
      case "dispatched":
        return "bg-yellow-300 text-yellow-800";
      case "delivered":
        return "bg-green-300 text-green-800";
      case "received":
        return "bg-green-300 text-green-800";
      case "cancelled":
        return "bg-red-300 text-red-800";
      default:
        return "bg-purple-300 text-purple-800";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto">
        <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <table className="w-full table-auto text-white">
            <thead>
              <tr className="bg-gray-700 text-gray-200 uppercase text-sm leading-normal">
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={(e) =>
                    handleSort({
                      sort: "id",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  Order#
                  {sort._sort === "id" &&
                    (sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline" />
                    ))}
                </th>
                <th className="py-3 px-4 text-left">Items</th>
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={(e) =>
                    handleSort({
                      sort: "totalAmount",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  Total Amount
                  {sort._sort === "totalAmount" &&
                    (sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline" />
                    ))}
                </th>
                <th className="py-3 px-4 text-center">Shipping Address</th>
                <th className="py-3 px-4 text-center">Order Status</th>
                <th className="py-3 px-4 text-center">Payment Method</th>
                <th className="py-3 px-4 text-center">Payment Status</th>
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={(e) =>
                    handleSort({
                      sort: "createdAt",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  Order Time
                  {sort._sort === "createdAt" &&
                    (sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline" />
                    ))}
                </th>
                <th
                  className="py-3 px-4 text-left cursor-pointer"
                  onClick={(e) =>
                    handleSort({
                      sort: "updatedAt",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  Last Updated
                  {sort._sort === "updatedAt" &&
                    (sort._order === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4 inline" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline" />
                    ))}
                </th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-200 text-sm font-light">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-600 hover:bg-gray-700 transition duration-150"
                >
                  <td className="py-3 px-4 text-left">
                    <div className="flex items-center">
                      <span className="font-medium">{order.orderId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-left">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-2">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={item.product.thumbnail}
                            alt={item.product.title}
                          />
                        </div>
                        <span>
                          {item.product.title} - #{item.quantity} - ₹
                          {item.product.discountPrice}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 text-center">
                    ₹{order.totalAmount}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="">
                      <div>
                        <strong>{order.selectedAddress.name}</strong>,
                      </div>
                      <div>{order.selectedAddress.street},</div>
                      <div>{order.selectedAddress.city},</div>
                      <div>{order.selectedAddress.state},</div>
                      <div>{order.selectedAddress.pinCode},</div>
                      <div>{order.selectedAddress.phone}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {order.id === editableOrderId ? (
                      <select
                        onChange={(e) => handleOrderStatus(e, order)}
                        className="bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                      >
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span
                        className={`${chooseColor(
                          order.status
                        )} py-1 px-3 rounded-full text-xs`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {order.paymentMethod}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {order.id === editableOrderId ? (
                      <select
                        onChange={(e) => handleOrderPaymentStatus(e, order)}
                        className="bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                      >
                        <option value="pending">Pending</option>
                        <option value="received">Received</option>
                      </select>
                    ) : (
                      <span
                        className={`${chooseColor(
                          order.paymentStatus
                        )} py-1 px-3 rounded-full text-xs`}
                      >
                        {order.paymentStatus}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : null}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {order.updatedAt
                      ? new Date(order.updatedAt).toLocaleString()
                      : null}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <div className="flex item-center justify-center">
                      <div className="w-6 ml-2 transform hover:text-purple-400 hover:scale-110 transition duration-150">
                        <EyeIcon
                          className="w-6 h-6"
                          onClick={() => handleShow(order)} // Pass the specific item here
                        />
                      </div>
                      <div className="w-6 ml-2 transform hover:text-purple-400 hover:scale-110 transition duration-150">
                        <PencilIcon
                          className="w-6 h-6"
                          onClick={(e) => handleEdit(order)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      />
    </div>
  );
}

export default AdminOrders;
