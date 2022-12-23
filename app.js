const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
let users = [
    {id: 1, nom: 'TestNom', prenom: "TestPrenom", age:25},
    {id: 2, nom: 'TestNom2', prenom: "TestPrenom2", age:35},
    {id: 3, nom: 'TestNom3', prenom: "TestPrenom3", age:40},
]

app.get('/users', (req, res) => {
    res.render('list', { users })
})

app.get('/users/:userId', (req, res) => {
    let user;
    const userId = req.params.userId
    for(let i=0; i<users.length; i++){
        if(userId == users[i].id){
            user = users[i]
        }
    }
    res.render('detail', {user})
})

app.get('/users-new', (req, res) => {
    res.render('new')
})

app.post('/users', (req, res)=> {
    const i = req.body.id
    const n = req.body.nom
    const p = req.body.prenom
    const a = req.body.age
    users.push({id: i, nom : n, prenom:p, age: a})
    res.redirect('/users')
})

app.get('/users/:userId/delete', (req, res) => {
    const userId = req.params.userId
    users = users.filter(u => u.id != userId)
    res.redirect('/users')
})

app.get('/users/:userId/edit', (req, res)=> {
    const userId = req.params.userId
    const user = users.find(u => u.id == userId)
    res.render('edit', {user})
})

app.listen(9000)

