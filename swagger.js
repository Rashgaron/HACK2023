
swaggerAutogen = require("swagger-autogen")();
const outputFile = "./src/swagger_output.json";
const endpointsFiles = ["./src/config/express.ts"];
const doc = {
  info: {
    title: "Vueling API",
    description: "Backend API for Vueling app",
  },
  schemes: ["http", "https"],
  host: "localhost:8080",
  consumes: ["application/json"],
  produces: ["application/json"],
  basePath: "",
  tags: [
 
  ],
  definitions: {
  
  },
};
swaggerAutogen(outputFile, endpointsFiles, doc);