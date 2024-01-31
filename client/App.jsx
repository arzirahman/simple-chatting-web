import { useEffect, useRef, useState } from "react"
import Login from "./components/login";
import io from 'socket.io-client';
import Sidebar from "./components/sidebar";
import Chat from "./components/chat";

function App() {
  const [user, setUser] = useState();
  const [selectedUser, setSelectedUser] = useState('')
  const [messageList, setMessageList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef?.current && user && socketRef.current.on(`receive-${user}`, (data) => {
      setMessageList(prev => [...prev, {...data, isRead: false}])
    });
  }, [socketRef, user])

  useEffect(() => {
    socketRef?.current && socketRef.current.on('new user', (data) => {
      setRefresh(prev => !prev)
    });
  }, [socketRef])

  const sendMessage = (message) => {
    setMessageList(prev => [...prev, message])
    socketRef?.current && socketRef.current.emit('message', message)
  }

  const handleRegister = (e) => {
    if (e) {
      setUser(e)
    }
  }

  if (!user) {
    return <Login onSubmit={handleRegister} />
  } else {
    return (
      <main className="w-screen h-screen flex">
        <Sidebar 
          refresh={refresh} 
          user={user} 
          setSelectedUser={setSelectedUser} 
          selectedUser={selectedUser} 
          messageList={messageList}
          setMessageList={setMessageList}
        />
        <Chat user={user} selected={selectedUser} sendMessage={sendMessage} messageList={messageList} />
      </main>
    )
  }
}

export default App
