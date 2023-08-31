drop table if exists Season;
create table if not exists Season (
    seasonID integer PRIMARY KEY AUTOINCREMENT,
    startDate date NOT NULL,
    endDate date NOT NULL,
    unique (startDate),
    unique (endDate)
);

drop table if exists Deck;
create table if not exists Deck (
    deckID integer PRIMARY KEY AUTOINCREMENT,
    deckName varchar(255) NOT NULL,
    deckLink varchar(511) NOT NULL,
    unique (deckLink)
);

drop table if exists Player;
create table if not exists Player (
    playerID integer PRIMARY KEY AUTOINCREMENT,
    playerName varchar(255) NOT NULL,
    unique (playerName)
);

drop table if exists Tournament;
create table if not exists Tournament (
    tournamentID integer PRIMARY KEY AUTOINCREMENT,
    seasonID int NOT NULL,
    tournamentDate date NOT NULL,
    foreign key (seasonID) references Season (seasonID),
    unique (tournamentDate)
);

drop table if exists TournamentScore;
create table if not exists TournamentScore (
    tournamentScoreID integer PRIMARY KEY AUTOINCREMENT,
    tournamentID int NOT NULL,
    playerID int NOT NULL,
    deckID int NOT NULL,
    OMW numeric(5, 2) NOT NULL,
    wins int NOT NULL,
    losses int NOT NULL,
    draws int NOT NULL,
    points int NOT NULL,
    foreign key (tournamentID) references Tournament (tournamentID),
    foreign key (playerID) references Player (playerID),
    foreign key (deckID) references Deck (deckID)
);
