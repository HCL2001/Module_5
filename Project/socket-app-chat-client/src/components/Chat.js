import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Chat.css";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import CreateRoom from "./CreateRoom";
import axios from "axios";
const host = "http://localhost:3001";


function Chat() {
  const [listUser, setListUser] = useState([]);
  // Long 8:09AM Them vao bien danh sach phong
  const [rooms, setRooms] = useState([]);
  const [roomForm, setRoomForm] = useState();
  const inputEle = useRef();
  // ===========================================
  let { username } = useParams();
  const socketRef = useRef();
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const[tempRoom,setTempRoom] = useState([]);
  const[searchRoom,setSearchRoom] = useState();


  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    console.log(roomForm);
    socketRef.current.on("set-list", (data) => {
      setListUser(data);
    });
    socketRef.current.on("send-list-user", (data) => {
      setListUser(data);
    });
    //
    socketRef.current.on("get_rooms", (data) => {
      setRooms(data);
    });

    socketRef.current.on("searchTempRoom", (data) => {
      setTempRoom(data);
    });
    axios
      .get(`http://localhost:8080/avatar/${username}`)
      .then((res) => {
        setImg(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  // Coi, sửa thông tin user
  function HandleClickViewProfile() {
    navigate(`/${username}/info`);
    console.log("Hello");
  }
  // Long them vao phan tao room va join vao room 8:08AM
  function HandleClickCreateRoom(e) {
    if (roomForm !== null || roomForm !== "") {
      if (rooms.indexOf(roomForm) !== -1) {
        alert("Phong da ton tai");
      } else {
        socketRef.current.emit("add_room", roomForm);
        alert("tao phong thanh cong");
        inputEle.current.value = "";
      }
    }
  }


  const renderRooms =
  tempRoom.length === 0
    ? rooms.map((room, index) => (
        <li
          class="active"
          onClick={HandleClickChatRoom}
          value={room.roomForm}
        >
          <div class="d-flex bd-highlight">
            <div class="img_cont">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1365/1365725.png"
                class="rounded-circle user_img"
                alt="avatar"
              />
            </div>
            <div class="user_info">
              <span>{room.roomForm} </span>
            </div>
          </div>
        </li>
      ))
    : tempRoom.map((room, index) => (
        <li class="active" onClick={HandleClickChatRoom} value={room}>
          <div class="d-flex bd-highlight">
            <div class="img_cont">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1365/1365725.png"
                class="rounded-circle user_img"
                alt="avatar"
              />
            </div>
            <div class="user_info">
              <span>{room} </span>
            </div>
          </div>
        </li>
      ));


  function HandleClickChatRoom(e) {
    const value = e.currentTarget.getAttribute("value");
    navigate(`/chatroom/${username}/${value}`);
  }
  // Long end ====================================================
  function HandleClickLogout() {
    socketRef.current.emit("logout", username);
    navigate(`/`);
  }
  //Quang xu ly chat 1-1
  function HandleClickChat11(e) {
    const clickedPerson = e.currentTarget.getAttribute("value");
    const room = username + "_" + clickedPerson;
    const data = {
      username11: username,
      clickedPerson: clickedPerson,
      room: room,
    };
    socketRef.current.emit("join-room-11", data);
    socketRef.current.on("send-room-exist", function (roomExist) {
      navigate(`/chat1-1/${username}/${roomExist}`);
    });
    socketRef.current.on("send-room-new", function (roomNew) {
      navigate(`/chat1-1/${username}/${roomNew}`);
    });
  }
  function OnChangeSearchRoom(e) {
    setSearchRoom(e.target.value);
    // socketRef.current.emit("searchRoom", e.target.value);
    if (e.target.value === "") {
      socketRef.current.emit("getRooms");
      const temp = [];
      socketRef.current.emit("tempRooms", temp);
    }
    console.log(searchRoom.length);
  }

  function handleSearchRoom(e) {
    if (searchRoom !== null || searchRoom !== "") {
      socketRef.current.emit("searchRoom", searchRoom);
      
    }
  }
  const renderMess = listUser.map((user) => (
    <li class="active" onClick={HandleClickChat11} value={user.username}>
      <div class="d-flex bd-highlight">
        <div class="img_cont">
          <img src={user.image} class="rounded-circle user_img" alt="avatar" />
          <span class="online_icon"> </span>
        </div>
        <div class="user_info">
          <span>{user.username} </span>
          <p>online</p>
        </div>
      </div>
    </li>
  ));
  // Long them vao function onChangeRoom
  function OnChangeRoom(e) {
    setRoomForm(e.target.value);
  }
  // =========================================

  
  return (
    <div class="container-fluid h-100">
      <div class="row justify-content-center h-100">
        <div class="col-md-4 col-xl-3 chat">
          <div class="card mb-sm-3 mb-md-0 contacts_card">
            <h2 style={{ textAlign: "center", color: "wheat" }}>
              Online Users
            </h2>
            <div class="card-header">
              <div class="input-group">
                <input
                  type="text"
                  placeholder="Search..."
                  name=""
                  class="form-control search"
                />
                <div class="input-group-prepend">
                  <span class="input-group-text search_btn">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body contacts_body">
              <ui class="contacts">{renderMess}</ui>
            </div>
            <div class="card-footer"></div>
          </div>
        </div>
        <div class="col-md-4 col-xl-3 chat">
          <div class="card mb-sm-3 mb-md-0 contacts_card">
            <h2 style={{ textAlign: "center", color: "wheat" }}>Rooms</h2>
            <div class="card-header">
              <div class="input-group">
                <input
                  type="text"
                  placeholder="Search..."
                  name="searchRoom"
                  class="form-control search"
                  onChange={OnChangeSearchRoom}
                />
                <div class="input-group-prepend">
                  <span class="input-group-text search_btn">
                    <i class="fas fa-search" onClick={handleSearchRoom}></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="card-body contacts_body">
              <ui class="contacts">{renderRooms}</ui>
            </div>
            <div class="card-footer"></div>
          </div>
        </div>
        <div class="col-md-4 col-xl-3 chat">
          <div class="card mb-sm-3 mb-md-0 contacts_card">
            <div style={{ textAlign: "center" }}>
              <img
                src={img}
                class="rounded-circle user_img mt-5"
                style={{ width: 150, height: 150 }}
                alt="avatar"
              />
            </div>
            <div
              style={{ textAlign: "center", color: "white" }}
              className="mt-3"
            >
              <h2>{username}</h2>
            </div>
            <div style={{ textAlign: "center" }} className="mt-4">
              <button
                style={{ width: 280, textAlign: "left" }}
                className="btn btn-danger"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i className="fas fa-plus mr-1"></i> Create room
              </button>
              <button
                onClick={HandleClickViewProfile}
                style={{ width: 280, textAlign: "left" }}
                className="btn btn-danger mt-3"
              >
                <i className="fas fa-user-edit"></i> Edit Profile
              </button>
              <button
                onClick={HandleClickLogout}
                style={{ width: 280, textAlign: "left" }}
                className="btn btn-danger mt-3"
              >
                <i className="fas fa-sign-out-alt mr-1"></i> Logout
              </button>
            </div>
            {/*  Khuc nay la phan tao room */}
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Create room
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <input
                      type={"text"}
                      name="room"
                      onChange={OnChangeRoom}
                      ref={inputEle}
                    ></input>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={HandleClickCreateRoom}
                    >
                      Add Room
                    </button>
                  </div>
                </div>
              </div>
            </div>
              {/*  Khuc nay la het phan tao room */}
          </div>
        </div>
      </div>
    </div>
   
  );
}
export default Chat;
