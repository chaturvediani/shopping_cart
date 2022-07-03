const express=require('express')
const cors = require('cors')
const app = express();
var bodyParser=require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  database: "shopping_cart",
  user: "root",
  password: "animeshc123"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  connection.query("SELECT * FROM products;", (err, results, fields) => {
    if(err) throw err;
    res.send(results);
  });
});

app.post('/customers',(req,res)=>{
  let sql = `INSERT INTO customers (name,email,password,contact) VALUES (?,?,?,?);`;
  let name=req.body.name;
  let email=req.body.email;
  let password=req.body.password;
  let contact=req.body.contact;
  data=[name,email,password,contact]
  // let data = {name: req.body.name, email:req.body.email,password:req.body.password,contact:req.body.contact};
  // console.log(data)
  let q = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
})



app.post('/login',(req,res)=>{
  let email = req.body.email;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM customers WHERE email = ? AND password = ?', [email, password], function(error, results) {
			// If there is an issue with the query, output the error
			if (error) throw error;
      console.log(results)
			// If the account exists
			if (results.length > 0) {
        console.log("user logged in")
        res.json({
          name: req.body.name,
          email: req.body.email,
          contact: req.body.contact,
        });
			} else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

const idgenerator=()=>{
  
}
app.post('/checkout',(req,res)=>{
  let sql = `INSERT INTO orders (id,proname,quantity,amount) VALUES (?,?,?,?);`;
      let id=idgenerator();
      let proname=req.body.proname;
      let quantity=req.body.quantity;
      let amount=req.body.amount;
      data=[id,proname,quantity,amount]
  // let data = {name: req.body.name, email:req.body.email,password:req.body.password,contact:req.body.contact};
  // console.log(data)
  let q = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
})

app.listen(8000, (err) => {
  if (err) throw err;
  console.log(`App listening on port`)
});