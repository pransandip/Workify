import React, { useState, useEffect } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import * as Colors from "../../../../Styles-Elements/Colors";
import {
  Heading6Medium,
  Body,
  Small,
} from "../../../../Styles-Elements/Labels";
// images
import SendIcon from "../../../../image-assets/structure/send-icon.svg";
import Round1 from "../../../../image-assets/product/round-img3.png";
import {
  chatInitilization,
  createChatUser,
  loginUser,
  getAllConversions,
} from "../../../../Helpers/CometChat";
import { imageBase, workerImageBase } from "../../../../api/axios";
import "../../GIGS.scss";

function GigChat(props) {
  const userData = useSelector((state) => state.userData.data);

  const chatUserData = useSelector((state) => state.chatUser);
  const chat_data = useSelector((state) => state.chatData);

  const [message, setMessage] = useState("");

  let user_data = userData
    ? userData
    : JSON.parse(localStorage.getItem("user"));

  if (!chatUserData.status) {
    chatInitilization();
  }

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

  // const getAllConversions = () => {
  //   let listenerID = "superhero2";
  //   // CometChat.getConversation(listenerID, "user").then(
  //   //   (conversation) => {
  //   //     console.log("conversation", conversation);
  //   //   },
  //   //   (error) => {
  //   //     console.log("error while fetching a conversation", error);
  //   //   }
  //   // );
  //   let UID = "superhero2";
  //   let limit = 30;
  //   let messagesRequest = new CometChat.MessagesRequestBuilder()
  //     .setUID(UID)
  //     .setLimit(limit)
  //     .build();

  //   messagesRequest.fetchPrevious().then(
  //     (messages) => {
  //       console.log("Message list fetched:", messages);
  //     },
  //     (error) => {
  //       console.log("Message fetching failed with error:", error);
  //     }
  //   );
  // };

  //console.log(user_data);

  // const appID = "214364ce3314e7db";
  // const auth_key = "0520175d0d734763c5a7094df3338a4c080f9290";
  // const region = "us";
  // const appSetting = new CometChat.AppSettingsBuilder()
  //   .subscribePresenceForAllUsers()
  //   .setRegion(region)
  //   .build();
  // CometChat.init(appID, appSetting).then(
  //   () => {
  //     console.log("Initialization completed successfully");
  //     // You can now call login function.
  //   },
  //   (error) => {
  //     console.log("Initialization failed with error:", error);
  //     // Check the reason for error and take appropriate action.
  //   }
  // );

  // const createChatUser = (user_id) => {
  //   let user_name =
  //     !user_data.first_name || user_data.first_name === "null"
  //       ? user_data.owner_name
  //       : user_data.first_name;

  //   let authKey = auth_key;
  //   var uid = user_id;

  //   var name = user_name;

  //   console.log(uid, name);

  //   var user = new CometChat.User(uid);
  //   user.setName(name);
  //   CometChat.createUser(user, authKey).then(
  //     (user) => {
  //       console.log("user created", user);
  //       startRealTimeMessageReciving();
  //     },
  //     (error) => {
  //       console.log("error", error);
  //     }
  //   );
  // };

  // const loginUser = (user_id) => {
  //   const authKey = auth_key;
  //   const uid = user_id;

  //   CometChat.login(uid, authKey).then(
  //     (user) => {
  //       console.log("Login Successful:", { user });
  //     },
  //     (error) => {
  //       console.log("Login failed with exception:", { error });
  //     }
  //   );
  // };

  useEffect(() => {
    let user_id =
      user_data &&
      user_data.email
        .substring(0, user_data.email.indexOf("@"))
        .replace(".", "");
    let user_name =
      !user_data.first_name || user_data.first_name === "null"
        ? user_data.owner_name
        : user_data.first_name;

    console.log(chatUserData);
    getAllConversions();

    if (!chatUserData.status || !chatUserData.name) {
      loginUser(user_id);
    } else {
      // startRealTimeMessageReciving();
      getAllConversions();
    }
  }, []);

  const handleMessageSend = () => {
    let receiverID = "superhero2";
    let messageText = message;
    let receiverType = CometChat.RECEIVER_TYPE.USER;
    let textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType
    );

    CometChat.sendMessage(textMessage).then(
      (message) => {
        console.log("Message sent successfully:", message);
        getAllConversions();
        setMessage("");
      },
      (error) => {
        console.log("Message sending failed with error:", error);
      }
    );
  };

  return (
    <>
      <Box className={"chat-main"}>
        {console.log(Object.values(chat_data), props.selectedWorker)}
        <Box className={"chat-header"}>
          <img
            src={
              props.selectedWorker
                ? props.selectedWorker.profile_picture
                  ? `${workerImageBase}${props.selectedWorker.profile_picture}`
                  : Round1
                : Round1
            }
            alt="name"
            className="chat-header-icon"
          />
          <Heading6Medium
            fontWeight={"600"}
            className={"heading6medium"}
            color={Colors.white}
            text={`${props.selectedWorker.first_name} ${props.selectedWorker.last_name}`}
          />
        </Box>
        <Box className={"chat-body"}>
          <Box className={"overflowScroll"}>
            {Object.values(chat_data).length > 0 &&
              Object.values(chat_data).map((item) => {
                if (item.receiverId === props.user_id) {
                  return (
                    <Box className={"chat-receiver-parent"}>
                      <Box className={"chat-receiver"}>
                        <Body text={"Hi,"} color={Colors.nightGray} />
                      </Box>
                      <Box className={"chat-receiver"}>
                        <Body text={item.text} color={Colors.nightGray} />
                      </Box>
                    </Box>
                  );
                } else {
                  return (
                    <Box className={"chat-sender-parent"}>
                      <Box className={"chat-sender"}>
                        <Body text={item.text} color={Colors.white} />
                      </Box>
                    </Box>
                  );
                }
              })}
            {/* <span className={"date-chips"}>Today</span>
            <Box className={"chat-sender-parent"}>
              <Box className={"chat-sender"}>
                <Body
                  text={"Lorem ipsum dolor sit amet, consur adipiscing elit."}
                  color={Colors.white}
                />
              </Box>
              <Small
                className={"small"}
                style={{ marginTop: "4px" }}
                color={Colors.nightGray}
                text={"08.22 pm"}
              />
            </Box>
            <Box className={"chat-receiver-parent"}>
              <Box className={"chat-receiver"}>
                <Body text={"Hi,"} color={Colors.nightGray} />
              </Box>
              <Box className={"chat-receiver"}>
                <Body
                  text={"Lorem ipsum dolor sit amet, constur adipiscing elit."}
                  color={Colors.nightGray}
                />
              </Box>
              <Small
                className={"small"}
                style={{ marginTop: "4px" }}
                color={Colors.nightGray}
                text={"08.22 pm"}
              />
            </Box>
            <Box className={"chat-sender-parent"}>
              <Box className={"chat-sender"}>
                <Body
                  text={"Lorem ipsum dolor sit amet, consur adipiscing elit."}
                  color={Colors.white}
                />
              </Box>
              <Small
                className={"small"}
                style={{ marginTop: "4px" }}
                color={Colors.nightGray}
                text={"05.01 pm"}
              />
            </Box> */}
          </Box>
        </Box>
        <Box className={"chat-footer"}>
          <Box className={"chat-input-box"}>
            <input
              type="text"
              placeholder={"Type your message here"}
              className={"chat-input"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <span
              className={"send-btn"}
              style={{ cursor: "pointer" }}
              onClick={handleMessageSend}
            >
              <img src={SendIcon} className={"send-icon"} alt="name" />
            </span>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default GigChat;
