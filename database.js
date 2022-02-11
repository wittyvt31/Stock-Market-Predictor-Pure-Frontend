
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// localhost = 127.0.0.1
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'myweb'

// use myweb;
// db;

MongoClient.connect(connectionURL, {useNewURLParser: true }, (error, client) => {
	if(error) {
		return console.log('Unable to connect to the database!')
	}

	console.log('Connected successfully!')

	const db = client.db(databaseName)

	db.createRole(
		{
			role:"admin",
		
			privileges:	[
			{	resources: {db: "myweb", collection: ""},
				actions: [ "find", "createCollection", "dbStats", "collStats", "readWrite", "dbAdmin" ]	},
			{}
			],
		
			roles: ["viewer"]	
		
		},
		
		{
			role: "bidder",
		
			privileges:	[
				{	resources: {db: "myweb", collection: ""},
					actions: [ "find", "dbStats", "collStats" ]	},
				{}
				],
			
			roles: ["viewer"]	
		
		},
		
		{
			role: "seller",
		
			privileges:	[
				{	resources: {db: "myweb", collection: ""},
					actions: [ "createCollection", "dbStats", "collStats", "readWrite" ]	},
				{}
				],
			
		
		},
		
		{
			role: "viewer",
		
			privileges:	[
				{	resources: {db: "myweb", collection: ""},
					actions: [ "find", "read" ]	},
				{}
				],
			
		
		},
		
		);
		
		db.createUser(
		{
			user:"Yash",
			pwd:"123123",
			customData: {
			firstname: "Yash",
			lastname: "Shejwal",
			birthdate: "13.11.2002", 
		},
			roles: ["admin", "dbOwner" ]
		},
		{
			user:"Virat",
			pwd:"696969",
			roles: ["admin" ]
		},
		{
			user:"Aniket",
			pwd:"124124",
			roles: ["admin"]
		},
		{
			user:"Tejas",
			pwd:"420420",
			roles: ["admin"]
		},
		{
			user:"Pratiksha",
			pwd:"787878",
			roles: ["bidder"]
		},
		{
			user:"Aditya",
			pwd:"45612",
			roles: ["bidder"]
		},
		{
			user:"Sara",
			pwd:"16112",
			roles: ["seller"]
		},
		{
			user:"Anuja",
			pwd:"78456",
			roles: ["seller"]
		},
		{
			user:"Rutvik",
			pwd:"65132",
			roles: ["viewer"]
		}
		);
		
		
		// roles: bidder, seller, admin, viewer
		// all can view 
		// all but viewer can register, login, edit login info
		// seller: post a product, specify time n price of bidding, view bidding info(of all)
		// bidder: view product details, modify bid amount, make new bid for product
		// admin: manage product > delete, modify, manage depts, users, biddings, create reports
		
		db.createCollection('products');
		
		db.products.insert(
			{
				item_name: "Gujrati Lehenga",
				item_type: "Product",
				avg_price: 2000,
				description: "This traditional Lehenga is used for just 1 time, as good as new condition."
			},
			{
				item_name: "Ramcharitmanas for Laxmipujan",
				item_type: "Product",
				avg_price: 700,
				description: "This book is necessary for Laxmipujan."
			},
			{
				item_name: "Help for complete Home Decoration",
				item_type: "Service",
				avg_price: 750,
				description: "All covid norms will be followed, a very safe service at your home."
			},
			{
				item_name: "Samsung A27 5G (8GB RAM) 128GB",
				item_type: "Product",
				avg_price: 17500
			},
			{
				item_name: "One-Plus 8 5G(12 GB RAM)",
				item_type: "Product",
				avg_price: 15000
			},
			{
				item_name: "Apple Iphone 11 64GB",
				item_type: "Product",
				avg_price: 40000
			},
			{
				item_name: "Hyundai Eon Car",
				item_type: "Product",
				avg_price: 250000,
				description: "Seven years old and still gives 22KMPL mileage."
			}
		);
		
		db.createCollection('bids');
		
		db.bids.insert(
		{
			bid_item: "Hyundai Car",
			seller: "Anuja",
			base_price: 200000,
			current_price: 300000,
			description: "Seven years old and still gives 22KMPL mileage."
		},
		{
			bid_item: "Help for complete Home Decoration",
			seller: "Sara",
			avg_price: 750,
			description: "All covid norms will be followed, a very safe service at your home."
		}
		)
		
		// collections: roles, users, bids, products 
})


