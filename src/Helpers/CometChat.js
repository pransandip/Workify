import React, { useState, useEffect } from "react";
import { CometChat } from "@cometchat-pro/chat";
import {
  dispatchChatUserData,
  dispatchChatData,
} from "../store/dispatchers/chatDispatcher";

const appID = "214364ce3314e7db";
const auth_key = "0520175d0d734763c5a7094df3338a4c080f9290";
const region = "us";

export const chatInitilization = () => {
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();
  CometChat.init(appID, appSetting).then(
    () => {
      console.log("Initialization completed successfully");
      // You can now call login function.
    },
    (error) => {
      console.log("Initialization failed with error:", error);
      // Check the reason for error and take appropriate action.
    }
  );
};

export const createChatUser = (user_id, user_name) => {
  let authKey = auth_key;
  var uid = user_id;

  var name = user_name;

  console.log(uid, name);

  var users_id = new CometChat.User(uid);
  users_id.setName(name);
  CometChat.createUser(users_id, authKey).then(
    (users_id) => {
      console.log("user created", users_id);
    },
    (error) => {
      console.log("error", error);
    }
  );
};

export const getAllConversions = (uid) => {
  let listenerID = "superhero2";
  // CometChat.getConversation(listenerID, "user").then(
  //   (conversation) => {
  //     console.log("conversation", conversation);
  //   },
  //   (error) => {
  //     console.log("error while fetching a conversation", error);
  //   }
  // );
  let UID = "superhero2";
  let limit = 30;
  let messagesRequest = new CometChat.MessagesRequestBuilder()
    .setUID(UID)
    .setLimit(limit)
    .build();

  messagesRequest.fetchPrevious().then(
    (messages) => {
      console.log("Message list fetched:", messages);
      dispatchChatData([...messages]);
    },
    (error) => {
      console.log("Message fetching failed with error:", error);
    }
  );
};

const startRealTimeMessageReciving = () => {
  let listenerID = "superhero2";

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: (textMessage) => {
        console.log("Text message received successfully", textMessage);
        getAllConversions();
      },
      onMediaMessageReceived: (mediaMessage) => {
        console.log("Media message received successfully", mediaMessage);
        getAllConversions();
      },
      onCustomMessageReceived: (customMessage) => {
        console.log("Custom message received successfully", customMessage);
        getAllConversions();
      },
    })
  );
};

export const loginUser = (user_id) => {
  const authKey = auth_key;
  const uid = user_id;

  CometChat.login(uid, authKey).then(
    (user) => {
      console.log("Login Successful:", { user });
      let payload = {
        status: user.status,
        uid: user.uid,
        name: user.name,
      };
      dispatchChatUserData(payload);
      startRealTimeMessageReciving();
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );
};

let UID = "superhero2";
let limit = 30;
let messagesRequest = new CometChat.MessagesRequestBuilder()
  .setUID(UID)
  .setLimit(limit)
  .build();

messagesRequest.fetchPrevious().then(
  (messages) => {
    console.log("Message list fetched:", messages);
  },
  (error) => {
    console.log("Message fetching failed with error:", error);
  }
);
