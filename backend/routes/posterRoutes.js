const express = require("express");

const router = express.Router();

const db = require("../config/db");


// ==================================================
// GET ALL POSTERS
// ==================================================

router.get("/", (req, res) => {

    const sql = `
        SELECT
            id,
            name,
            category,
            image_url,
            size,
            price,
            description
        FROM posters
        ORDER BY created_at DESC
    `;


    db.query(
        sql,
        (err, results) => {

            if (err) {

                console.error(
                    "GET POSTERS ERROR:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to load posters."

                });

            }


            res.json({

                success: true,

                posters: results

            });

        }
    );

});


// ==================================================
// GET SINGLE POSTER
// ==================================================

router.get("/:id", (req, res) => {

    const posterId =
        req.params.id;


    const sql = `
        SELECT *
        FROM posters
        WHERE id = ?
    `;


    db.query(
        sql,
        [posterId],
        (err, results) => {

            if (err) {

                console.error(err);

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to load poster."

                });

            }


            if (!results.length) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Poster not found."

                });

            }


            res.json({

                success: true,

                poster: results[0]

            });

        }
    );

});


// ==================================================
// ADD POSTER TO CART
// ==================================================

router.post("/cart", (req, res) => {

    const {

        userId,

        posterId,

        quantity,

        price

    } = req.body;


    if (
        !userId ||
        !posterId ||
        !quantity ||
        price === undefined
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Missing cart information."

        });

    }


    const verifySql = `
        SELECT *
        FROM posters
        WHERE id = ?
    `;


    db.query(
        verifySql,
        [posterId],
        (verifyError, posters) => {

            if (verifyError) {

                console.error(
                    verifyError
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error."

                });

            }


            if (!posters.length) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Poster not found."

                });

            }


            const poster =
                posters[0];


            const sql = `
                INSERT INTO poster_cart
                (
                    user_id,
                    poster_id,
                    quantity,
                    price
                )
                VALUES (?, ?, ?, ?)
            `;


            db.query(
                sql,
                [
                    userId,
                    posterId,
                    quantity,
                    price
                ],
                (err, result) => {

                    if (err) {

                        console.error(
                            "ADD CART ERROR:",
                            err
                        );

                        return res.status(500)
                            .json({

                                success: false,

                                message:
                                    "Failed to add poster to cart."

                            });

                    }


                    res.json({

                        success: true,

                        message:
                            "Poster added to cart.",

                        cartId:
                            result.insertId,

                        poster:
                            poster.name

                    });

                }
            );

        }
    );

});


// ==================================================
// GET USER CART
// ==================================================

router.get(
    "/cart/:userId",
    (req, res) => {

        const userId =
            req.params.userId;


        const sql = `
            SELECT
                pc.id,
                pc.quantity,
                pc.price,
                p.id AS poster_id,
                p.name,
                p.image_url,
                p.size
            FROM poster_cart pc
            INNER JOIN posters p
                ON pc.poster_id = p.id
            WHERE pc.user_id = ?
            ORDER BY pc.created_at DESC
        `;


        db.query(
            sql,
            [userId],
            (err, results) => {

                if (err) {

                    console.error(
                        "GET CART ERROR:",
                        err
                    );

                    return res.status(500)
                        .json({

                            success: false,

                            message:
                                "Failed to load cart."

                        });

                }


                res.json({

                    success: true,

                    cart: results

                });

            }
        );

    }
);


// ==================================================
// DELETE CART ITEM
// ==================================================

router.delete(
    "/cart/:id",
    (req, res) => {

        const cartId =
            req.params.id;


        const sql = `
            DELETE FROM poster_cart
            WHERE id = ?
        `;


        db.query(
            sql,
            [cartId],
            (err) => {

                if (err) {

                    console.error(err);

                    return res.status(500)
                        .json({

                            success: false,

                            message:
                                "Failed to remove item."

                        });

                }


                res.json({

                    success: true,

                    message:
                        "Item removed."

                });

            }
        );

    }
);


module.exports = router;