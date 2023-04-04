import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Chat1-1.css";
// import "./Chat1-1.css";
import { socketIOClient, io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const host = "http://localhost:3001";

export default function Chat11() {
  const socketIO = useRef();

  const navigate = useNavigate();
  const { username, room } = useParams();
  const clickedPerson = room.replace(username, "").replace("_", "");
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEnd = useRef();
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    socketIO.current = io.connect(host);
    const data = {
      username11: username,
      clickedPerson: clickedPerson,
      room: room,
    };
    socketIO.current.emit("join-room-11", data);
    socketIO.current.emit("get-message", room);
    socketIO.current.on("sendMessFromRoom", (data) => {
      setMess(data);
    });
    socketIO.current.on("sendDataToRoom", (dataGot) => {
      setMess((oldMsg) => [...oldMsg, dataGot]);
      scrollToBottom();
    });
    axios
      .get(`http://localhost:8080/avatar/${username}`)
      .then((res) => {
        setAvatar(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      socketIO.current.disconnect(username);
      // socketIO.current.off("join-room-11");
      socketIO.current.off("sendDataToRoom");
    };
  }, []);

  const renderMess = mess.map((m, index) => (
    <>
      <div
        key={index}
        className={`${
          m.username === username
            ? "d-flex justify-content-end mb-4"
            : "d-flex justify-content-start mb-4"
        }`}
      >
        {m.username === username ? (
          <>
            <div class="msg_cotainer bg-success text-white mr-2">
              {m.content}
              <span class="msg_time">{m.date}</span>
            </div>
            <div class="img_cont_msg">
              <img
                src={m.image}
                class="rounded-circle user_img_msg"
                alt="avatar"
              />
            </div>
          </>
        ) : (
          <>
            <div class="img_cont_msg">
              <img
                src={m.image}
                class="rounded-circle user_img_msg"
                alt="avatar"
              />
            </div>
            <div class="msg_cotainer bg-primary text-white">
              {m.content}
              <span class="msg_time">{m.date}</span>
            </div>
          </>
        )}
      </div>
    </>
  ));

  const sendMessage = (e) => {
    if (message !== "") {
      const msg = {
        content: message,
        username: username,
        room_name: room,
        date:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        image: avatar,
      };
      socketIO.current.emit("sendDataFromRoom", msg);
      setMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };

  const leave = () => {
    socketIO.current.emit("leave_room", { username, room });
    navigate(`/chat/${username}`);
  };

  return (
    <div class="container-fluid h-100">
      <div class="row justify-content-center h-100">
        <div class="col-md-8 col-xl-6 chat">
          <div class="card">
            <div class="card-header msg_head">
              <div class="d-flex bd-highlight">
                <div class="img_cont">
                  <img
                    src={avatar}
                    class="rounded-circle user_img"
                    alt="avatar"
                  />
                  <span class="online_icon"></span>
                </div>
                <div class="user_info">
                  <span>Chat with {clickedPerson}</span>
                  {/* <p>1767 Messages</p> */}
                </div>
              </div>
              <span id="action_menu_btn" onClick={leave}>
                <i class="fas fa-times-circle"></i>
              </span>
            </div>
            <div class="card-body msg_card_body">{renderMess}</div>
            <div class="card-footer">
              <div class="input-group">
                <div class="input-group-append">
                  <span class="input-group-text attach_btn">
                    <i class="fas fa-paperclip"></i>
                  </span>
                </div>
                <textarea
                  style={{color:"white"}}
                  name=""
                  class="form-control type_msg"
                  placeholder="Type your message..."
                  onChange={handleChange}
                  onKeyDown={onEnterPress}
                  value={message}
                ></textarea>
                <div class="input-group-append">
                  <span class="input-group-text send_btn" onClick={sendMessage}>
                    <i class="fas fa-location-arrow"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="box-chat">
    //     <div class="box-chat_message">
    //         {renderMess}
    //         <div style={{ float: "left", clear: "both" }}
    //             ref={messagesEnd}>
    //         </div>
    //     </div>
    //     <div className="send-box">
    //         <textarea
    //             value={message}
    //             onKeyDown={onEnterPress}
    //             onChange={handleChange}
    //             placeholder="Nhập tin nhắn ..."
    //         />
    //         <button onClick={sendMessage}>
    //             Send
    //         </button>
    //     </div>
    // </div>
  );

 
}
