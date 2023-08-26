create table Season (
    seasonID integer AUTOINCREMENT,
    startDate date not null,
    endDate date not null,
    constraint pkSeason primary key (seasonID),
    constraint uqSeasonStart unique (startDate),
    constraint uqSeasonEnd unique (endDate)
);

create table Deck (
    deckID integer AUTOINCREMENT,
    deckName varchar(255) not null,
    deckLink varchar(511) not null,
    constraint pkDeck primary key (deckID),
    constraint uqDeckLink unique (deckLink)
);

create table Player (
    playerID integer AUTOINCREMENT,
    playerName varchar(255) not null,
    constraint pkPlayer primary key (playerID),
    constraint uqPlayerName unique (playerName)
);

create table Tournament (
    tournamentID integer AUTOINCREMENT,
    seasonID int not null,
    tournamentDate date not null,
    constraint pkTournament primary key (tournamentID),
    constraint fkTournamentSeason foreign key (seasonID) references Season (seasonID),
    constraint uqTournamentDate unique (tournamentDate)
);

create table TournamentScore (
    tournamentScoreID integer AUTOINCREMENT,
    tournamentID int not null,
    playerID int not null,
    deckID int not null,
    OMW numeric(5, 2) not null,
    wins int not null,
    losses int not null,
    draws int not null,
    points int not null,
    /* TScore is short for Tournament Score */
    constraint pkTScore primary key (tournamentScoreID),
    constraint fkTScoreTournament foreign key (tournamentID) references Tournament (tournamentID),
    constraint fkTScorePlayer foreign key (playerID) references Player (playerID),
    constraint fkTScoreDeck foreign key (deckID) references Deck (deckID)
);
