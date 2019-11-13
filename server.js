const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express();
app.use(express.json());
const database = {
	users: [
	{
		id: '123',
		name:'John',
		email: 'john@gmail.com',
		password: 'cookes',
		entries: 0,
		joined: new Date()
	},
	{
		id: '134',
		name:'Sally',
		email: 'Sally@gmail.com',
		password: 'bananas',
		entries: 1,
		joined: new Date()
	},
	{
		id: '124',
		name:'George',
		email: 'George@gmail.com',
		password: 'bookie',
		entries: 2,
		joined: new Date()
	},
	{
		id: '143',
		name:'Benny',
		email: 'Benny@gmail.com',
		password: 'bdkdkdk',
		entries: 3,
		joined: new Date()
	},


	],
	login: [
	{
		id: '987',
		hash: '',
		email: 'john@gmail.com'
	}]
}
app.use(cors());
app.get('/', (req, res ) => {
	res.send(database.users);
})

//signing route
app.post('/signin', (req, res) =>{
	//res.send('signing')
	//encrypring the password
// Load hash from your password DB.
// bcrypt.compare("apples", '$2a$10$LqxTmtFvsz5o4rmrInL1levbQ.uQBNQyoJps9RT2sefmru6nJvsn2'
// , function(err, res) {
//     // res == true
//     console.log('first guess', res)
// });
// bcrypt.compare("apple", '$2a$10$6IOxCY6PqfWe0BG8SYndren58Aqlx/xrmIfPqgJj4AULub6qLJFFS'
// 	, function(err, res) {
//     // res = false
//     console.log('second guess', res)
// });
	if(req.body.email === database.users[0].email && 
		req.body. password === database.users[0].password){
	res.json(database.users[0]);
}else{
	res.status(400).json('error logging in');
}
})

//register
app.post('/register', (req, res) =>{
	const {email, name, password} = req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log('hash', hash)
});
	database.users.push({
		id: '129',
		name:name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})
//get user route 

app.get('/profile/:id', (req, res) => {
	const{id} =req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id){
			found= true;
			 return res.json(user)
		}
		
	})
	if(!found)
		{
			res.status(404).json('not found');
		}
})

//image entries counter route

	app.put('/image', (req, res) => {
		const{id} =req.body; 
	let found = false;
	database.users.forEach(user => {
		if (user.id === id){
			found= true;
			user.entries++;
			 return res.json(user.entries)
		}
		
	})
	if(!found)
		{
			res.status(404).json('not found');
		}
	})
app.listen(5000, ()=>{
	console.log('app is running on port 5000');
})
//encrypring the password
// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
/*
-->this is working
/signin --> Post = success or fail
/register ---> post =new user
/profile/:userId -->Get = user
/image --> PUT -->updated user
*/
