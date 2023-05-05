import * as api from "./api/index.js";
import {
  isValidUsername,
  isValidRoomName,
  isValidMessageContent,
} from "./utils/utils.js";

import {
  refreshUserInfo,
  refreshMessages,
  refreshRooms,
  refreshUsers,
} from "./utils/services.js";

import {
  addMessageToMessages,
  addRoomToRoomList,
  addUserToUserList,
} from "./utils/builder.js";

(async function main() {
  sessionStorage.clear();
  // Authentication and user creation
  const username = prompt("Entrez votre nom d'utilisateur:");
  if (isValidUsername(username)) {
    const response = await api.createUser(username);
    if (
      response.data === "Username already exist" &&
      response.success === false
    ) {
      const currentuser = await api.getUserByUsername(username);
      if (currentuser && currentuser.data) {
        sessionStorage.setItem("currentuser", JSON.stringify(currentuser.data));
      } else {
        alert("Erreur lors de la récupération de l'utilisateur existant");
        window.location.reload();
        return;
      }
    }
    if (response.success === true) {
      addUserToUserList(response.data);
      sessionStorage.setItem("currentuser", JSON.stringify(response.data));
    }
  } else {
    alert("Nom d'utilisateur invalide");
    window.location.reload();
    return;
  }
  // Room creation
  const roomName = prompt("Entrez le nom du salon à créer:");
  if (isValidRoomName(roomName)) {
    const response = await api.createRoom(roomName);
    if (response.success === true) {
      addRoomToRoomList(response.data);
      sessionStorage.setItem("currentroom", JSON.stringify(response.data));
    }
    if (
      response.data === "A room with the same name already exists." &&
      response.success === false
    ) {
      const currentRoom = await api.getRoomByName(roomName);
      if (currentRoom && currentRoom.data) {
        sessionStorage.setItem("currentroom", JSON.stringify(currentRoom.data));
        alert("Connexion au salon existant " + roomName + " ...");
      } else {
        alert("Erreur lors de la récupération du salon existant");
        window.location.reload();
        return;
      }
    }
  } else {
    alert("Nom de salon invalide");
    window.location.reload();
    return;
  }

  // Retrieve and display rooms, users, and messages
  await refreshUsers();
  await refreshRooms();
  await refreshUserInfo(); // Move this call here
  await refreshMessages(); // Move this call here

  // Sending and receiving messages
  const storedUser = JSON.parse(sessionStorage.getItem("currentuser"));
  const storedRoom = JSON.parse(sessionStorage.getItem("currentroom"));
  if (storedUser && storedRoom) {
    const userId = storedUser.id;
    const roomId = storedRoom.id;
    const sendButton = document.getElementById("send-button");
    const disconnect = document.getElementById("disconnect");
    const changeuser = document.getElementById("change-user");
    const messageInput = document.getElementById("message-input");

    sendButton.addEventListener("click", async () => {
      const content = messageInput.value;
      if (isValidMessageContent(content)) {
        const response = await api.postMessage(userId, roomId, content);
        console.log(response);
        if (response.success === true) {
          await refreshMessages();
        } else {
          alert(response.data);
        }
        messageInput.value = "";
      } else {
        console.error("Contenu de message invalide");
      }
    });

    disconnect.addEventListener("click", async () => {
      const response = await api.disconnect();
      if (response.success === true) {
        sessionStorage.clear(); // Clear the session storage
        window.location.reload(); // Reload the page
      } else {
        alert("Failed to disconnect"); // Show an error message if disconnecting was not successful
      }
    });

    changeuser.addEventListener("click", async () => {
      sessionStorage.clear(); // Clear the session storage
      window.location.reload(); // Reload the page to prompt for a new username and room
    });
  } else {
    console.error("Erreur lors de la récupération de l'utilisateur ou du salon stocké");
  }
})();

