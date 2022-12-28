var express = require('express');
var router = express.Router();

const services=require('../services/renders')
const controllers=require('../controllers/controllers')

const verifyLogin = (req, res, next) => {
    if (req.session.userloggedIn) next();
    else res.redirect("/login");
  };
  
/* GET home page. */
router.get('/',services.index)

router.get('/signup',services.signup)

router.get('/login',services.login)

router.get('/income',verifyLogin,services.income)

router.get('/edit/:id',verifyLogin,services.edit)

router.post('/signup',controllers.signup)
router.post('/login',controllers.login)
router.post('/add',verifyLogin,controllers.add)
router.post('/update/:id',verifyLogin,controllers.update)
router.get('/delete/:id',verifyLogin,controllers.delete)

module.exports = router;
