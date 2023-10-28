const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const serverRoute = require("./routes/server.route")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const session = require("express-session")
const app = express();
app.use(cors());
const MongoDBStore = require('connect-mongodb-session')(session);

// Enable trust proxy to handle X-Forwarded-For header
app.set('trust proxy', true);
const store = new MongoDBStore({
  uri:process.env.MONGO_DB_ATLAS,
  collection: 'sessions'
});

app.use(session({
  secret:process.env.SESSION_SECRET,
  saveUninitialized:false,
  resave:false,
  store
}))

// middleware and packages
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// endpoints promise
mongoose.Promise = global.Promise;
// Middleware to handle CORS headers for all routes
app.use((req, res, next) => {
  // Allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');

  // Allow specific headers and methods
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Check if it's a preflight request
  if (req.method === 'OPTIONS') {
    // Respond with 200 status code
    res.sendStatus(200);
  } else {
    // Continue to the next middleware
    next();
  }
});

// Routing
app.use("/api/v1", serverRoute);

// port
const port = process.env.PORT || 5000;

// Database Connection
const connectToMongoDB = () => {
  console.log("connecting to MongoDB...");
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_DB_ATLAS, {
      dbName: "eBuzz",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully Connected to MongoDB!");
    })
    .catch((err) => {
      console.log(err);
      console.log("An error occurred while connecting to MongoDB");
    });
};
connectToMongoDB();

// catch 404 and forward to error handler
app.use((req, res, err) => {
  res.status(404).json({ message: err.message });
});

// listen for connections
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
