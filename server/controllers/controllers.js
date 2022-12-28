var passport = require('passport');
const usermodel=require('../models/usermodel')
const incomemodel=require('../models/incomemodel')

module.exports={

    signup:(req,res,next)=>{

        console.log(req.body);
        if(req.body.password === req.body.cpassword){
            let user=new usermodel({
                name:req.body.name,
                password:req.body.password
            })
            user
                .save()
                .then(()=>{
                    res.redirect('/login')
                })
                .catch((err)=>{
                        console.log(err)
                })
        }
        else{
            res.render('signup',{status:true})
        }

    },

    login:async(req,res,next)=>{

        console.log(req.body);
        let {name,password}=req.body

        const user = await usermodel.findOne({ name: name,password:password });
    if (!user) {
      res.render('login',{status:true})
    }
    else{
        console.log(user);
        req.session.user = user;
        req.session.userloggedIn = true;
        res.redirect('/')
    }
    },
    add:(req,res,next)=>{


        const income=new incomemodel({
            userid:req.body.userid,
            title:req.body.title,
            type:req.body.type,
            amount:req.body.amount,
            incdate:req.body.incdate
        })
        income.save()
            .then(()=>{
                res.redirect('/')
            })
           .catch((err)=>{
                console.log(err);
           })
    },
    update:(req,res,next)=>{
        let id=req.params.id
        console.log(req.body);
        console.log(id);
        incomemodel.findByIdAndUpdate(id,req.body,{ useFindAndModify: false})
            .then((data)=>{
                if(!data){
                    res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
                }else{
                        res.redirect('/')
                }
            })
            .catch((err)=>{
                res.status(500).send({ message : "Error Update user information"})
            })
    },
    delete:(req,res,next)=>{
        let id=req.params.id
        console.log(id);
        incomemodel.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.redirect('/')
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
    }
}