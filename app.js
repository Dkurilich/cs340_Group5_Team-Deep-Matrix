// Citation for code:
// Date: 11/16/23
// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app
/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 7291;                 // Set a port number at the top so it's easy to change in the future


// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.



// Database
var db = require('./db-connector')


/*
    ROUTES
*/
// app.js
// connect webpages 
app.get("/", function(req, res){
    return res.render('index')
  });
  app.get("/index.html", function(req, res){
    return res.render('index')
  });

//   app.get("/pilots.html", function(req, res){
//     return res.render('pilots')
//   });

// view data from Pilots Table
app.get('/pilots.html', function(req, res)
    {  
        let query1 = "SELECT Pilots.pilot_id AS 'Pilot_ID', Pilots.name AS 'Name', Pilots.birthdate AS 'Birthdate', Pilots.species AS 'Species' FROM Pilots;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('pilots', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query



// add new Pilot

app.post('/add-pilot-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    // Create the query and run it on the database
    query1 = `INSERT INTO Pilots (name, birthdate, species) VALUES ('${data['input-name']}', '${data['input-birthdate']}', '${data['input-species']}')`;
    //query2 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${homeworld}, ${age})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/pilots.html');
        }
    })
})

// view data from Starships Table
app.get('/starships.html', function(req, res){  
        
    let query1 = "SELECT Starships.starship_id AS 'Starship_ID', Starships.name AS 'Name', Starships.type AS 'Type', Pilots.name AS 'Pilot' FROM Starships LEFT JOIN Pilots ON Starships.pilot_id = Pilots.pilot_id;";

    let query2= "SELECT * From Pilots;";

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        let starships = rows

        db.pool.query(query2, (error, rows, fields) => {

            let pilots = rows;

            return res.render('starships', {data: starships, pilots: pilots});
        })                                                     
    })
});    

// add new starship

app.post('/add-starship-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    let pilot = parseInt(data['input-pilot']);
    if (isNaN(pilot))
    {
        pilot = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Starships (name, type, pilot_id) VALUES ('${data['input-name']}', '${data['input-type']}', ${pilot})`;
 
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/starships.html');
        }
    })
})


// view data from Starship Route Permits Table
app.get('/starship_route_permits.html', function(req, res){  

    let query1 = "SELECT Starship_Route_Permits.permit_id AS 'Permit_ID', Starships.name AS 'Starship', Hyperspace_Routes.name AS 'Hyperspace_Route', Starship_Route_Permits.date_permit AS 'Date_of_Permit' FROM Starship_Route_Permits LEFT OUTER JOIN Starships ON Starship_Route_Permits.starship_id = Starships.starship_id LEFT OUTER JOIN Hyperspace_Routes ON Starship_Route_Permits.route_id = Hyperspace_Routes.route_id;"
    let query2 = "SELECT * From Starships;"
    let query3 = "SELECT * FROM Hyperspace_Routes;"

    db.pool.query(query1, function(error, rows, fields){
        let starshipRoutePermits = rows;

        db.pool.query(query2, (error, rows, fields) => {
            let starships = rows;

            db.pool.query(query3, (error, rows, fields) => {
                let routes = rows;

                return res.render('starship_route_permits', {data: starshipRoutePermits, starships: starships, routes: routes});
            })
        })
    })
});  


// add new permit

app.post('/add-permit-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let starship = parseInt(data['input-starship']);
    if (isNaN(starship))
    {
        starship = 'NULL'
    }

    let route = parseInt(data['input-route']);
    if (isNaN(route))
    {
        route = 'NULL'
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Starship_Route_Permits (starship_id, route_id, date_permit) VALUES (${starship}, ${route}, '${data['input-date-permit']}')`;
 
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/starship_route_permits.html');
        }
    })
})


//Edit starship route permits

