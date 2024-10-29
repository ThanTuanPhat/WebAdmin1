import React from 'react';
import './QLHH.css'; 
import back from "../assets/images/back.png"
import bapcai from "../assets/images/bapcai.png"

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
      deliveryMethod: "Chậm",
      orderStatus: "Đã hủy",
      totalProductPrice: "19,000đ",
      totalPayment: "29,000đ"
    },
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
              <td style={{color:'blue'}}>{order.email}</td>
              <td className='div-nameImage'>
                <img className='div-image' src={bapcai} alt='"'/>  
              {/* image hình ảnh */}
              <div>{order.product}</div>
              </td>
             
              <td style={{textAlign:'center'}}>{order.category}</td>
              <td style={{textAlign:'center'}}>{order.unitPrice}</td>
              <td style={{ color: order.deliveryMethod === "Nhanh" ? "red" : "black" ,textAlign:'center'}}>{order.deliveryMethod}</td>
              <td style={{ color: getOrderStatusColor(order.orderStatus),textAlign:'center' }}>{order.orderStatus}</td>
              <td style={{textAlign:'center'}}>{order.totalProductPrice}</td>
              <td className="total-payment-cell">
                <div className="total-payment-text">{order.totalPayment}</div>
                <div className='detail_image'>
                <button className="details-button">Chi tiết

                <img className="icon-back" src={back} alt="" />
                {/* image buton */}
                </button>
                
                </div>
               
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
