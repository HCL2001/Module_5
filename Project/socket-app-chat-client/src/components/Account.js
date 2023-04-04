import React from 'react'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios, { HttpStatusCode } from 'axios';
import '../App.css';
import '../css/Account.css';
import '../css/UpdateInfo.css';


export default function Account() {
    const [userEmail, setUserEmail] = useState({
        email: ''
    })

    const [userPhone, setUserPhone] = useState({
      phone: ''
  })

  const [userPassword, setUserPassword] = useState({
    password: ''
})

    const [isEditedEmail, setIsEditedEmail] = useState(false);
    const [isEditedPhone, setIsEditedPhone] = useState(false);
    const [isEditedPassword, setIsEditedPassword] = useState(false);
    const [resuser, setResuser] = useState(
        {username: '',
         email: '',
         password: '',
         phone: '',
         image: ''}
    )
    
    const navigate = useNavigate();
    let {username} = useParams();
    //username này là biến trên url

    const handleChangeEmail = (e) => {
        setUserEmail({...userEmail, [e.target.name] : e.target.value})
    }

    const handleChangePhone = (e) => {
      setUserPhone({...userPhone, [e.target.name] : e.target.value})
    }

    const handleChangePassword = (e) => {
      setUserPassword({...userPassword, [e.target.name] : e.target.value})
    }


    const handleUpdateEmail = () => {
        setIsEditedEmail(true);
    }

    const handleUpdatePhone = () => {
      setIsEditedPhone(true);
    }

    const handleUpdatePassword = () => {
      setIsEditedPassword(true);
    }

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        
        axios 
            .post(`http://localhost:8080/update-email/${username}`, userEmail)
            .then((res) => {
              // console.log(res.data);
              if (res.status === HttpStatusCode.Ok) {
                  navigate(`/${username}/info`);
              }  
            })
            .catch(err => {
              console.log(err)
              throw err;
            });

        setIsEditedEmail(false);
    }

    const handleSubmitPhone = (e) => {
      e.preventDefault();
      
      axios 
          .post(`http://localhost:8080/update-phone/${username}`, userPhone)
          .then((res) => {
            // console.log(res.data);
            if (res.status === HttpStatusCode.Ok) {
                navigate(`/${username}/info`);
            }  
          })
          .catch(err => {
            console.log(err)
            throw err;
          });

      setIsEditedPhone(false);
  }

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    
    axios 
        .post(`http://localhost:8080/update-password/${username}`, userPassword)
        .then((res) => {
          // console.log(res.data);
          if (res.status === HttpStatusCode.Ok) {
              navigate(`/${username}/info`);
          }  
        })
        .catch(err => {
          console.log(err)
          throw err;
        });

    setIsEditedPassword(false);
}

    useEffect(() => {
        axios
          .get(`http://localhost:8080/${username}`)
          .then(res => {
            console.log(res.status)
            if(res.status === HttpStatusCode.Ok){
                setResuser(res.data);
                console.log(res.data)
                console.log(res.data.image)
            }
          })
          .catch(err => {
            console.log(err)
            throw err;
          });
        },[username])

    
    return (

<div class="container">
        <div class="row login_box" style={{borderRadius: '1em'}}>
        <div class="col-md-12 col-xs-12" align="center" style={{ position: 'relative', backgroundImage: `url(https://res.cloudinary.com/dnevlrxnn/image/upload/v1679160458/z4193334745869_9a257afa077bd3c7d99f256db0445a5a_sm24t7.jpg)`, backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div class="outter">
              <img src={resuser.image} 
              class="rounded-circle user_img mt-5"
              style={{ width: 250, height: 250 }}
              alt="avatar" />
            </div>
            <h1>{resuser.username}</h1>
          </div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 0 }}></div>
        </div>

          <div>
            <div class="row">
            <div class="col-md-12 col-xs-12 login_control" style={{paddingBottom: '0px'}}>
              <div class="label"><p style={{margin: '0px', color: 'black'}}>Email Address</p></div>
            </div>

            <div class="col-md-9 col-xs-9 login_control">

            <div align="left">
              <input
                style={{borderRadius: '0.5em'}}
                name = 'email'
                type="text"
                disabled={!isEditedEmail}
                class="form-control"
                placeholder={resuser.email}
                onChange={handleChangeEmail}
              />
            </div>
            </div>
            <div class="col-md-3 col-xs-3 login_control" >
            <div align="left" >
            <button 
                style={{borderRadius: '0.5em', backgroundColor: 'grey', color: 'white', width: '4.5em'}}
                hidden={isEditedEmail} 
                class="btn btn-orange" 
                onClick={handleUpdateEmail} 
                >
                Edit
              </button>
            
              <button 
                style={{borderRadius: '0.5em', backgroundColor: 'green', color: 'white', width: '4.5em'}}
                hidden={!isEditedEmail} 
                class="btn btn-orange" 
                onClick={handleSubmitEmail}>
                Submit
              </button>
            </div>
            </div>
            </div>
            {/* ___________________________________________________________ */}

            <div class="row">
            <div class="col-md-12 col-xs-12 login_control" style={{paddingBottom: '0px'}}>
              <div class="label"><p style={{margin: '0px', color: 'black'}}>Phone Number</p></div>
            </div>

            <div class="col-md-9 col-xs-9 login_control">
            <div align="left"> 
              <input
                style={{borderRadius: '0.5em'}}
                name = 'phone'
                type="text"
                disabled={!isEditedPhone}
                class="form-control"
                placeholder={resuser.phone}
                onChange={handleChangePhone}
              />
            </div>
            </div>
            <div class="col-md-3 col-xs-3 login_control" >
            <div align="left" >
            <button 
                style={{borderRadius: '0.5em', backgroundColor: 'grey', color: 'white', width: '4.5em'}}
                hidden={isEditedPhone} 
                class="btn btn-orange" 
                onClick={handleUpdatePhone} 
                >
                Edit
              </button>
            
              <button 
                style={{borderRadius: '0.5em', backgroundColor: 'green', color: 'white', width: '4.5em'}}
                hidden={!isEditedPhone} 
                class="btn btn-orange" 
                onClick={handleSubmitPhone}>
                Submit
              </button>
            </div>
            </div>
            </div>
            {/* ___________________________________________________________ */}
            <div class="row">
            <div class="col-md-12 col-xs-12 login_control" style={{paddingBottom: '0px'}}>
              <div class="label"><p style={{margin: '0px', color: 'black'}}>Password</p></div>
            </div>

            <div class="col-md-9 col-xs-9 login_control">          
            <div align="left">
              <input
                style={{borderRadius: '0.5em'}}
                name = 'password'
                type="password"
                disabled={!isEditedPassword}
                class="form-control"
                onChange={handleChangePassword}
              />
            </div>
            </div>
            <div class="col-md-3 col-xs-3 login_control" >
            <div align="left" >
            <button 
                style={{borderRadius: '0.5em', backgroundColor: 'grey', color: 'white', width: '4.5em'}}
                hidden={isEditedPassword} 
                class="btn btn-orange" 
                onClick={handleUpdatePassword} 
                >
                Edit
              </button>
            
              <button 
                style={{borderRadius: '0.5em', backgroundColor: 'green', color: 'white', width: '4.5em'}}
                hidden={!isEditedPassword} 
                class="btn btn-orange" 
                onClick={handleSubmitPassword}>
                Submit
              </button>
            </div>
            </div>
            </div>

            <div class="row">
            <div class="col-md-12 col-xs-12 login_control">
            <div align="left">

<button
  class="btn btn-orange"
  style={{borderRadius: '0.5em', backgroundColor: 'blue', color: 'white'}}
  onClick={(e) => navigate(`/chat/${resuser.username}`)}>
  Back to Chat
</button>
            </div>
            </div>
            </div>

          </div>
    
          
        </div>
      </div>
    )
}