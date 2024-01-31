import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: "*",
  },
});
const port = 3000;

const users = []

app.use(cors())
app.use(express.json())

app.post("/register", (req, res) => {
  if (!req.body.name) return res.status(400).json({
    message: 'name is empty'
  })
  const user = users.find(u => u === req.body.name);
  if (!user) users.push(req.body.name)
  io.emit("new user", req.body.name)
  return res.json({
    message: 'register success'
  })
})

app.get("/users", (req, res) => {
  return res.json(users)
})

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('register', (data) => {
    console.log('new user registered', data)
  });

  socket.on('message', (data) => {
    io.emit(`receive-${data?.receiver || ''}`, data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
