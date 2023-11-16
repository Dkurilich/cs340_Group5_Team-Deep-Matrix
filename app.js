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
        let query1 = "SELECT pilot_id,name,birthdate,species FROM Pilots;";               // Define our query

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
        
    let query1 = "SELECT * FROM Starships;";

    let query2= "SELECT * From Pilots;";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let starships = rows

            db.pool.query(query2, (error, rows, fields) => {

                let pilots = rows

                let pilotmap = {}
                pilots.map(pilot => {
                    let id = parseInt(pilot.pilot_id, 10);
    
                    pilotmap[id] = pilot["name"];
                })
    
                // Overwrite the pilot ID with the name of the planet in the people object
                starships = starships.map(starship => {
                    return Object.assign(starship, {pilot_id: pilotmap[starship.pilot_id]})
                })
    
                // END OF NEW CODE
    


            res.render('starships', {data: starships, pilots: pilots});          // Render the starships.hbs file, and also send the renderer
        })                                                     
    })
});    

// add new starship

app.post('/add-starship-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    // Create the query and run it on the database
    query1 = `INSERT INTO Starships (name, type, pilot_id) VALUES ('${data['input-name']}', '${data['input-type']}', '${data['input-pilot']}')`;
 
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


// view data from Starships Table
app.get('/starship_route_permits.html', function(req, res){  

    let query1 = "SELECT * FROM Starship_Route_Permits"
    let query2 = "SELECT * From Starships;"
    let query3 = "SELECT * FROM Hyperspace_Routes"     ;

           db.pool.query(query1, function(error, rows, fields){    // Execute the query
               let permits = rows
   
               db.pool.query(query2, (error, rows, fields) => {
                   let starships = rows
                   let starshipmap = {}
                   starships.map(starship => {
                       let id = parseInt(starship.starship_id, 10);
                       starshipmap[id] = starship["name"];
                   })
                   permits = permits.map(permit => {
                       return Object.assign(permit, {starship_id: starshipmap[permit.starship_id]})
                   })

                db.pool.query(query3, (error, rows, fields) => {
                    let routes = rows
                    let routemap = {}
                    routes.map(route => {
                        let id = parseInt(route.route_id, 10);
                        routemap[id] = route["name"];
                    })
                    permits = permits.map(permit => {
                        return Object.assign(permit, {route_id: routemap[permit.route_id]})
                    })

            res.render('starship_route_permits', {data: permits, starships: starships, routes: routes}); 
}) // close query 3
}) // close query 2
}) // close query 1
});  


// add new permit

app.post('/add-permit-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    // Create the query and run it on the database
    query1 = `INSERT INTO Starship_Route_Permits (starship_id, route_id) VALUES ('${data['input-starship']}', '${data['input-route']}')`;
 
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



/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});    