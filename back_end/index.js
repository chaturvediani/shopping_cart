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

app.get('/customer', (req, res) => {
  connection.query("SELECT * FROM customers;", (err, results, fields) => {
    if(err) throw err;
    res.send(results);
  });
});
app.patch('/customer/:cust_id',(req,res)=>{
  connection.query("UPDATE customers SET name=?, place=?,address=? WHERE cust_id=?",[req.body.name,req.body.place, req.body.address, req.params.cust_id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
})


app.get('/order', (req, res) => {
  connection.query("SELECT * FROM orders;", (err, results, fields) => {
    if(err) throw err;
    res.send(results);
  });
});
app.patch('/order/:pro_id',(req,res)=>{
  connection.query("UPDATE orders SET pro_name=?, quantity=?,amount=? WHERE pro_id=?",[req.body.pro_name,req.body.quantity, req.body.amount, req.params.pro_id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
})




app.post('/customers',(req,res)=>{
  let sql = `INSERT INTO customers (cust_id,name,place,address) VALUES (?,?,?,?);`;
  let cust_id=req.body.cust_id;
  let name=req.body.name;
  let place=req.body.place;
  let address=req.body.address;
  // let id=req.body.id;
  // let pro_id=req.body.pro_id;
  data=[cust_id,name,place,address]
  let q = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send({cust_id:cust_id,name:name,place:place,address:address})
    // res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
})

app.post('/orders',(req,res)=>{
  let sql = `INSERT INTO orders (pro_id,pro_name,cust_id,quantity,amount) VALUES (?,?,?,?,?);`;
  let pro_id=req.body.pro_id;
  let pro_name=req.body.pro_name;
  let cust_id=req.body.cust_id;
  let quantity=req.body.quantity;
  let amount=req.body.amount;
  // let id=req.body.id;
  // let pro_id=req.body.pro_id;
  data=[pro_id,pro_name,cust_id,quantity,amount]
  let q = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send({pro_id:pro_id,pro_name:pro_name,cust_id:cust_id,quantity:quantity,amount:amount});
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



app.listen(8000, (err) => {
  if (err) throw err;
  console.log(`App listening on port`)
});