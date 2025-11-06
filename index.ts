import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { db } from "./app/config/db";
import { userRouter } from "./app/router/userRouter";
import { postRouter } from "./app/router/postRouter";
import {commentRouter} from "./app/router/comentRouter"
import bodyParser from "body-parser";
import session from 'express-session';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use(session({
    secret: 'secrect',
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: false
}))
// OR if using body-parser package
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use(userRouter);
app.use("/post",postRouter);
app.use("/comment",commentRouter)
db.then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
  });
});
