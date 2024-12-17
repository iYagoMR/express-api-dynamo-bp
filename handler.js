require("express-async-errors");

const cors = require("cors");
const express = require("express");
const routes = require("./src/routes");
const AppError = require("./src/utils/AppError");
const serverless = require("serverless-http");
// const cookieParser = require("cookie-parser")

// Initialize express app
const app = express()
app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://main.d1zim2i5glv75x.amplifyapp.com", "https://www.lazylizardpub.ca", "https://lazylizardpub.ca"],
//   methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));

//Enable CORS for all routes
// app.use(
//   cors({
//     origin: "*", // Replace with your frontend's origin
//     credentials: true,
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// Register routes
app.use(routes);

// Error handling middleware
app.use((err, request, response, next) => {
    if (err instanceof AppError) {
      //comment the line below when production
      console.log(err.error)
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    //comment the line below when production
    console.error(err);
  
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
});

//Start the server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//module.exports.handler = serverless(app);