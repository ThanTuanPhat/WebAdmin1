import React, { useEffect, useState } from "react";
import "../Screen/UserManage.css";

const UserInfoCard = ({ user }) => {
  // Tạo chuỗi dấu * tương ứng với độ dài mật khẩu
  const hiddenPassword = '*'.repeat(user.password.length);
  return (
    <div className="user-card">
      <h2 className="text">{user.name}</h2>
      <p className="text">Email: <a href="#email" className="emailText">{user.email}</a> </p>
      <p className="text">Mật khẩu: {hiddenPassword}</p>
      <div className="bottomUserCard">
      <p className="text">SDT: {user.phone}</p>
      <p className="date">
        Ngày tạo: <span className="dateN">{new Date(user.createdAt).toLocaleDateString()}</span>
      </p>
      </div>
      
      <hr />
    </div>
  );
};

function UserManage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      const response = await fetch("http://localhost:6677/users/get-NewUsers");
      const result = await response.json();
      console.log(result.data);
      setUsers(result.data);
    };
    getNewUsers();
    return () => {};
  }, []);

  return (
    <div>
      <div className="table1-container">
        <h2>Người dùng mới</h2>
        <table className="table1">
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <UserInfoCard
                  className="UserInfoCard "
                  key={index}
                  user={user}
                />
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default UserManage;
