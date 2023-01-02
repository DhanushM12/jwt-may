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
    jwt.sign(user, 'secret', function(err, token) {
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

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is up and running on port: ${port}`)
})