app.put('/put-permit-ajax', function(req,res,next){
    let data = req.body;
  
    let permitID = parseInt(data.permitID);
    let starshipID = parseInt(data.starshipID);
    let routeID = parseInt(data.routeID);

    //capture Null values
    if (isNaN(starshipID)) 
    {
        starshipID = 'NULL';
    }

    if (isNaN(routeID)) 
    {
        routeID = 'NULL';
    }

    let queryUpdate = `UPDATE Starship_Route_Permits SET starship_id = ${starshipID}, route_id = ${routeID} WHERE permit_id = ?`;
    let selectpermitID = `SELECT permit_id, starship_id, route_id FROM Starship_Route_Permits WHERE permit_id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdate, [permitID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the permit's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectpermitID, [permitID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});


//delete a starship route permit
app.delete('/delete-permit-ajax', function(req, res, next){
    let data = req.body;
    let permitID = parseInt(data.id);

    let deletePermit = `DELETE FROM Starship_Route_Permits WHERE permit_id = ?`;

    db.pool.query(deletePermit, [permitID], function(error, rows, fields){
        if(error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
    })

});


// View data from Weapon Loadouts table
app.get('/weapon_loadouts.html', function(req, res)
{
    let query1 = 'SELECT Weapon_Loadouts.weapon_id AS "Weapon_ID", Weapon_Loadouts.type AS "Type", Starships.name AS "Starship" FROM Weapon_Loadouts JOIN Starships ON Weapon_Loadouts.starship_id = Starships.starship_id;'

    let query2 = "SELECT * FROM Starships;"

    db.pool.query(query1, function(error, rows, fields){
        
        let weapons = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let starships = rows;
            return res.render('weapon_loadouts', {data: weapons, starships: starships});
        })

    })

});

app.post('/add-weapon-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Weapon_Loadouts (type, starship_id) VALUES ('${data['input-type']}', '${data['input-starship']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/weapon_loadouts.html');
        }
    })
})

app.delete('/delete-weapon-ajax', function(req, res, next){
    let data = req.body;
    let weaponID = parseInt(data.id);

    let deleteWeapon = `DELETE FROM Weapon_Loadouts WHERE weapon_id = ?`;

    db.pool.query(deleteWeapon, [weaponID], function(error, rows, fields){
        if(error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }
    })

});

// View data from Hyperspace Routes table
app.get('/hyperspace_routes.html', function(req, res)
{
    let query1 = "SELECT Hyperspace_Routes.route_id AS 'Hyperspace_Route_ID', Hyperspace_Routes.name AS 'Name' FROM Hyperspace_Routes;"

    db.pool.query(query1, function(error, rows, fields){
        res.render('hyperspace_routes', {data: rows});
    })

});

app.post('/add-route-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Hyperspace_Routes (name) VALUES ('${data['input-name']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/hyperspace_routes.html');
        }
    })
})

// View data from Hyperspace Routes table
app.get('/planets.html', function(req, res)
{
    let query1 = "SELECT Planets.planet_id AS 'Planet_ID', Planets.name AS 'Name', Planets.region AS 'Region' FROM Planets;"

    db.pool.query(query1, function(error, rows, fields){
        res.render('planets', {data: rows});
    })

});

app.post('/add-planet-form', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO Planets (name, region) VALUES ('${data['input-name']}', '${data['input-region']}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/planets.html');
        }
    })
})

// View data from Planets In Routes table
app.get('/planets_in_routes.html', function(req, res)
{
    let query1 = "SELECT Planets_In_Routes.planet_route_id AS 'Planet_Route_ID', Planets.name AS 'Planet', Hyperspace_Routes.name AS 'Hyperspace_Route' FROM Planets_In_Routes JOIN Planets ON Planets_In_Routes.planet_id = Planets.planet_id JOIN Hyperspace_Routes ON Planets_In_Routes.route_id = Hyperspace_Routes.route_id;"

    let query2 = "SELECT * FROM Planets;"

    let query3 = "SELECT * FROM Hyperspace_Routes;"

    db.pool.query(query1, function(error, rows, fields){
        let planetsInRoutes = rows;

        db.pool.query(query2, (error, rows, fields) => {
            let planets = rows;

            db.pool.query(query3, (error, rows, fields) => {
                let routes = rows;

                return res.render('planets_in_routes', {data: planetsInRoutes, planets: planets, routes: routes});
            })
        })
    })

});

app.post('/add-planet-in-route-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Planets_In_Routes (planet_id, route_id) VALUES ('${data['input-planet']}', '${data['input-route']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/planets_in_routes.html');
        }
    })
})




/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});    