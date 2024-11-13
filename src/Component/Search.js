import React from "react";
import { Input } from "antd";
import "./Search.css";
import bell from "../assets/images/bell.png";
import mail from "../assets/images/mail.png";

const { Search } = Input;  

function SearchComponent() {  
  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  return (
    <div className="search-component">
      <Search
        className="search-inside"
        placeholder="Nhập để tìm kiếm..."
        onSearch={handleSearch  }
        style={{ border: "none", boxShadow: "none" }}
      />
      <div className="icon-component">
        <img className="bell-icon" src={bell} alt="bell" />
        <img className="mail-icon" src={mail} alt="mail" />
      </div>
    </div>
  );
}

export default SearchComponent;
