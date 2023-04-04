import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Chat.css";
import axios from "axios";

export default function ChatRoom() {
  const socketIO = useRef();

  const { room } = useParams();

  const navigate = useNavigate();
  const { username } = useParams();
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEnd = useRef();
  const [users, setUsers] = useState([]);
  const [avatar, setAvatar] = useState();

  // const renderMess = mess.map((m, index) => (
  //   <div
  //     key={index}
  //     className={`${
  //       m.username === username
  //         ? "d-flex justify-content-end mb-4"
  //         : "d-flex justify-content-start mb-4"
  //     }`}
  //   >
  //     <div class="img_cont_msg">
  //       <img
  //         src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
  //         class="rounded-circle user_img_msg"
  //         alt="avatar"
  //       />
  //     </div>
  //     <div class="msg_cotainer">
  //       {m.message}
  //       <span class="msg_time">{m.date}</span>
  //     </div>
  //   </div>
  // ));

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

  useEffect(() => {
    socketIO.current = io.connect("http://localhost:3001");
    socketIO.current.emit("join_chat", { username, room });
    socketIO.current.emit("get-message", room);
    socketIO.current.on("sendMessFromRoom", (data) => {
      setMess(data);
    });
    socketIO.current.on("sendDataToRoom", (dataGot) => {
      setMess((oldMsg) => [...oldMsg, dataGot]);
      scrollToBottom();
    });
    socketIO.current.on("chatroom_users", (data) => {
      setUsers(data);
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
      socketIO.current.off("join_chat");
      socketIO.current.off("sendDataServer");
    };
  }, []);

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

  const leave = (e) => {
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
                    src="https://cdn-icons-png.flaticon.com/512/1365/1365725.png"
                    class="rounded-circle user_img"
                    alt="avatar"
                  />
                  <span class="online_icon"></span>
                </div>
                <div class="user_info">
                  <span>{room}</span>
                </div>
              </div>
              <span id="action_menu_btn">
                <i class="fas fa-times-circle" onClick={leave}></i>
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
                  value={message}
                  onKeyDown={onEnterPress}
                  onChange={handleChange}
                  className="form-control type_msg"
                  placeholder="Nhập tin nhắn ..."
                ></textarea>
                <div class="input-group-append">
                  <span class="input-group-text send_btn">
                    <i class="fas fa-location-arrow" onClick={sendMessage}></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
