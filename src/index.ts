import express from "express";
import helmet from "helmet";
import leads_routes from "./handlers/session_leads";
import students_routes from "./handlers/students";
import sessions_routes from "./handlers/sessions";

const app = express();
const port = 3000;
//middleware to parse incomming requests
app.use(helmet());

app.use(express.json());

app.get("/", async (_req, res) => {
  res.send("Welcome to the Udacity Hub Api");
});

leads_routes(app);
students_routes(app);
sessions_routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

export default app;
