import express from "express"
import uniqueUserMiddleware from "./middlewares/uniqueUserMiddleware";
import registerController from "./controllers/registerController.js"

const app = express();

app.use('/',express.json());

app.post('/create-user',uniqueUserMiddleware,registerController);

app.listen(3000);