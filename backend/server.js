
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");

// connectDB();

// const app = express();

// app.use(cors({
//   origin: "*"
// }));
// app.use(express.json());

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/questions", require("./routes/questionRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("🚀 Server running on port", PORT);
// });



/// mai 



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();


app.use(
  cors({
    origin: "https://lpuquora-frontend.onrender.com",
    credentials: true,
  })
);

app.options("*", cors());



app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});


