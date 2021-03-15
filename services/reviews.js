const db = require('../db/index');
const getReviews = async (req, res) => {
    try {
        const reviews = await db.query("select * from reviews where restaurant_id = $1", [req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                reviews: reviews.rows,
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const createReview = async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (err) {
        res.status(409).json({ message: error.message })
    }
};
module.exports = {
    getReviews,
    createReview
}
