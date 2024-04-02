const express= require("express");
const app= express();
app.use(express.json()) ;
const dotenv = require('dotenv');
dotenv.config();
const passport= require("./config/google-oauth")
app.use(passport.initialize())

// google_client.authorization.scope=[
//     'https://www.googleapis.com/auth/calendar.readonly',
//     'https://www.googleapis.com/auth/drive.appdata'] 


app.get("/",(req,res)=>{
    res.send("Homepage")
})

  app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));


// const express = require('express');
// const session = require('express-session');
// const passport= require("./config/google-oauth")

// const app = express();
// app.use(express.json()) 

// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }

// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

// app.get('/auth/google',
//   passport.authenticate('google', { scope: [ 'email', 'profile' ] }
// ));

// app.get( '/auth/google/callback',
//   passport.authenticate( 'google', {
//     successRedirect: '/protected',
//     failureRedirect: '/auth/google/failure'
//   })
// );

// app.get('/protected', isLoggedIn, (req, res) => {
//   res.send(`Hello ${req.user.displayName}`);
// });

// app.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('Goodbye!');
// });

// app.get('/auth/google/failure', (req, res) => {
//   res.send('Failed to authenticate..');
// });

const PORT = process.env.PORT ;

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
});


