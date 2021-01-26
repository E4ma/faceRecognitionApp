const express = require('express');
const bodyParser = require('body-parser');



const app = express();

//to check pass on signin, temp db containing array of objs

app.use(bodyParser.json());


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@email.com',
            password: 'cookies',
            entries: 0,
            //entries to track rank
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@email.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

//create basic route to make sure everything is working
app.get('/', (req, res)=> {
    res.send(database.users);

})

//to tackle signin route
app.post('/signin', (req, res) => {
    //to test everything is working
    // res.json('signing');
    //when sendn json/using req.body = parse it if not error
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
        res.json('success');
        } else {
            res.status(400).json('error login in');
        }
})
//then test by POST localhost:3000/signin then send
// express comes with res.json instead of res.send (hit raw and then under text=json)
// we receive a json string on Postman

//REGISTER
app.post('/register', (req, res) => {
    //new user will be created
    //because database is an array can use push method
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})



app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})

/*Planning My API
/ --> root route/endpoint that res = this is working
/signin --> POST req to res = success/fail
(used POST because we dont want to send password in body instead of query string over hhtps so it is hidden from man in the middle attacks)
/register --> POST = return user
/profile/:userID (profile route with optional paramater of userID)--> GET = user
(to make sure count increases)
/image --> PUT = updated user info 
*/ 

