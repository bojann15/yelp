const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const db = require("./db");
const {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require("./services/restaurants")
const {
    getReviews,
    createReview
} = require("./services/reviews")

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/api/v1/restaurants", getRestaurants);
app.get("/api/v1/restaurants/:id", getRestaurant);
app.post("/api/v1/restaurants", createRestaurant);
app.put("/api/v1/restaurants/:id", updateRestaurant);
app.delete("/api/v1/restaurants/:id", deleteRestaurant);

app.get("/api/v1/restaurants/:id", getReviews);
app.post("/api/v1/restaurants/:id/addReview", createReview)

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});

