

// Get the objects we need to modify
let updatePermitForm = document.getElementById('update-permit-ajax');

// Modify the objects we need
updatePermitForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let permitID = document.getElementById("mySelect");
    let inputStarship = document.getElementById("update-starship");
    let inputRoute = document.getElementById("update-route");

    // Get the values from the form fields
    let permitIDValue = permitID.value;
    let inputStarshipValue = inputStarship.value;
    let inputRouteValue = inputRoute.value;
    
    // capture Null values

    if (isNaN(inputStarshipValue)) 
    {
        inputStarshipValue = 'NULL';
    }

    if (isNaN(inputRouteValue)) 
    {
        inputRouteValue = 'NULL';
    }


    // Put our data we want to send in a javascript object
    let data = {
        permitID: permitIDValue,
        starshipID: inputStarshipValue,
        routeID: inputRouteValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-permit-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, permitIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, permitID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("permit-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == permitID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of starship value
            let td = updateRowIndex.getElementsByTagName("td")[1];

            // Reassign homeworld to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
    location.reload();
}