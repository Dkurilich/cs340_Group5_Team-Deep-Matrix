// Citation for code:
// Date: 11/16/23
// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteWeapon(weaponID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: weaponID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-weapon-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(weaponID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(weaponID){

    let table = document.getElementById("weapon-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == weaponID) {
            table.deleteRow(i);
            break;
       }
    }
}