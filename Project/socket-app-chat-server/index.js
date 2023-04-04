var express = require("express");
const http = require("http");
const axios = require("axios");
const HttpStatusCode = require("axios");
var app = express();
const server = http.createServer(app);
// Long them vao bien leaveRoom vao luc 8:05
const leaveRoom = require("./utils/leave_room");

// ===========================================
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được.

let listUser = [];

//Quang them cac bien de dung cho chat 1-1
let rooms11 = [];

// Code by Long
let allUsers = [];
let rooms = [];
let listMessage = [];
let tempRoom = [];
// ======================
axios
      .get("http://localhost:8080/roomList")
      .then((res) => {
        rooms = res.data.roomForm;
        console.log(rooms)
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

      axios
      .get("http://localhost:8080/get-users-if-online")
      .then((res) => {
        listUser = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });



socketIo.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  socket.on("listUser", function () {
    axios
      .get("http://localhost:8080/get-users-if-online")
      .then((res) => {
        listUser = res.data;
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  });

  socket.on("searchRoom", (data) => {
    const temp_room = {
      roomForm: data,
    };
    rooms.map((room, index) =>
      room.roomForm === temp_room.roomForm ? tempRoom.push(room.roomForm) : ""
    );
    socket.emit("searchTempRoom", tempRoom);
    tempRoom = [];
  });

  socket.on("tempRooms", (data) => {
    socket.emit("searchTempRoom", data);
  });

  socket.on("listRooms", () => {
    
    axios
      .get("http://localhost:8080/roomList")
      .then((res) => {
        rooms = res.data;
        console.log(rooms)
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  });

  socketIo.sockets.emit("get_rooms", rooms);

  socketIo.sockets.emit("set-list", listUser);

  socket.on("send-rooms", function () {});


  socket.on("join-room-11", (data) => {
    let checkRoom = false;

    rooms11.map((room) => {
      if (
        room.indexOf(data.username11) !== -1 &&
        room.indexOf(data.clickedPerson) !== -1
      ) {
        socket.join(room);
        checkRoom = true;
        socket.emit("send-room-exist", room);
      }
    });

    if (!checkRoom) {
      rooms11.push(data.room);
      socket.join(data.room);
      socket.emit("send-room-new", data.room);
    }
  });

  socket.on("get-message",(data)=>{
      axios
    .get(`http://localhost:8080/message-history/${data}`)
    .then((res) => {
      listMessage = res.data;
      console.log(listMessage);
      socket.emit("sendMessFromRoom", listMessage);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  })

  socket.on("logout", (data) => {
    console.log(data.username);
    axios.post(`http://localhost:8080/logout/${data}`)
    .catch((err) => {
      console.log(err);
      throw err;
    });

    listUser.splice(listUser.indexOf(data), 1);
    socket.broadcast.emit("getlist", listUser);
  });

  socket.on("disconnect", () => {
    // listUser.splice(listUser.indexOf(socket.UserName), 1);
    // socket.broadcast.emit("getlist", listUser);
    console.log(socket.id + " disconnected");
  });

  // Long Chat room socket
  // Chat Room =====================================================
  socket.on("join_chat", (data) => {
    const { username, room } = data;
    socket.join(room);
    allUsers.push({ id: socket.id, username, room });
    console.log(allUsers);
  });

  // sendDataClient dang duoc su dung o tren, Long doi ten lai de ko bi conflict!
  // Long 7:57AM da sua ten ========================
  socket.on("sendDataFromRoom", (data) => {
    const { content, username, room_name, date } = data;
    axios
      .post("http://localhost:8080/message", data)
      .then((res) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

    socketIo.in(room_name).emit("sendDataToRoom", data);
    // console.log(data);
  });
  // ==============================

  // Long addRoom socket
  socket.on("add_room", (data) => {
    socket.room = data;
    socket.join(data);
    const requestRoom ={
      id:rooms[rooms.length -1].id +1,
      roomForm: data
    }
    axios
      .post(`http://localhost:8080/room/${data}`)
      .then((res) => {
        rooms.push(requestRoom);
        socket.emit("get_rooms",rooms);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    console.log(rooms)
  });

  socket.on("getRooms", () => {
    socket.emit("get_rooms", rooms)
    // console.log(rooms)
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
  });

  socket.on("disconnect", (data) => {
    console.log("disconnect" + socket.id);
  });
  // Long end========================================================
});

server.listen(3001, () => {
  console.log("Server đang chay tren cong 3001");
});
