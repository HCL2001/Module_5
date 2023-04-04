// 8:04AM Long them function leaveRoom
// Long them function leaveRoom
function leaveRoom(userID, chatRoomUsers) {
  return chatRoomUsers.filter((user) => user.id != userID);
}

module.exports = leaveRoom;

//   ==================================
