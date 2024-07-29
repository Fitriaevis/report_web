var express = require("express");
const Model_Users = require("../models/Model_Users");
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_Users.getById(id);
    if (Data.length > 0) {
      
      //Kondisi pengecekan
      if(Data[0].role != 2){
        res.redirect('/logout')
      }else {
        // Render halaman dengan data
        res.render("users/detail_users/index", {
          title: "Users Home",
          email: Data[0].email,
          username: Data[0].username,
          id_user: req.session.userId,
          role: req.session.role,
        });
      }
    //Akhir Kondisi
    } else {
      res.status(401).json({ error: "user tidak ada" });
    }
  } catch (error) {
    res.status(501).json("Butuh akses login");
  }
});


module.exports = router;
