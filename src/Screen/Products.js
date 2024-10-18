
import React, { useEffect, useState } from "react";
import filter from "../assets/images/filter.png";
import "../Screen/Products.css";
import insert from "../assets/images/insert.png";
import tick from "../assets/images/tick.png";
import deleteimg from "../assets/images/delete.png";
function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        "http://localhost:6677/products/getProducts"
      );
      const result = await response.json();
      console.log(result.data);
      setProducts(result.data);
    };
    getProducts();
    return () => {};
  }, []);

  return (
    <div>
      <div className="headers">
        <img className="filter-icon" src={filter} alt="icon" />
      </div>
      <div>
        <table border={1}  cellPadding="10" cellSpacing="0" >
          <thead>
            <tr>
              <th></th>
              <th>Hình ảnh</th>
              <th>Danh mục</th>
              <th>Tên sản phẩm</th>
              <th>Đơn vị đo</th>
              <th>Giá tiền</th>
              <th>Mô tả</th>
              <th>Xuất xứ</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <tr className="table" key={index}>
                  
                  <td className="cube1">
                    <div className="cube1-container">
                    <img className="tick" src={tick} alt="tick"/>
                    </div>
                   
                  </td>
                  <td className="cube"></td>
                  {/* <td className="cube">{item.images}</td> */}
                  <td className="cube">{item.category}</td>
                  <td className="cubeN">{item.name}</td>
                  <td className="cube">{item.oum}</td>
                  <td className="cube">{item.price}</td>
                  <td className="cubeST">{item.description}</td>
                  <td className="cube">{item.origin}</td>
                  <td className="cubeF" >
                    <div className="btn-container">
                    <div className="insert-button">
                      <img className="insertimg" src={insert} alt="insert"/>
                    </div>
                    <div className="delete-button">
                      <img className="deleteimg" src={deleteimg} alt="delete"/>
                    </div>
                    </div>
                    
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
