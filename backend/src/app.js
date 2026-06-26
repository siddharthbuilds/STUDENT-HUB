import express from "express"
import uniqueUserMiddleware from "./middlewares/uniqueUserMiddleware.js";
import registerController from "./controllers/registerController.js"

const app = express();

app.use('/',express.json());

app.post('/register',uniqueUserMiddleware,registerController);

app.listen(3000);