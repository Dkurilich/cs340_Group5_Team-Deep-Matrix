--
--
--pilots.html queries
--
--

-- get all pilot_ids, names, brthdates, and species for List Pilots page
SELECT Pilots.pilot_id AS "Pilot_ID", Pilots.name AS "Name", Pilots.birthdate AS "Birthdate", Pilots.species AS "Species" FROM Pilots;

--add new pilot
INSERT INTO Pilots (name, birthdate, species) VALUES (:nameInput, :birthdateInput, :speciesInput);

--update a Pilot
--get a single Pilot's information for the update Pilot form
SELECT pilot_id, name, birthdate, species FROM Pilots WHERE pilot_id = :pilot_ID_selected_from_browse_pilot_page;
--update a Pilot's information based on submission of the Update Pilot form
UPDATE Pilots SET name = :nameInput, birthdate= :birthdateInput, species = :speciesInput;

--delete a single Pilot's information for the delete Pilot form
DELETE FROM Pilots WHERE pilot_id = :pilot_ID_selected_from_browse_pilot_page;





--
--
--starships.html queries
--
--

-- get all starship_ids, names, types, and pilots for List Starships page
SELECT Starships.starship_id AS "Starship_ID", Starships.name AS "Name", Starships.type AS "Type", Pilots.name AS "Pilot" 
FROM Starships JOIN Pilots ON Starships.pilot_id = Pilots.pilot_id;

--add new Starship
-- get all pilot_ids and names to populate the pilot dropdown
SELECT pilot_id, name FROM Pilots;
--insert data for a new Starship into the Starships table
INSERT INTO Starships (name, type, pilot_id) VALUES (:nameInput, :typeInput, :pilot_id_from_dropdown_Input);

DELETE FROM Starships WHERE starship_id = :starship_id_selected;




--
--
--weapon_loadouts.html queries
--
--

-- get all weapon_ids, types, and starships_ids for List Weapon Loadouts page
SELECT Weapon_Loadouts.weapon_id AS "Weapon_ID", Weapon_Loadouts.type AS "Type", Starships.name AS "Starship" 
FROM Weapon_Loadouts JOIN Starships ON Weapon_Loadouts.starship_id = Starships.starship_id;

--add new weapon loadout
-- get all starship_ids and names to populate the starship dropdown
SELECT starship_id, name FROM Starships;
--insert data for a new Weapon_Loadout into the Weapon_Loadouts table
INSERT INTO Weapon_Loadouts (type, starship_id) VALUES (:typeInput, :starship_id_from_dropdown_Input);

--delete from Weapon_Loadouts
DELETE FROM Weapon_Loadouts WHERE weapon_id = :weapon_id_selected;



--
--
--hyperspace_routes.html queries
--
--

-- get all route_ids and names for List Hyperspace Routes page
SELECT Hyperspace_Routes.route_id AS "Hyperspace_Route_ID", Hyperspace_Routes.name AS "Name" FROM Hyperspace_Routes;

--add new Hyperspace Route
--insert data for a new Weapon_Loadout into the Weapon_Loadouts table
INSERT INTO Hyperspace_Routes (name) VALUES (:nameInput);
INSERT INTO Planets_In_Routes (planet_id, route_id) VALUES (:planet_ID_Input, :hyperspace_route_ID_input);

DELETE FROM Hyperspace_Routes WHERE route_id = :route_id_selected;



--
--
--planets.html queries
--
--

-- get all planet_ids, names, regions for List Planets page
SELECT Planets.planet_id AS "Planet_ID", Planets.name AS "Name", Planets.region AS "Region" FROM Planets;

--add new Planet
--insert data for a new Planet
INSERT INTO Planets (name, region) VALUES (:nameInput, :regionInput);
INSERT INTO Planets_In_Routes (planet_id, route_id) VALUES (:planet_ID_Input, :hyperspace_route_ID_input);




--
--
--starship_route_permits.html queries
--
--

-- get all permit_ids, starship_ids, route_ids, and date_permits for List Starship Route Permits page
SELECT Starship_Route_Permits.permit_id AS "Permit_ID", Starships.name AS "Starship", Hyperspace_Routes.name AS "Hyperspace_Route", Starship_Route_Permits.date_permit AS "Date_of_Permit"
FROM Starship_Route_Permits LEFT OUTER JOIN Starships ON Starship_Route_Permits.starship_id = Starships.starship_id
LEFT OUTER JOIN Hyperspace_Routes ON Starship_Route_Permits.route_id = Hyperspace_Routes.route_id;

--add Starship Route Permit
-- get all starship_ids and names to populate the starship dropdown
SELECT starship_id, name FROM Starships;
-- get all route_ids and names to populate the Hyperspace Routes dropdown
SELECT route_id, name FROM Hyperspace_Routes;
--insert data for a new Starship Route Permit
INSERT INTO Starship_Route_Permits (starship_id, route_id, date_permit) VALUES (:starship_id_from_dropdown_Input, :hyperspace_route_ID_from_dropdown_Input, :dateInput);


--update a Starship Route Permit
--get a single Starship Route Permit's information for the update Starship Route Permit form
SELECT permit_id, starship_id, route_id, date_permit FROM Starship_Route_Permits WHERE permit_id = :permit_id_selected_from_browse_permits_page;
--update a Starship's information based on submission of the Update Starship form
UPDATE permit_id SET starship_id = :starship_id_from_dropdown_Input, route_id = route_id_from_dropdown_Input, date_permit = :date_Input;

--delete a single Starships's information for the delete Pilot form
DELETE FROM Starship_Route_Permits WHERE permit_id = :permit_ID_selected_from_browse_permits_page;





--
--
--planets_in_routes.html queries
--
--

-- 
SELECT Planets_In_Routes.planet_route_id AS "Planet_Route_ID", Planets.name AS "Planet", Hyperspace_Routes.name AS "Hyperspace_Route"
FROM Planets_In_Routes JOIN Planets ON Planets_In_Routes.planet_id = Planets.planet_id
JOIN Hyperspace_Routes ON Planets_In_Routes.route_id = Hyperspace_Routes.route_id;

--add Planet in Route
-- get all planet_ids and names to populate the Planet dropdown
SELECT planet_id, name FROM Planets;
-- get all route_ids and names to populate the Hyperspace Routes dropdown
SELECT route_id, name FROM Hyperspace_Routes;
--insert data for a new Starship Route Permit
INSERT INTO Planets_In_Routes (planet_id, route_id) VALUES (:planet_id_from_dropdown_Input, :hyperspace_route_ID_from_dropdown_Input, :dateInput);