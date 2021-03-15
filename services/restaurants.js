const db = require('../db/index');
const getRestaurants = async (req, res) => {
    try {
        const restaurantRatingsData = await db.query("select * from restaurants left join (select restaurant_id, COUNT (*), TRUNC (AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id");
        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows,
            },
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getRestaurant = async (req, res) => {
    try {
        const restaurant = await db.query("select * from restaurants left join (select restaurant_id, COUNT (*), TRUNC (AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1", [req.params.id]);
        const reviews = await db.query("select * from reviews where restaurant_id = $1", [req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createRestaurant = async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};

const updateRestaurant = async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning*", [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            },
        })
    } catch (err) {
        res.status(400).json({ message: error.message })
    }
};
const deleteRestaurant = async (req, res) => {
    try {
        const results = db.query("DELETE FROM restaurants where id = $1", [req.params.id])
        res.status(204).json({
            status: "success"
        })
    } catch (err) {
        res.status(400).json({ message: error.message })
    }

};


module.exports = {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};
