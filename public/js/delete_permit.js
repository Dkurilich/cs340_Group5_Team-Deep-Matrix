// Citation for code:
// Date: 11/16/23
// Adapted from https://github.com/osu-cs340-ecampus/nodejs-starter-app



function deletePermit(permitID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: permitID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-permit-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deletePermitRow(permitID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deletePermitRow(permitID){

    let table = document.getElementById("permit-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == permitID) {
            table.deletePermitRow(i);
            break;
       }
    }
    location.reload();
}