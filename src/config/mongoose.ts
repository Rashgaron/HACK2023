import mongoose from "mongoose";
// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
/* istanbul ignore next */
mongoose.connection.on("error", (err: any) => {
  console.log("MongoDB connection error: " + err);
  process.exit(-1);
});

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */

// istanbul ignore next
export default async (mongoUrl: string) => {
  await mongoose.connect(mongoUrl, () => {
    try {
      console.log("mongoDB connected...");
    } catch (error) {
      console.log(error);
    }
  });
  return mongoose.connection;
};
