import React, { useState } from 'react';
import axios from 'axios';

// Componet Upload Image: dùng để load hình ảnh lên Cloudinary
// Sau đó lấy url lưu xuống database

export default function UploadImage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'nj55ow3p');

    // Lưu hình ảnh vào Cloudinary, sau đó lấy URL của nó
    axios
      .post('https://api.cloudinary.com/v1_1/dnevlrxnn/image/upload', imageData)
      .then((response) => {
        const imageUrl = response.data.secure_url;

        // Lưu URL hình ảnh cùng các thông tin khác của user xuống database MySQL
        axios
          .post('http://localhost:8080/add-user', {
            username: username,
            email: email,
            password: password,
            image: imageUrl,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}