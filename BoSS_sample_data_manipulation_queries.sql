--
--
--pilots.html queries
--
--

-- get all pilot_ids, names, brthdates, and species for List Pilots page
SELECT * FROM Pilots;

--add new pilot
INSERT INTO Pilots (name, birthdate, species) VALUES (:nameInput, :birthdateInput, :speciesInput)

--update a Pilot
--get a single Pilot's information for the update Pilot form
SELECT pilot_id, name, birthdate, species FROM Pilots WHERE pilot_id = :pilot_ID_selected_from_browse_pilot_page
--update a Pilot's information based on submission of the Update Pilot form
UPDATE Pilots SET name = :nameInput, birthdate= :birthdateInput, species = :speciesInput

--delete a single Pilot's information for the delete Pilot form
DELETE FROM Pilots WHERE pilot_id = :pilot_ID_selected_from_browse_pilot_page


--
--
--starships.html queries
--
--

-- get all starship_ids, names, types, and pilot_ids for List Starships page
SELECT * FROM Starships;

--add new Starship
-- get all pilot_ids and names to populate the pilot dropdown
SELECT pilot_id, name FROM Pilots
--insert data for a new Starship into the Starships table
INSERT INTO Starships (name, type, pilot_id) VALUES (:nameInput, :typeInput, :pilot_ID_Input) WHERE :pilot_ID_Input=:pilot_id_from_dropdown_Input

--update a Starship
-- get all pilot_ids and names to populate the pilot dropdown
SELECT pilot_id, name FROM Pilots
--get a single Starship's information for the update Starship form
SELECT starship_id, name, type, pilot_id FROM Starships WHERE starship_id = :starship_ID_selected_from_browse_starship_page
--update a Starship's information based on submission of the Update Starship form
UPDATE starship_id SET name = :nameInput, type = :typeInput, pilot_id = :pilot_id_from_dropdown_Input

--delete a single Starships's information for the delete Pilot form
DELETE FROM Starships WHERE starship_id = :starship_ID_selected_from_browse_starship_page


--
--
--weapon_loadouts.html queries
--
--

-- get all weapon_ids, types, and starships_ids for List Weapon Loadouts page
SELECT * FROM Weapon_Loadouts;

--add new weapon loadout
-- get all starship_ids and names to populate the starship dropdown
SELECT starship_id, name FROM Starships
--insert data for a new Weapon_Loadout into the Weapon_Loadouts table
INSERT INTO Weapon_Loadouts (type, starship_id) VALUES (:typeInput, :starship_ID_Input) WHERE :starship_ID_Input=:starship_id_from_dropdown_Input

--update a weapon loadout
--get a single weapon loadout's information for the update weapon loadouts form
SELECT weapon_id, type, starship_id FROM Weapon_Loadouts WHERE weapon_id = :weapon_ID_selected_from_browse_weapon_loadout_page
--update a Starship's information based on submission of the Update Starship form
UPDATE weapon_id SET type = :typeInput, starship_id = :starship_id_from_dropdown_Input

--delete a single Starships's information for the delete Pilot form
DELETE FROM Weapon_Loadouts WHERE weapon_id = :weapon_ID_selected_from_browse_weapon_loadout_page



--
--
--hyperspace_routes.html queries
--
--

-- get all route_ids and names for List Hyperspace Routes page
SELECT * FROM Hyperspace_Routes;

--add new Hyperspace Route
--insert data for a new Weapon_Loadout into the Weapon_Loadouts table
INSERT INTO Hyperspace_Routes (name) VALUES (:nameInput)

--update a Hyperspace Route
--get a single Hyperspace Route's information for the update weapon loadouts form
SELECT route_id, name FROM Hyperspace_Routes WHERE route_id = :route_ID_selected_from_browse_hyperspace_routes_page
--update a Starship's information based on submission of the Update Starship form
UPDATE route_id SET name = :nameInput

--delete a single Starships's information for the delete Pilot form
DELETE FROM Hyperspace_Routes WHERE route_id = :route_ID_selected_from_browse_Hyperspace_Routes_page