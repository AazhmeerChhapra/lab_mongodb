const User = require('../models/user')
const Item = require('../models/itemModel')
const {v4: uuidv4} = require('uuid');
const {setUser, getUser} = require('../service/auth')
async function handleUserSignup(req, res){
	const {name, email, password} = req.body;
	await User.create({
		name, 
		email,
		password,
	});

	const sessionId = uuidv4();
	setUser(sessionId, user);
	try {
        // Retrieve items from the database
        const items = await Item.find();
        
        // Render the index view with the items
        return res.render('index', { items });
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).send('Internal Server Error');
    }
}

async function handleUserLogin(req, res){
	const {email, password} = req.body;
	const user = await User.findOne({email, password});
	if(!user) 
		return res.render("login", {error: "Invalid email or password"});

	const sessionId = uuidv4();
	setUser(sessionId, user);
	res.cookie("uid", sessionId);
	
	try {
        // Retrieve items from the database
        const items = await Item.find();
        
        // Render the index view with the items
        return res.render('index', { items });
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).send('Internal Server Error');
    }

}

module.exports = {
	handleUserSignup,
	handleUserLogin,
};
