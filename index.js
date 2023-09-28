const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001; // you can use any port number here; i chose to use 3001

server.use(middlewares);
server.use(router);

server.listen(port);

server.use(jsonServer.bodyParser); // Add bodyParser middleware to parse request bodies as JSON

// Custom POST endpoint for creating a new resource (e.g., "posts")
server.post("/users", (req, res) => {
  const newPost = req.body; // Assuming the JSON structure matches your "posts" resource

  if (!newPost) {
    return res.status(400).json({ error: "Invalid data" });
  }

  // You can generate a unique ID for the new post here if needed
  // Example: newPost.id = generateUniqueId();

  // Add the new post to your JSON database
  router.db.get("users").push(newPost).write();

  // Respond with the newly created resource
  res.status(201).json(newPost);
});

// Ensure the router is properly mounted
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
