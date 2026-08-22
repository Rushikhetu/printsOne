const express = require("express");

const router = express.Router();

const db = require("../config/db");


// =====================================================
// GET ALL BOUQUETS
// =====================================================

router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM bouquets
        ORDER BY id ASC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.error(
                "BOUQUET LOAD ERROR:",
                err
            );

            return res.status(500).json({
                message: "Failed to load bouquets"
            });
        }


        res.json(results);

    });

});


// =====================================================
// GET SINGLE BOUQUET
// =====================================================

router.get("/:id", (req, res) => {

    const id = req.params.id;


    const sql = `
        SELECT *
        FROM bouquets
        WHERE id = ?
    `;


    db.query(
        sql,
        [id],
        (err, results) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message:
                        "Failed to load bouquet"
                });
            }


            if (results.length === 0) {

                return res.status(404).json({
                    message:
                        "Bouquet not found"
                });
            }


            res.json(results[0]);

        }
    );

});


module.exports = router;