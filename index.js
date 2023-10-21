const express = require("express");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;
const app = express();

server.use(middlewares);
server.use(router);

// Define a route to handle updating "numberOfStar" by email
app.post("/updateNumberOfStar", (req, res) => {
  const emailToUpdate = req.query.phone; // Get the email from the query parameter
  const updatedNumberOfStar = Number(req.query.updatedNumberOfStar); // Get the updated number of stars

  // Find the user with the specified email
  const user = router.db.get("users").find({ phone: emailToUpdate }).value();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update the "numberOfStar" property
  user.numberOfStar = updatedNumberOfStar;

  // Save the updated data to the database
  router.db.write();

  return res.json(user);
});

server.listen(port);
