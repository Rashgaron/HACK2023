import mongoose from "mongoose";
import "reflect-metadata";
import { dbConnection, app, vars } from "./config";

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

app.listen(port, () => {
  console.log("Server is running on port", port);
});

export default app;
