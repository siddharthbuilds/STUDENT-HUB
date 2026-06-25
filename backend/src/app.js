import express from "express"
import checkUniqueID from "./controllers/checkUniqueId";

const app = express();

app.use('/',express.json());

app.post('/create-user',checkUniqueID);

app.listen(3000);