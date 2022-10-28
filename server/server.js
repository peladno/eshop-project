const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const parseArgs = require("minimist");
const cluster = require("cluster");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//numero de cpus
const numCPUs = require("os").cpus().length;

//config server
const config = require("./src/utils/config");
const { URL } = config.mongoLocal;
const app = express();
const { ruteNotFound } = require("./src/utils/middlewares");
const logger = require("./src/logger/logger");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);

//adding url routers
const userRouter = require("./src/routers/user.router");
const productsRouter = require("./src/routers/products.router");
const cartRouter = require("./src/routers/cart.router");
const orderRouter = require("./src/routers/order.router");
const messageRouter = require("./src/routers/message.router");

//minimist
const options = { default: { port: config.PORT, mode: "FORK" } };
const args = parseArgs(process.argv.slice(2), options);
const port = parseInt(args.port);
const mode = args.mode.toUpperCase();

//mongo
const MongoStore = require("connect-mongo");
mongoose
  .connect(URL)
  .then(console.log("Base de datos Mongoose conectada"))
  .catch((error) => {
    logger.error(`mongoose error ${error}`);
  });

//config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

////////////////////////////////End config/////////////////////////////////////

//websocket
const io = new SocketServer(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  logger.info(`${socket.id} User connected`);
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
});

//session
app.use(
  session({
    store: new MongoStore({
      mongoUrl: URL,
    }),
    secret: config.PASS2,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 1000000,
      secure: false,
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//logger
app.use((req, res, next) => {
  logger.info(`Ruta: ${req.path}, Método: ${req.method}`);
  next();
});

//routes
app.use("/", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/messages", messageRouter);
app.use(ruteNotFound);

if (mode === "CLUSTER") {
  //Cluster mode
  if (cluster.isMaster) {
    console.log(`Número de CPU: ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(
        "Worker",
        worker.process.pid,
        "died",
        new Date().toLocaleString()
      );
      cluster.fork();
    });
  } else {
    const connectedServer = httpServer.listen(port, function () {
      console.log(
        `listen PORT ${connectedServer.address().port}, mode: ${mode} - PID: ${
          process.pid
        }`
      );
    });
    connectedServer.on("error", (error) => logger.error(`error ${error}`));
  }
} else {
  //fork default mode
  const connectedServer = httpServer.listen(port, function () {
    console.log(
      `webServer listen PORT ${
        connectedServer.address().port
      }, mode: ${mode} - PID: ${process.pid}`
    );
  });

  connectedServer.on("error", (error) => logger.error(`error ${error}`));
  process.on("exit", (code) => {
    console.log("Exit code -> ", code);
  });
}
