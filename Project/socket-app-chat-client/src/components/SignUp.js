import React, { useState , useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import '../App.css';
import axios from "axios";
import styled from 'styled-components';

// validationSchema trong Formik. Sử dụng thư viện bên thứ 3 là Yup để xác thực
const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z]{3,10}$/, "Username phải là chữ cái có từ 3-10 ký tự")
    .required("Username là bắt buộc"),

  email: Yup.string()
    .email("Email không hợp lệ.")
    .required("Email là bắt buộc"),
    phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, "Phone phải là số, có từ 10 đến 11 ký tự.")
    .required("Phone là bắt buộc"),

  password: Yup.string()
    .min(8, "Password phải có tối thiểu 8 kí tự")
    .matches(/^[a-zA-Z0-9!@#$%^&*)/(+=._-]*$/, "Password chứa ký tự không cho phép" )
    .required("Password là bắt buộc"),
    
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Password không trùng khớp")
    .required("Confirm Password là bắt buộc")
});

export default function SignUp() {
  const [user, setUser] = useState({});
  const [file, setFile] = useState({});
  const navigate = useNavigate();
  let {username} = useParams();

    const handleSignUp = (newUser) => {
    axios
          .post("http://localhost:8080/save", newUser)
          .then(res => {
            const newUser = res.data.username;
            console.log(res.data);
            navigate(`/${newUser}/addimage`);
          })
          .catch(err => {
            throw err;
          });
        }
// _______________________________________________________________________________________________________
  return (
    <div className="container text-center" style={{ 
                backgroundImage: `url(https://res.cloudinary.com/dnevlrxnn/image/upload/v1679187881/z4193491013560_19bee4af6b06db42f2dfe531f6e93b4a_g1ujzf.jpg)`, 
                backgroundPosition: 'center', 
                backgroundSize: 'cover',
                height: '100vh', 
                position: 'relative' }}>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <h1 className="h1 mb-3 fw-large" style={{ marginTop: '0', paddingTop: '2rem', color: '#fff' }}>Sign Up</h1>
        <div className="form-signin text-left" style={{ maxWidth: '500px', margin: 'auto' }}>
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        phone: "",
        confirmpassword: ""
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        console.log(values);
        setUser({
          ...user,
          username: values.username,
          email: values.email,
          password: values.password,
          phone: values.phone
        });
        handleSignUp(values)
      }}
    >
      {({ values, errors, touched}) => (
        <Form style={{margin: 'auto',width: '250px'}}>
          <div className='custom-input'>
            <label htmlFor="un" style={{color:"white"}}>Username</label>
            <Field  id = 'un' name="username" type="text" className = 'form-control' />
            {errors.username && touched.username ? (<div  className="error-message">{errors.username}</div>) : null}
            {console.log(errors.username)}
          </div>
          <div className='custom-input'>
            <label htmlFor="email" style={{color:"white"}}>Email</label>
            <Field id = 'email' name="email" type="email" className = 'form-control'/>
            {errors.email && touched.email ? <div className="error-message">{errors.email}</div> : null}
          </div>

          <div className='custom-input'>
            <label htmlFor="ph" style={{color:"white"}}>Phone Number</label>
            <Field  id = 'ph' name="phone" type="text" className = 'form-control' />
            {errors.phone && touched.phone? (<div  className="error-message">{errors.phone}</div>) : null}
            {console.log(errors.phone)}
          </div>

          <div className='custom-input'>
            <label htmlFor="password" style={{color:"white"}}>Password</label>
            <Field id = 'password' name="password" type='password' className = 'form-control'/>
            {errors.password && touched.password ? (<div className="error-message">{errors.password}</div>) : null}
          </div>
          <div className='custom-input'>
            <label htmlFor="cpw" style={{color:"white"}}>Confirm Password</label>
            <Field id = 'cpw' name="confirmpassword" type='password' className = 'form-control'/>
            {errors.confirmpassword && touched.confirmpassword ? (<div className="error-message">{errors.confirmpassword}</div>) : null}
          </div>
          <br></br>
          <button type="submit" className="w-100 btn btn-lg btn-success">Submit</button>
        </Form>
      )}
    </Formik>
    </div>
    </div>
    </div>
  );
}