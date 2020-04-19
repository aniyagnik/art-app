const app=require('express')()
const passport=require('passport')
const GoogleStratergy=require('passport-google-oauth20')
const keys=require('./keys')
const {check_userLogin, insert_userLogin, get_userLogin}=require('./database/userCollection')


passport.serializeUser(function (user, done) {
    console.log('in serializeUser',user)
    console.log('in serializeUser',user._id)
    done(null, user._id)
})

passport.deserializeUser(function (userId, done) {
    console.log('in deserializeUser')
    get_userLogin(userId)
    .then(user=>{
        if(user){ 
            //console.log('user found')
            return done(null,user)}
        else{
            console.log('user not found')
            return done(null,false,{message:'user not found'})}
    })
    .catch(err=>{
        console.log('error in finding the account')
        return done(err)
    })
})

passport.use(
    new GoogleStratergy({
        //options for google stratergy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret:  keys.google.clientSecret
    },async (acesssToken,refreshToken,profile,done)=>{
        //passport callback function
        const userInfo={...profile._json,cart:[]}
        let user=await check_userLogin(userInfo.sub)
        if(user){
            //user exist
            done(null,user)
        }
        else{
            //new user
            user=await insert_userLogin(userInfo)
            done(null,user)
        }
    })
)

app.get('/google',passport.authenticate('google',{
    scope:['profile']
}))


app.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/user/dashboard')
})

module.exports=app;
