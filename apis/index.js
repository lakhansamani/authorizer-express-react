const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authorizer = require("@authorizerdev/authorizer-js");

// Read env variable
dotenv.config();
// Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT;
// Initialize authorizer sdk
// Configure AUTHORIZER_URL & AUTHORIZER_CLIENT_ID in apis/.env file
const authRef = new authorizer.Authorizer({
  authorizerURL: process.env.AUTHORIZER_URL,
  redirectURL: "/",
  clientID: process.env.AUTHORIZER_CLIENT_ID,
});

// Authorization middleware to validate JWT token for APIs
const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: "Authorization not found" });
  }

  const splitHeader = authHeader.split(" ");
  if (splitHeader.length != 2) {
    return res.status(403).json({ error: "Invalid auth header" });
  }

  if (splitHeader[0].toLowerCase() != "bearer") {
    return res.status(403).json({ error: "Bearer token not found" });
  }

  const token = splitHeader[1];
  // Validate jwt token via authorizer sdk
  try {
    const res = await authRef.validateJWTToken({
      token,
      token_type: "id_token", // This can be access_token, refresh_token
    });
    req.user = res.claims;
  } catch (err) {
    console.error(err);
    return res.status(403).json({ error: "Invalid JWT token" });
  }

  next();
};

app.get("/", (req, res) => {
  res.status(200).end();
});

app.get("/api/todos", authMiddleWare, (req, res) => {
  // Fetch todos as per req.user.id
  res.status(200).json({
    message: "Tasks listed successfully",
    data: [],
  });
});

app.get("/api/todos/:id", authMiddleWare, (req, res) => {
  // Fetch todo as per req.user.id & req.params.id
  res.status(200).json({
    message: "Tasks fetched successfully",
    data: {},
  });
});

app.post("/api/todos", authMiddleWare, (req, res) => {
  // Add todo for req.user.id and req.body
  const data = req.body;
  data.user_id = req.user.id;
  data.id = Date.now().toString();
  res.status(200).json({
    message: "Tasks added successfully",
    data: data,
  });
});

app.put("/api/todos/:id", authMiddleWare, (req, res) => {
  // Update todo for req.user.id and req.params.id
  const data = req.body;
  res.status(200).json({
    message: "Task updated successfully",
    data,
  });
});

app.delete("/api/todos/:id", authMiddleWare, (req, res) => {
  // Fetch and delete as per req.user.id & req.params.id
  res.status(200).json({
    message: "Task deleted successfully",
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
