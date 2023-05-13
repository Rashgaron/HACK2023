import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../api/routes/v1";
/**
 * Express instance
 * @public
 */
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use("/api/v1", routes);

// app.use("*", (req, res) => {
//   res.status(404).json({
//     message: "Not Found",
//   });
// });

export default app;
