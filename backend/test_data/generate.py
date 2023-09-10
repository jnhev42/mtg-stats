from dataclasses import dataclass, field
from pprint import pprint
import random as r



def ID():
    ID._counter += 1
    return ID._counter
ID._counter = 0

@dataclass
class Player:
    name: str
    ID: int = field(default_factory=ID)
    def sql(s):
        print(f"INSERT INTO Player VALUES ({s.ID}, '{s.name}');")

@dataclass
class Deck:
    name: str
    link: str
    ID: int = field(default_factory=ID)
    def sql(s):
        print(f"INSERT INTO Deck VALUES ({s.ID}, '{s.name}', '{s.link}');")
        

@dataclass
class Season:
    start: str
    end: str
    ID: int = field(default_factory=ID)
    def sql(s):
        print(f"INSERT INTO Season VALUES ({s.ID}, '{s.start}', '{s.end}');")

@dataclass
class TournamentKind:
    name: str
    ID: int = field(default_factory=ID)
    def sql(s):
        print(f"INSERT INTO TournamentKind VALUES ({s.ID}, '{s.name}');")


@dataclass
class TournamentLocation:
    name: str
    ID: int = field(default_factory=ID)
    def sql(s):
        print(f"INSERT INTO TournamentLocation VALUES ({s.ID}, '{s.name}');")        

@dataclass
class Tournament:
    date: str
    season: Season
    kind: TournamentKind 
    location: TournamentLocation
    ID: int = field(default_factory=ID)
    def sql(s):
        print(f"INSERT INTO Tournament VALUES ({s.ID}, {s.season.ID}, {s.kind.ID}, {s.location.ID}, '{s.date}', NULL);")

@dataclass
class TournamentScore:
    omw: float
    wins: int
    losses: int
    draws: int
    points: int
    tournament: Tournament
    player: Player
    deck: Deck
    ID: int = field(default_factory=ID)

    def sql(s):
        print(f"INSERT INTO TournamentScore VALUES ({s.ID}, {s.tournament.ID}, {s.player.ID}, {s.deck.ID}, {s.omw}, {s.wins}, {s.losses}, {s.draws}, {s.points});")


def deck(name):
    no_spaces = name.replace(" ", "").lower()
    return Deck(name, f"https://decksite.com/{no_spaces}")

players = [Player("Jeremy"), Player("Dave"), Player("Matt"), Player("Jonah"),
           Player("Rachel"), Player("Amy"), Player("Michelle"), Player("Aiden"), Player("Alex")]

decks = [deck("Big White"),  deck("4 Colour"), deck("Czech Pile"),  deck("Enchantress"), deck("Grixis")]
seasons = [Season("21-01-10", "21-04-24"), Season("22-11-16", "23-02-24"), Season("23-02-26", "23-11-09")]
kinds = [TournamentKind("Championship"), TournamentKind("Weekly")]
locations = [TournamentLocation("Moon"), TournamentLocation("Timbuktu"), TournamentLocation("Narnia")]

tournaments = [
    Tournament("21-01-11", seasons[0], kinds[1], locations[0]),
    Tournament("21-02-24", seasons[0], kinds[1], locations[1]),
    Tournament("21-02-28", seasons[0], kinds[0], locations[2]),
    Tournament("21-03-02", seasons[0], kinds[1], locations[1]),
    Tournament("21-04-14", seasons[0], kinds[0], locations[0]),
    Tournament("21-04-22", seasons[0], kinds[1], locations[2]),

    Tournament("22-11-23", seasons[1], kinds[1], locations[1]),
    Tournament("22-11-27", seasons[1], kinds[1], locations[2]),
    Tournament("22-12-25", seasons[1], kinds[1], locations[2]),
    Tournament("23-01-01", seasons[1], kinds[0], locations[0]),
    Tournament("23-02-22", seasons[1], kinds[1], locations[1]),

    Tournament("23-02-28", seasons[2], kinds[1], locations[1]),
    Tournament("23-03-12", seasons[2], kinds[0], locations[0]),
    Tournament("23-11-07", seasons[2], kinds[0], locations[2]),
]

r.seed(123)
tournamentScores = []
for tournament in tournaments:
    tournamentPlayers = r.sample(players, r.randint(2, len(players)))
    for tournamentPlayer in tournamentPlayers:
        deck = r.choice(decks)
        omw = float(r.randint(0, 1000)) / 10
        wins = r.randint(0, len(tournamentPlayers) - 1)
        draws = r.randint(0, len(tournamentPlayers) - 1 - wins)
        losses = r.randint(0, len(tournamentPlayers) - 1 - wins - draws)
        points = r.randint(0, 50)
        tournamentScores.append(TournamentScore(
            omw,
            wins,
            draws,
            losses,
            points,
            tournament,
            tournamentPlayer,
            deck,
        ))


def sqlAll(collection):
    for item in collection:
        item.sql()
sqlAll(seasons)
sqlAll(decks)
sqlAll(players)
sqlAll(tournaments)
sqlAll(tournamentScores)

