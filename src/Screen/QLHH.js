// QLHH.js
import React from 'react';
import './QLHH.css'; // Optional: for custom styling

const QLHH = () => {
  const orders = [
    {
      email: "phat124@gmail.com",
      product: "Bắp cải trắng",
      category: "Rau củ",
      unitPrice: "19,000đ",
      deliveryMethod: "Nhanh",
      orderStatus: "Chờ xác nhận",
      totalProductPrice: "19,000đ",
      totalPayment: "29,000đ"
    },
    {
      email: "naynhan@gmail.com",
      product: "Bắp cải trắng",
      category: "Rau củ",
      unitPrice: "19,000đ",
      deliveryMethod: "Nhanh",
      orderStatus: "Hoàn thành",
      totalProductPrice: "19,000đ",
      totalPayment: "29,000đ"
    },
    {
      email: "abc@gmail.com",
      product: "Bắp cải trắng",
      category: "Rau củ",
      unitPrice: "19,000đ",
      deliveryMethod: "Nhanh",
      orderStatus: "Đã hủy",
      totalProductPrice: "19,000đ",
      totalPayment: "29,000đ"
    },
    // Add more orders as needed
  ];

  return (
    <div className="qlhh-container">
      <table className="order-table">
        <thead>
          <tr>
            <th>Email người dùng</th>
            <th>Sản phẩm</th>
            <th>Danh mục</th>
            <th>Đơn giá</th>
            <th>Hình thức giao</th>
            <th>Trạng thái đơn hàng</th>
            <th>Tổng tiền SP</th>
            <th>Tổng thanh toán</th>
  
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.email}</td>
              <td>{order.product}</td>
              <td>{order.category}</td>
              <td>{order.unitPrice}</td>
              <td style={{ color: order.deliveryMethod === "Nhanh" ? "red" : "black" }}>{order.deliveryMethod}</td>
              <td style={{ color: getOrderStatusColor(order.orderStatus) }}>{order.orderStatus}</td>
              <td>{order.totalProductPrice}</td>
              <td>{order.totalPayment}

              <td>
                <button className="details-button">Chi tiết</button>
              </td>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getOrderStatusColor = (status) => {
  switch (status) {
    case "Chờ xác nhận":
      return "orange";
    case "Hoàn thành":
      return "blue";
    case "Đang vận chuyển":
      return "green";
    case "Đã hủy":
      return "red";
    default:
      return "black";
  }
};

export default QLHH;
