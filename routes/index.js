var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const Model_Users = require('../models/Model_Users');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    res.render('index', { 
      title: 'Express',
      classes: classes,
      tools: tools 
    });
  } catch (error) {
    console.error(error);
    res.render('index', { 
      title: 'Express',
      classes: [],
      tools: [] 
    });
  }
});

// route login
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

// route register
router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/upload");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// route register
router.post('/saveusers', upload.single("file_user"), async (req, res) => {
  let { username, alamat, telepon, agama, jenis_kelamin, bagian, email, password, role } = req.body;
  try {
    let enkripsi = await bcrypt.hash(password, 10);
    let Data = {
      file_user: req.file.filename,
      username,
      alamat,
      telepon,
      agama, 
      jenis_kelamin, 
      bagian,
      role,
      email,
      password: enkripsi
    }
    await Model_Users.store(Data);
    req.flash('Success', 'Berhasil Melakukan Register');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('Error', 'Gagal Menyimpan Data Pengguna');
    res.redirect('/register');
  }
});

// route login
router.post('/log', async (req, res) => {
  let { email, password } = req.body;
  // proses login
  try {
  let Data = await Model_Users.login(email);
  // route cek there is a data?
    if (Data.length > 0) {
      req.session.email = Data[0].email;
      let enkripsi = Data[0].password;
      let cek = await bcrypt.compare(password, enkripsi);
      // route cek email/password
        if (cek) {
          req.session.userId = Data[0].id_user;
          req.session.role = Data[0].role;
          req.session.email = Data[0].email;

          //route to leader & users/petugas
          if(Data[0].role == 1){
          req.flash('success', 'Berhasil login!');
          res.redirect('/leader');
          }else if(Data[0].role == 2){
            req.flash('Success', 'berhasil Login!');
            res.redirect('/users');
          }
          else{
            res.redirect('/login')
          }
          //end route
      } else {
        req.flash('error', 'email atau password salah!');
        res.redirect('/login');  //bagian ini masih bermasalah
      }
      //end cek
  } else {
    req.flash('error', 'akun Tidak Ditemukan!');
    res.redirect('/login');
  }
  // end 
} catch (err) {
  res.redirect('/login');
  req.flash('error', 'error pada fungsi');
  console.log(err);
}    
// end process
});

router.get('/logout', function (req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.error(err);
    } else {
      res.redirect('/login');
    }
  });
}); 

module.exports = router;
