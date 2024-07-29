var express = require("express");
const Model_Users = require("../models/Model_Users");
var router = express.Router();


/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await Model_Users.getById(id);
        // data email dan password masih tidak cocok.
        if (Data.length > 0) {
            if (Data[0].role != 1) {
                res.redirect('logout');
            } else {
                res.render("leader/index", {
                    title: "Leader Home",
                    email: Data[0].email,
                    password: Data[0].password,
                    file_user: Data[0].file_user,
                    role: req.session.role
                });
            }
            } else {
                res.status(401).json({error: "Data leader tidak ditemukan" });
            }
    } catch (error) {
        res.status.json("Butuh akses login");   
    }
});

module.exports = router;

