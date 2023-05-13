import mongoose from "mongoose";
import "reflect-metadata";
import { dbConnection, app, vars } from "./config";
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);

const mongoUri = vars.mongooseSecretKey;
const port = vars.port || 8080;
dbConnection(mongoUri);

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret.__v;
    delete ret._id;
  },
});

app.get("/", (req: any, res: any) => {
  res.send("Hello world!");
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit("connected", { message: "putos franceses" });
  console.log("a user connected");
});

io.on("hola", (data) => {
  console.log(data);
});

server.listen(port, () => {
  try {
    console.log("listening on *:", port);
  } catch (e) {
    console.log(e);
  }
});

export default app;
