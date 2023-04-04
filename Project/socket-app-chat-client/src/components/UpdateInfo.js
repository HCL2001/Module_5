import React from 'react'
import { useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import '../App.css';
import '../css/UpdateInfo.css';

export default function UpdateInfo() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  let {id} = useParams();
    //id is argument in URL

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the image to Cloudinary and get its URL
    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'nj55ow3p');

    axios
      .post('https://api.cloudinary.com/v1_1/dnevlrxnn/image/upload', imageData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        console.log(response.data.secure_url)

        // Insert the image URL into your Spring Boot database
        axios
          .put(`http://localhost:8080/update/${id}`, {
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
      })
      .finally(navigate(`/${id}/account`));
      
  };

  return (
    <div class="container">
        <div class="card card-container">
            {/* <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" /> */}
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                class="rounded-circle user_img mt-5"
                style={{ width: 150, height: 150 }}
                alt="avatar"
              />
            <p id="profile-name" class="profile-name-card"></p>
            <form class="form-signin">
                <span id="reauth-email" class="reauth-email"></span>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
            </form>
        </div>
    </div>
  );
}