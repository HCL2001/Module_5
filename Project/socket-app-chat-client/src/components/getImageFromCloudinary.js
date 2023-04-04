import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component UserList: dùng để truy xuất dữ liệu từ database MySQL thông qua Axios
// Phần hình ảnh được lưu trên Cloudinary, ở database chỉ lưu dưới dạng URL

export default function UserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/get-users`)
      .then(res => {
        setUserList(res.data);
      })
      .catch(err => {
        throw err;
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td><img src={user.image} alt="img"/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}