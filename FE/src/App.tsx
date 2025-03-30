// src/App.tsx
import React from 'react';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
};

export default App;






// import { useEffect, useState } from 'react';
// import Phaser from 'phaser';


// function App() {
//   // const [ip, setIp] = useState("");
//   // const [msgs, setMsgs] = useState<string[]>([]);
//   // const [roomip, setRoomIp] = useState("");
//   // const [room, setRoom] = useState(""); // Now correctly updated from server response
//   // const [ws, setWs] = useState<WebSocket | null>(null);
//   // const [usersname, setUsername] = useState("");
//   // const [usersnameIp, setUsernameIp] = useState("");


//   // useEffect(() => {
//   //   const socket = new WebSocket("ws://localhost:4001");

//   //   socket.onopen = () => {
//   //     console.log(`Connected to backend server`);
//   //     setWs(socket); // Store socket reference after it's opened
//   //   };

//   //   socket.onmessage = (event) => {
//   //     const final = JSON.parse(event.data);
//   //     console.log(final);

//   //     if (final.type === "setUsername") {
//   //       setUsername(final.username);
//   //       setMsgs((prev) => [...prev, final.content]);
//   //     } else if (final.type === "joinroom") {
//   //       setRoom(final.room); // Now properly setting the room
//   //       setMsgs((prev) => [...prev, final.content]);
//   //     } else if (final.type === "message") {
//   //       setMsgs((prev) => [...prev, final.content]);
//   //     }
//   //   };

//   //   socket.onclose = () => {
//   //     console.log(`Disconnected from backend server`);
//   //   };

//   //   return () => {
//   //     if (socket.readyState === WebSocket.OPEN) {
//   //       socket.close();
//   //     }
//   //   };
//   // }, []);

//   // function handleSetUsername() {
//   //   if (usersnameIp && ws) {
//   //     const send = JSON.stringify({ type: "setUsername", content: usersnameIp });
//   //     ws.send(send);
//   //   }
//   // }

//   // function handleEnterRoom() {
//   //   if (usersname && roomip && ws) {
//   //     const send = JSON.stringify({ type: "joinroom", content: roomip });
//   //     ws.send(send);
//   //   }
//   // }

//   // function handlesend() {
//   //   if (ws && usersname && ip && room) {
//   //     const send = JSON.stringify({
//   //       type: "message",
//   //       sender: usersname,
//   //       room: room,
//   //       content: ip,
//   //     });
//   //     ws.send(send);
//   //   }
//   // }

//   // return (
//   //   <>
//   //     {/* {!usersname && (
//   //       <div>
//   //         <input
//   //           type="text"
//   //           placeholder="Enter your unique name"
//   //           onChange={(e) => setUsernameIp(e.target.value)}
//   //         />
//   //         <button onClick={handleSetUsername}>Set Name</button>
//   //       </div>
//   //     )}

//   //     {usersname && (
//   //       <div>
//   //         <input
//   //           type="text"
//   //           placeholder="Enter room or create room"
//   //           onChange={(e) => setRoomIp(e.target.value)}
//   //         />
//   //         <button onClick={handleEnterRoom}>Enter / Create</button>
//   //       </div>
//   //     )}

//   //     {usersname && room && (
//   //       <div>
//   //         <input
//   //           type="text"
//   //           placeholder="Enter the message"
//   //           onChange={(e) => setIp(e.target.value)}
//   //         />
//   //         <button onClick={handlesend}>Send</button>
//   //       </div>
//   //     )}

//   //     {msgs.map((msg, idx) => (
//   //       <p key={idx}>{msg}</p>
//   //     ))} */}
//   //     <Map/>
//   //   </>
//   // );
//   return <>
  
//   </>
// }

// export default App;

