const express = require('express')
const app = express();
const port = 8000;
const jwt = require('jsonwebtoken');
app.get('/', (req, res) => {

    res.json({message: "Welcome to your rest api"})
    // res.send('<h1>Welcome to Node js!!!</h1>')
})

app.post('/tokenGenerate', (req, res) => {
    const user = {
        id: 1,
        username: 'maybatch22',
        email: 'may@coding.com'
    }
    jwt.sign(user, 'secret',{ expiresIn: '60s'}, function(err, token) {
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json({
                token
            })
        }
      });
})


app.post('/verifyToken', extractToken,(req, res) => {
    jwt.verify(req.token, 'secret', function(err, data) {
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json({
                message: 'user access granted', 
                data
            })
        }
        
      });
})


//
function extractToken(req, res, next){
    const bearerHeader = req.headers['authorization'];//  Bearer Token
    if(bearerHeader !== undefined){
        const bearer = bearerHeader.split(' '); //['Bearer', 'Token']
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    }
    else{
        res.sendStatus(403)
    }
}

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is up and running on port: ${port}`)
})