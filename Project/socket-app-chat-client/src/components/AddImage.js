import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import '../App.css';
import '../css/UpdateInfo.css';

export default function AddImage() {

  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  let { username } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();

    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'nj55ow3p');

    axios
      .post('https://api.cloudinary.com/v1_1/dnevlrxnn/image/upload', imageData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        console.log(response.data.secure_url)

        axios
          .post(`http://localhost:8080/add-image/${username}`, {
            username: username,
            image: imageUrl,
          })
          .then((response) => {
            console.log(response);
            setImageUrl(imageUrl);
            setUploadSuccess(true);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
  };

 useEffect(() => {
  if (uploadSuccess) {
    // Set the image state with the uploaded image URL
    setImage(imageUrl);
    setUploadSuccess(false);
  }
}, [uploadSuccess, imageUrl]);

  return (
    <div className="container text-center" style={{ 
      backgroundImage: `url(https://rewildingbritain.imgix.net/images/What-are-natural-processes.jpg)`, 
      backgroundPosition: 'center', 
      backgroundSize: 'cover',
      height: '100vh', 
      position: 'relative' }}>

<div class="container" style={{paddingTop: '2em'}}>
        <div class="card card-container" style={{marginTop: '0em'}}>
        <div style={{ position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
      <form onSubmit={handleSubmit}>
        {image ? (
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
            <img src={image} alt="Uploaded Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : (
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto', backgroundColor: '#ddd' }}>
            <span style={{ display: 'block', textAlign: 'center', paddingTop: '60px' }}>No Image Uploaded</span>
          </div>
        )}
        <hr></hr>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <hr></hr>
        <button class="btn btn-lg btn-success btn-block btn-signin" onClick={handleSubmit}>Upload Image</button>
        <button class="btn btn-lg btn-success btn-block btn-signin" onClick={e => navigate(`/`)}>Login</button>
      </form>
    </div>

        </div>
    </div>

    

    </div>
  )
}