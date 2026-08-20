const express = require("express");

const router = express.Router();

const db = require("../config/db");


// ========================================
// SAVE STICKER DESIGN
// ========================================

router.post("/design", (req, res) => {

    const {
        userId,
        design
    } = req.body;


    if (!userId || !design) {

        return res.status(400).json({

            success: false,

            message:
                "User and design are required."

        });

    }


    const sql = `
        INSERT INTO sticker_designs
        (
            user_id,
            design_type,
            design_data
        )
        VALUES (?, ?, ?)
    `;


    const values = [

        userId,

        design.type || "sticker",

        JSON.stringify(design)

    ];


    db.query(
        sql,
        values,
        (err, result) => {

            if (err) {

                console.error(
                    "SAVE DESIGN ERROR:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to save design."

                });

            }


            res.json({

                success: true,

                message:
                    "Design saved successfully.",

                designId:
                    result.insertId

            });

        }
    );

});


// ========================================
// GET USER DESIGNS
// ========================================

router.get(
    "/designs/:userId",
    (req, res) => {

        const userId =
            req.params.userId;


        const sql = `
            SELECT *
            FROM sticker_designs
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;


        db.query(
            sql,
            [userId],
            (err, results) => {

                if (err) {

                    console.error(err);

                    return res.status(500)
                        .json({

                            success: false,

                            message:
                                "Failed to load designs."

                        });

                }


                res.json({

                    success: true,

                    designs: results

                });

            }
        );

    }
);


// ========================================
// ADD TO CART
// ========================================

router.post("/cart", (req, res) => {

    const {

        userId,

        productType,

        design,

        quantity,

        price

    } = req.body;


    if (
        !userId ||
        !design ||
        !quantity ||
        price === undefined
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Missing cart information."

        });

    }


    const sql = `
        INSERT INTO cart_items
        (
            user_id,
            product_type,
            design_data,
            quantity,
            price
        )
        VALUES (?, ?, ?, ?, ?)
    `;


    const values = [

        userId,

        productType || "sticker",

        JSON.stringify(design),

        quantity,

        price

    ];


    db.query(
        sql,
        values,
        (err, result) => {

            if (err) {

                console.error(
                    "CART ERROR:",
                    err
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Failed to add item to cart."

                });

            }


            res.json({

                success: true,

                message:
                    "Added to cart successfully.",

                cartId:
                    result.insertId

            });

        }
    );

});


// ========================================
// GET CART
// ========================================

router.get(
    "/cart/:userId",
    (req, res) => {

        const userId =
            req.params.userId;


        const sql = `
            SELECT *
            FROM cart_items
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;


        db.query(
            sql,
            [userId],
            (err, results) => {

                if (err) {

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


module.exports = router;