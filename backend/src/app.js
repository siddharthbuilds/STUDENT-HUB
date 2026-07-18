import express from "express"
import uniqueUserMiddleware from "./middlewares/uniqueUserMiddleware.js";
import registerController from "./controllers/registerController.js"
import getSemestersController from "./controllers/getSemestersController.js"

const app = express();

app.use('/',express.json());

app.post('/api-register',uniqueUserMiddleware,registerController);
app.post('/api-get-semesters',getSemestersController);

app.listen(3000);