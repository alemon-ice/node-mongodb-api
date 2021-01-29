import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import userRoute from "./routes/user.route";
import messageRoute from "./routes/message.route";

export class App {
  private express: express.Application;
  private port = 9000;

  constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
    this.listen();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private listen(): void {
    this.express.listen(this.port, () => {
      console.log("Servidor iniciado na prota " + this.port);
    });
  }

  private database(): void {
    mongoose.connect("mongodb://localhost:27018", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private routes(): void {
    this.express.use("/users", userRoute);
    this.express.use("/messages", messageRoute);
  }
}
