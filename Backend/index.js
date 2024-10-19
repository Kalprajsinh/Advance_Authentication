const express = require("express");
const cors = require("cors")
const PORT = process.env.PORT || 3000;
const routers = require("./routes/router")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://advanceauthentication.pages.dev',
    credentials: true 
  }));

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

app.use("/aa" , routers)

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
