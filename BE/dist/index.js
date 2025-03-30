"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 4001; // Ensure a fallback port
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({ server });
const getUsername = () => `user${Math.floor(Math.random() * 1000)}`;
const getRoomname = () => `Room${Math.floor(Math.random() * 1000)}`;
let users = new Map();
let rooms = new Map();
let totalClients = 0;
wss.on("connection", (ws) => {
    console.log(`New client connected, total clients: ${++totalClients}`);
    let newName = getUsername();
    users.set(ws, newName);
    console.log(`Hello ${newName}`);
    ws.on("message", (data) => {
        try {
            const msg = JSON.parse(data.toString());
            console.log(`Received message: ${msg.type} from ${users.get(ws)}`);
            if (msg.type === "setUsername") {
                users.set(ws, msg.content);
                let response = JSON.stringify({
                    type: "setUsername",
                    content: `Hello ${users.get(ws)}`,
                    username: users.get(ws)
                });
                ws.send(response);
            }
            if (msg.type === "joinroom") {
                let roomSet = rooms.get(msg.content);
                if (!roomSet) {
                    roomSet = new Set();
                    rooms.set(msg.content, roomSet);
                }
                roomSet.add(ws);
                const response = JSON.stringify({
                    type: "joinroom",
                    content: `${users.get(ws)} joined the room ${msg.content}`,
                    room: msg.content
                });
                roomSet.forEach(socket => {
                    socket.send(response);
                });
            }
            if (msg.type === "message" && msg.room) {
                let senderRoom = rooms.get(msg.room);
                if (senderRoom) {
                    let response = JSON.stringify({
                        type: "message",
                        content: `${users.get(ws)}: ${msg.content}`
                    });
                    senderRoom.forEach(socket => {
                        if (socket.readyState === ws_1.default.OPEN) {
                            socket.send(response);
                        }
                    });
                }
            }
        }
        catch (error) {
            console.error(`Error in message processing: ${error}`);
        }
    });
    ws.on("close", () => {
        console.log(`${users.get(ws)} disconnected from server, total clients: ${--totalClients}`);
        rooms.forEach((clients, room) => {
            if (clients.has(ws)) {
                clients.delete(ws);
                console.log(`Removed ${users.get(ws)} from room ${room}`);
                if (clients.size === 0) {
                    rooms.delete(room);
                    console.log(`Room ${room} is empty and has been deleted.`);
                }
            }
        });
        users.delete(ws);
    });
    ws.on("error", (err) => {
        console.error("WebSocket error:", err);
    });
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
