import "./UpdateUser.css";
import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../App.css";
import axios, { HttpStatusCode } from "axios";
import socketIOClient from "socket.io-client";

const host = "http://localhost:3001";
// a Tùng sửa login
export default function Login() {
  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    return () => {
      socketRef.current.disconnect();
    };
  });

  const socketRef = useRef();

  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const handleInput = (key, value) => {
    const newVal = { ...user, [key]: value };
    setUser(newVal);
    console.log(newVal);
  };

  // vào backend sửa Controller /signup sang /signin
  const handleSignin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/signin", user)
      .then((res) => {
        console.log(res.status);
        if (res.status === HttpStatusCode.Ok) {
          let resp = res.data.username;
          socketRef.current.emit("listUser");
          socketRef.current.emit("listRooms");
          navigate(`/chat/${resp}`);
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const handleSignup = (e) => {
    navigate("/signup");
  };
  //anh Tùng sửa giao diện
  return (
    <>
      <body>
        <div class="container">
          <div class="row">
            <div class="col-lg-10 col-xl-9 mx-auto">
              <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                <div>
                  <img
                    style={{
                      blockSize: "100%",
                      paddingTop: "1em",
                      borderRadius: "1.5em",
                    }}
                    src="https://res.cloudinary.com/dnevlrxnn/image/upload/v1679161065/z4193338523577_bb6d7f017c58bf405de9d6c7c8b81bc1_ycjwf7.jpg"
                  />
                </div>
                <div class="card-body p-4 p-sm-5">
                  <h1
                    class="card-title text-center mb-1 fw-light fs-1"
                    style={{
                      paddingBottom: "1em",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    KONETO
                  </h1>
                  <form>
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) =>
                          handleInput(e.target.name, e.target.value)
                        }
                        id="loginun"
                        name="username"
                        required
                        autofocus
                      />
                      <label for="floatingInputUsername">Username</label> 
                    </div>

                    <div class="form-floating mb-3">
                
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) =>
                          handleInput(e.target.name, e.target.value)
                        }
                        placeholder="Enter your PassWord"
                        id="loginpw"
                        name="password"
                      />
                           <label for="floatingPassword">Password</label> 
                    </div>

                    <hr />

                    <div class="d-grid mb-2">
                      <button
                        class="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                        style={{ height: "3.5em" }}
                        onClick={handleSignin}
                        type="submit"
                      >
                        Đăng nhập
                      </button>
                    </div>

                    <hr class="my-4" />

                    <div class="d-grid mb-2">
                      <button
                        class="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                        onClick={handleSignup}
                        type="submit"
                        style={{ background: "#3DD129", height: "3.5em" }}
                      >
                        Tạo tài khoản mới
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
