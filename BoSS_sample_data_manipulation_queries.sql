-- These are some Database Manipulation queries for a partially implemented Project Website 
-- using the BoSS Project Group 5 database.


-- get all Planet IDs and Names to populate the Homeworld dropdown
SELECT planet_id, name FROM bsg_planets

-- get all characters and their homeworld name for the List People page
SELECT bsg_people.character_id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id

-- get a single character's data for the Update People form
SELECT character_id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = :character_ID_selected_from_browse_character_page

-- get all character's data to populate a dropdown for associating with a certificate  
SELECT character_id AS pid, fname, lname FROm bsg_people 
-- get all certificates to populate a dropdown for associating with people
SELECT certification_id AS cid, title FROM bsg_cert

-- get all peoople with their current associated certificates to list
SELECT pid, cid, CONCAT(fname,' ',lname) AS name, title AS certificate 
FROM bsg_people 
INNER JOIN bsg_cert_people ON bsg_people.character_id = bsg_cert_people.pid 
INNER JOIN bsg_cert on bsg_cert.certification_id = bsg_cert_people.cid 
ORDER BY name, certificate

-- add a new character
INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (:fnameInput, :lnameInput, :homeworld_id_from_dropdown_Input, :ageInput)

-- associate a character with a certificate (M-to-M relationship addition)
INSERT INTO bsg_cert_people (pid, cid) VALUES (:character_id_from_dropdown_Input, :certification_id_from_dropdown_Input)

-- update a character's data based on submission of the Update Character form 
UPDATE bsg_people SET fname = :fnameInput, lname= :lnameInput, homeworld = :homeworld_id_from_dropdown_Input, age= :ageInput WHERE id= :character_ID_from_the_update_form

-- delete a character
DELETE FROM bsg_people WHERE id = :character_ID_selected_from_browse_character_page

-- dis-associate a certificate from a person (M-to-M relationship deletion)
DELETE FROM bsg_cert_people WHERE pid = :character_ID_selected_from_certificate_and_character_list AND cid = :certification_ID_selected_from-certificate_and_character_list



--
--
--Pilots.html queries
--
--


-- get all pilot_ids, names, brthdates, and species for List Pilots page
SELECT * FROM Pilots;


--add new pilot
INSERT INTO Pilots (name, birthdate, species) VALUES (;nameInput, :birthdateInput, :speciesInput)


--update a Pilot
--get a single Pilot's information for the update Pilot form
SELECT pilot_id, name, birthdate, species FROM Pilots WHERE pilot_id = :pilot_ID_selected_from_browse_pilot_page
--update a Pilot's information based on submission of the Update Pilot form
UPDATE Pilots SET name = :nameInput, birthdate= :birthdateInputInput, species = :speciesInput


--delete a single Pilot's information for the delete Pilot form
DELETE FROM Pilots WHERE pilot_id = :pilot_ID_selected_from_browse_pilot_page

--
--
--Starships.html queries
--
--


-- get all starship_, names, types, and pilot_ids for List Starships page
SELECT * FROM Starships;


--add new Starship
-- get all pilot_ids and names to populate the pilot dropdown
SELECT pilot_id, name FROM Pilots
--insert data for a new Starship into the Starships table
INSERT INTO Starships (name, type, pilot_id) VALUES (;nameInput, :typeInput, :pilot_ID_Input) WHERE :pilot_ID_Input=:pilot_id_from_dropdown_Input


--get a single Starship's information for the update Starship form
SELECT starship_id, name, type, pilot_id FROM Starships WHERE pilot_id = :pilot_ID_selected_from_browse_pilot_page


--delete a single Pilot's information for the delete Pilot form
DELETE FROM Starships WHERE starship_id = :starship_ID_selected_from_browse_starship_page