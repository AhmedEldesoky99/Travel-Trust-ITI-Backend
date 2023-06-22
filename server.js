// core modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const { errorHandler } = require("./utils/responseHandler");
const { webhookCheckout } = require("./middlewares/webhook/webhook");
const { trainModel } = require("./ML/train-model");

//custom modules
const RecommendTours = require("./routers/RecommendTours");
const authRouter = require("./routers/auth/user");
const userRouter = require("./routers/user/user");
const tourRouter = require("./routers/tour/tour");
const historyRouter = require("./routers/history");
const commentsRouter = require("./routers/comment/comment");
const bookingRouter = require("./routers/booking/booking");
const cartRouter = require("./routers/cart/cart");
const favoritesRouter = require("./routers/favorite/favorite");
const categoryRouter = require("./routers/category/category");
const citiesRouter = require("./routers/cities");
const destinationRouter = require("./routers/destination");
const adminRouter = require("./routers/admin");

//handle dotenv
dotenv.config();

// variables
const port = 3001;
const app = express();

//middleware
// cors
app.use(cors());

//checkout webhook
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);

//body parser
app.use(express.json());

app.use(express.static(path.join(__dirname, "uploads")));

// morgan
app.use(morgan("dev"));
// routes
app.use("/v1/destinations", destinationRouter);
app.use("/v1/recommendations", RecommendTours);
app.use("/v1/cities", citiesRouter);
app.use("/v1/history", historyRouter);
app.use("/v1/categories", categoryRouter);
app.use("/v1/users", authRouter);
app.use("/v1/tours", tourRouter);
app.use("/v1/user/profile", userRouter);
app.use("/v1/comments", commentsRouter);
app.use("/v1/cart", cartRouter);
app.use("/v1/favorites", favoritesRouter);
app.use("/v1/admin", adminRouter);
app.use("/v1", bookingRouter);

//ml
trainModel.start();

// route not exist
app.all("*", (req, res, next) => {
  next(errorHandler(`can't found route: ${req.originalUrl}`, 404));
});

//database server
mongoose.connect(process.env.DATABASE).then((_) => {
  console.log("database is connected successfully");
});

app.use((err, req, res, next) => {
  console.error("\n<<<<<<<<<<<<<<Error>>>>>>>>>>>>>>\n", err);
  res.status(err.status || 500).send(err.response);
});

app.listen(port, () => console.log(`Server is listening on port : ${port}`));
