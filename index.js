const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001; // you can use any port number here; i chose to use 3001

server.use(middlewares);
server.use(router);

// Define a route to handle updating "numberOfStar" by email using a GET request
app.get("/updateNumberOfStar", (req, res) => {
  const phoneno = req.query.phone; // Get the email from the query parameter

  // Find the user with the specified email
  const user = router.db.get("users").find({ phone: phoneno }).value();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Increment the "numberOfStar" property
  user.numberOfStar = (parseInt(user.numberOfStar) || 0) + 1;

  // Save the updated data to the database
  router.db.write();

  return res.json(user);
});

server.listen(port);
