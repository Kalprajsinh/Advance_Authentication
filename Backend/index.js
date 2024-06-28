const express = require("express");
const cors = require("cors")
const PORT = process.env.PORT || 3000;
const routers = require("./routes/router")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api" , routers)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
