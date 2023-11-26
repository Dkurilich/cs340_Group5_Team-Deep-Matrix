-- Group 5  Step 3 Draft

-- minimize import errors
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- create (or replace) Pilots table
CREATE OR REPLACE TABLE Pilots (
    pilot_id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    birthdate DATE NOT NULL,
    species varchar(255) NOT NULL,
    PRIMARY KEY (pilot_id)
);

-- create (or replace) Planets table
CREATE OR REPLACE TABLE Planets (
    planet_id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    region varchar(255) NOT NULL,
    PRIMARY KEY (planet_id)
);

-- create (or replace) Hyperspace_Routes table
CREATE OR REPLACE TABLE Hyperspace_Routes (
    route_id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (route_id)
);

-- create (or replace) Starships table
-- has foreign key to Pilots
CREATE OR REPLACE TABLE Starships (
    starship_id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    type varchar(255) NOT NULL,
    pilot_id int(11),
    PRIMARY KEY (starship_id),
    FOREIGN KEY(pilot_id) REFERENCES Pilots(pilot_id) ON DELETE SET NULL
);

-- create (or replace) Weapon_Loadouts table
-- has foreign key to Starships
CREATE OR REPLACE TABLE Weapon_Loadouts (
    weapon_id int(11) NOT NULL AUTO_INCREMENT,
    type varchar(255) NOT NULL,
    starship_id int(11) NOT NULL,
    PRIMARY KEY (weapon_id),
    FOREIGN KEY(starship_id) REFERENCES Starships(starship_id) ON DELETE CASCADE
);

-- create (or replace) Starship_Route_Permits intersection table
-- has foreign keys to Starships and Hyperspace_Routes
CREATE OR REPLACE TABLE Starship_Route_Permits (
    permit_id int(11) NOT NULL AUTO_INCREMENT,
    starship_id int(11) NULL,
    route_id int(11) NULL,
    date_permit DATE NOT NULL,
    PRIMARY KEY (permit_id),
    FOREIGN KEY(starship_id) REFERENCES Starships(starship_id) ON DELETE CASCADE,
    FOREIGN KEY(route_id) REFERENCES Hyperspace_Routes(route_id) ON DELETE CASCADE
);

-- create (or replace) Planets_In_Routes intersection table
-- has foreign keys to Planets and Hyperspace_Routes
CREATE OR REPLACE TABLE Planets_In_Routes (
    planet_route_id int(11) NOT NULL AUTO_INCREMENT,
    planet_id int(11) NOT NULL,
    route_id int(11) NOT NULL,
    PRIMARY KEY (planet_route_id),
    FOREIGN KEY(planet_id) REFERENCES Planets(planet_id) ON DELETE CASCADE,
    FOREIGN KEY(route_id) REFERENCES Hyperspace_Routes(route_id) ON DELETE CASCADE
);

-- insert example data in Pilots
INSERT INTO Pilots (
    name,
    birthdate,
    species
)
VALUES (
    "Luke Skywalker",
    '1981-07-26',
    "Human"
),
(
    "Han Solo",
    '1968-03-04',
    "Human"
),
(
    "Ahsoka Tano",
    '1964-08-07',
    "Togruta"
);

-- insert example data in Starships
INSERT INTO Starships (
    name,
    type,
    pilot_id
)
VALUES (
    "Millennium Falcon",
    "Freighter",
    (SELECT pilot_id FROM Pilots WHERE name = "Han Solo")
),
(
    "Cool Ship",
    "Starfighter",
    (SELECT pilot_id FROM Pilots WHERE name = "Ahsoka Tano")
),
(
    "Boring Ship",
    "Freighter",
    (SELECT pilot_id FROM Pilots WHERE name = "Ahsoka Tano")
);

-- insert example data in Weapon_Loadouts
INSERT INTO Weapon_Loadouts (
    type,
    starship_id
)
VALUES (
    "Turbolaser",
    (SELECT starship_id FROM Starships WHERE name = "Millennium Falcon")
),
(
    "Turbolaser",
    (SELECT starship_id FROM Starships WHERE name = "Cool Ship")
),
(
    "Flare",
    (SELECT starship_id FROM Starships WHERE name = "Cool Ship")
);

-- insert example data in Hyperspace_Routes
INSERT INTO Hyperspace_Routes (
    name
)
VALUES (
    "Corellian Run"
),
(
    "Corellian Trade Spine"
),
(
    "Rimma Trade Route"
);

-- insert example data in Planets
INSERT INTO Planets (
    name,
    region
)
VALUES (
    "Coruscant",
    "Core Worlds"
),
(
    "Corellia",
    "Core Worlds"
),
(
    "Kal'Shebbol",
    "Outer Rim"
);

-- insert example data in Starship_Route_Permits
INSERT INTO Starship_Route_Permits (
    starship_id,
    route_id,
    date_permit
)
VALUES (
    (SELECT starship_id FROM Starships WHERE name = "Millennium Falcon"),
    (SELECT route_id FROM Hyperspace_Routes WHERE name = "Corellian Run"),
    '1990-10-25'
),
(
    (SELECT starship_id FROM Starships WHERE name = "Boring Ship"),
    (SELECT route_id FROM Hyperspace_Routes WHERE name = "Corellian Run"),
    '1995-01-01'
),
(
    (SELECT starship_id FROM Starships WHERE name = "Boring Ship"),
    (SELECT route_id FROM Hyperspace_Routes WHERE name = "Corellian Trade Spine"),
    '1997-11-28'
),
(
    (SELECT starship_id FROM Starships WHERE name = "Boring Ship"),
    (SELECT route_id FROM Hyperspace_Routes WHERE name = "Rimma Trade Route"),
    '1998-02-09'
);

-- insert example data in Planets_In_Routes
INSERT INTO Planets_In_Routes (
    planet_id,
    route_id
)
VALUES (
    (SELECT planet_id FROM Planets WHERE name = "Coruscant"),
    (SELECT route_id FROM Hyperspace_Routes WHERE name = "Corellian Run")
),
(
    (SELECT planet_id FROM Planets WHERE name = "Corellia"),
    (SELECT route_id FROM Hyperspace_Routes WHERE name = "Corellian Run")
),
(
    (SELECT planet_id FROM Planets WHERE name = "Corellia"),
    (SELECT route_id FROM Hyperspace_Routes WHERE name = "Corellian Trade Spine")
),
(
    (SELECT planet_id FROM Planets WHERE name = "Kal'Shebbol"),
    (SELECT route_id FROM Hyperspace_Routes WHERE name = "Rimma Trade Route")
);

-- minimize import errors
SET FOREIGN_KEY_CHECKS=1;
COMMIT;