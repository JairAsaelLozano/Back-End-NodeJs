import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'
import $post_routes from './server/routes/post.routes.js'
import $user_routes from './server/routes/userlogin.routes.js'
import $coments_routes from './server/routes/coments.routes.js'
import $category_routes from './server/routes/category.routes.js'
import $list_routes from './server/routes/list.routes.js'
import $galery_routes from './server/routes/galery.routes.js'

import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import { Server as SocketServer } from "socket.io";
import http from 'http'
import socketComments from "./server/sockets/socket.comments.js";

const app = express()
const port= process.env.PORT || 3000
dotenv.config()

// const server = http.createServer(app)

mongoose
  .set('strictQuery', false)
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to mongodb atlas"))
  .catch((error) => console.log("error"))

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}))


app.use('/api/posts', $post_routes)
app.use('/auth', $user_routes)
app.use('/api/coments', $coments_routes)
app.use('/api/category', $category_routes)
app.use('/api/lists', $list_routes)
app.use('/api/galery', $galery_routes)


app.listen(port)
console.log(`Server running in port ${port}`)