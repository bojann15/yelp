const db = require('../db/index');

const createReview = async (req, res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;", [req.params.id, req.body.name, req.body.review, req.body.rating])
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};
module.exports = {
    createReview
};
