var passport = require('passport');
const incomemodel=require('../models/incomemodel')

var controllers=require('../controllers/controllers')

module.exports={

    index:(req,res,next)=>{
        let user=req.session.user
        if(req.session.userloggedIn){
          let user=req.session.user
          let userid=null
          user.id?userid=user.id:userid=user._id
          incomemodel.find({userid:userid})
          .then((result)=>{
            console.log(result);
            res.render('index',{user,income:result,userloggedin:true})
          })
        }
        
        else{
        incomemodel.find()
        .then((result)=>{
          console.log(result);
          let user=req.session.user
          res.render('index',{user,income:result})
        })
      }

        
        
    },
    signup:(req,res,next)=>{
        res.render('signup')
    },
    login:(req,res,next)=>{
        res.render('login')
    },
    income:(req,res,next)=>{
        let user=req.session.user
        res.render('income',{user})
    },
    edit:(req,res,next)=>{
        let id=req.params.id
        incomemodel.findById(id)
            .then((result)=>{
                let user=req.session.user
                res.render('income',{user,income:result})
            })
        
    }

}