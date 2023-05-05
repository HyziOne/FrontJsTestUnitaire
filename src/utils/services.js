import * as api from "../api/index.js";

import {
  addMessageToMessages,
  addRoomToRoomList,
  addUserToUserList,
} from "./builder.js";

export function refreshUserInfo() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentuser"));
  const currentRoom = JSON.parse(sessionStorage.getItem("currentroom"));

  if (currentUser && currentRoom) { 
    const userInfos = document.querySelector(".user-info");
    const userInfosItem = document.createElement("li");
    userInfosItem.innerHTML = "Mon nom : " + currentUser.username;
    const userInfosItem2 = document.createElement("li");
    userInfosItem2.innerHTML = "Mon salon : " + currentRoom.name;
    userInfos.appendChild(userInfosItem);
    userInfos.appendChild(userInfosItem2);
  } else {
    console.error("L'utilisateur ou la salle actuelle n'est pas initialisé(e).");
  }
}


export async function refreshMessages() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.replaceChildren();
  sessionStorage.removeItem("messages");
  const currentRoom = JSON.parse(sessionStorage.getItem("currentroom"));

  if (currentRoom) {
    const roomId = currentRoom.id;
    await api.getMessagesByRoomId(roomId).then((messages) => {
      sessionStorage.setItem("messages", JSON.stringify(messages.data));
      messages.data.forEach((message) => addMessageToMessages(message));
    });
  } else {
    console.error("La salle actuelle n'est pas initialisée.");
  }
}


export async function refreshRooms() {
  const rooms = await api.getRooms();
  sessionStorage.removeItem("rooms");
  const roomsData = rooms.map((room) => room.data);
  sessionStorage.setItem("rooms", JSON.stringify(roomsData));
  const roomList = document.querySelector(".room-list");
  roomList.innerHTML = "";
  rooms.forEach((room) => addRoomToRoomList(room.data));
}

export async function refreshUsers() {
  const users = await api.getUsers();
  sessionStorage.removeItem("users");
  const usersData = users.map((user) => user.data);
  sessionStorage.setItem("users", JSON.stringify(usersData));
  const userList = document.querySelector(".user-list");
  userList.innerHTML = "";
  users.forEach((user) => {
    if (user.data && user.data.username) {
      addUserToUserList(user.data);
    } else {
      console.error('Utilisateur invalide:', user);
    }
  });
}

