import React from "react";
import axios from "axios";
import { useNavigate, useParams} from 'react-router-dom';
import { getAuth } from "firebase/auth";
import Header from '../components/Header';
const ChatroomPage = (props) => {
  const {chatroomId} = useParams();
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const [userId, setUserId] = React.useState("");
  const navigate = useNavigate()
  const getMessages = () => {
    axios.get(`/chatroom/${chatroomId}`)
        .then((response) => {
        setMessages(response.data);

      })
      .catch((err) => {
        setTimeout(getMessages, 3000);
      });
  };
  React.useEffect(() => {
    getMessages();
    // eslint-disable-next-line
  }, [messages]);
  const sendMessage = () => {
    if(!getAuth().currentUser){
      alert("signin to chat")
      navigate("/signin")
      return
    }
    const username = getAuth().currentUser.displayName || getAuth().currentUser.email.split("@")[0]
    console.log(username);
    axios.post(`/chatroom/${chatroomId}`, {
      chatroom: chatroomId,
      username:username,
      message:messageRef.current.value
    })
    .then((response) => {
      getMessages();
      messageRef.current.value = "";
    })
    .catch((err) => {
      // console.log(err);
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ){console.log(err);}
    });

      messageRef.current.value = "";
    };

  return (
    <div className="chatroomPage">
      <Header />
      <div className="chatroomSection">
        <div className="cardHeadertitle">
          {messages.map((message,i) => (
              <div className="cardHeader"> {message.room_name}</div>
          ))}
        </div>
        <div className="chatroomContent">
          {messages.slice().reverse().map((message, i) => (
            <div key={i} className="message">
              <span
                className={
                  userId === message.userId ? "ownMessage" : "otherMessage"
                }
              >
                {message.username}:
              </span>{" "}
              {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input
              type="text"
              name="message"
              placeholder="Say something!"
              ref={messageRef}
            />
          </div>
          <div>
            <button className="join" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatroomPage;
