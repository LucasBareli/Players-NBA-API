para rodar a aplicação:

cd back
py -m venv env
env\scripts\activate
pip install -r requirements.txt
py main.py

Ativar XAMPP(Apache e MySQL)
(Verificar em http://localhost:8080/phpmyadmin) se existe a tabela playersnba, se não crie


cd front
cd players-nba
npm i
npm run dev


Popular o banco abaixo(caso queira tem de times e de jogadores):

http://127.0.0.1:8001/docs

POST TEAMS



[
  {
    "id": 1,
    "name": "Los Angeles Lakers",
    "city": "Los Angeles",
    "arena": "Crypto.com Arena",
    "image_arena": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/92/6a/9f/caption.jpg?w=1200&h=-1&s=1"
  },
  {
    "id": 2,
    "name": "Golden State Warriors",
    "city": "San Francisco",
    "arena": "Chase Center",
    "image_arena": "https://images.prismic.io/chasecenterprod/Zs-wNEaF0TcGJflg_cc-groups-1005.png?auto=format,compress?auto=compress,format"
  },
  {
    "id": 3,
    "name": "Boston Celtics",
    "city": "Boston",
    "arena": "TD Garden",
    "image_arena": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJZvIKYioMXNQ9VL2zyQDnD3RhNMQsoXy1kg&s"
  },
  {
    "id": 4,
    "name": "Chicago Bulls",
    "city": "Chicago",
    "arena": "United Center",
    "image_arena": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/1d/b4/10/united-center.jpg?w=1200&h=-1&s=1"
  },
  {
    "id": 5,
    "name": "Miami Heat",
    "city": "Miami",
    "arena": "Kaseya Center",
    "image_arena": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/0e/45/ef/caption.jpg?w=1200&h=-1&s=1"
  },
  {
    "id": 6,
    "name": "Brooklyn Nets",
    "city": "Brooklyn",
    "arena": "Barclays Center",
    "image_arena": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMzRsjWKmmz4CtmchQ9p9U53tw0ur7bb74hA&s"
  },
  {
    "id": 7,
    "name": "Milwaukee Bucks",
    "city": "Milwaukee",
    "arena": "Fiserv Forum",
    "image_arena": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnuM279hJ26LNn6q9ejBuYPgmYKcAQHUuCw&s"
  },
  {
    "id": 8,
    "name": "Phoenix Suns",
    "city": "Phoenix",
    "arena": "Footprint Center",
    "image_arena": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/8b/36/ea.jpg"
  },
  {
    "id": 9,
    "name": "Philadelphia 76ers",
    "city": "Philadelphia",
    "arena": "Wells Fargo Center",
    "image_arena": "https://i0.wp.com/phillysportsreports.com/wp-content/uploads/2024/12/new-renderings-for-the-arena-proposal-2.webp?fit=1200%2C675&ssl=1"
  },
  {
    "id": 10,
    "name": "Dallas Mavericks",
    "city": "Dallas",
    "arena": "American Airlines Center",
    "image_arena": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/cb/9d/5c.jpg"
  }
]




POST PLAYERS


[
  {
    "id": 1,
    "name": "LeBron James",
    "age": 40,
    "height": 2.06,
    "position": "SF",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/1966.png&w=350&h=254",
    "team_id": 1
  },
  {
    "id": 2,
    "name": "Anthony Davis",
    "age": 32,
    "height": 2.08,
    "position": "PF",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6583.png&w=350&h=254",
    "team_id": 1
  },
  {
    "id": 3,
    "name": "D'Angelo Russell",
    "age": 28,
    "height": 1.98,
    "position": "PG",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3136776.png&w=350&h=254",
    "team_id": 1
  },
  {
    "id": 4,
    "name": "Stephen Curry",
    "age": 37,
    "height": 1.91,
    "position": "PG",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3975.png&w=350&h=254",
    "team_id": 2
  },
  {
    "id": 5,
    "name": "Klay Thompson",
    "age": 35,
    "height": 1.98,
    "position": "SG",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6475.png&w=350&h=254",
    "team_id": 2
  },
  {
    "id": 6,
    "name": "Draymond Green",
    "age": 35,
    "height": 2.01,
    "position": "PF",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6589.png&w=350&h=254",
    "team_id": 2
  },
  {
    "id": 7,
    "name": "Jayson Tatum",
    "age": 26,
    "height": 2.03,
    "position": "SF",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4065648.png&w=350&h=254",
    "team_id": 3
  },
  {
    "id": 8,
    "name": "Jaylen Brown",
    "age": 28,
    "height": 2.01,
    "position": "SG",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3917376.png&w=350&h=254",
    "team_id": 3
  },
  {
    "id": 10,
    "name": "Zach LaVine",
    "age": 30,
    "height": 1.98,
    "position": "SG",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3064440.png&w=350&h=254",
    "team_id": 4
  },
  {
    "id": 11,
    "name": "DeMar DeRozan",
    "age": 35,
    "height": 2.01,
    "position": "SF",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3978.png&w=350&h=254",
    "team_id": 4
  },
  {
    "id": 12,
    "name": "Nikola Vucevic",
    "age": 34,
    "height": 2.11,
    "position": "C",
    "country": "Montenegro",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6478.png&w=350&h=254",
    "team_id": 4
  },
  {
    "id": 13,
    "name": "Jimmy Butler",
    "age": 35,
    "height": 2.01,
    "position": "SF",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/6430.png&w=350&h=254",
    "team_id": 5
  },
  {
    "id": 14,
    "name": "Bam Adebayo",
    "age": 28,
    "height": 2.06,
    "position": "C",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4066261.png&w=350&h=254",
    "team_id": 5
  },
  {
    "id": 15,
    "name": "Tyler Herro",
    "age": 25,
    "height": 1.98,
    "position": "SG",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4395725.png&w=350&h=254",
    "team_id": 5
  },
  {
    "id": 16,
    "name": "Kevin Durant",
    "age": 36,
    "height": 2.08,
    "position": "SF",
    "country": "USA",
    "image": "https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3202.png&w=350&h=254",
    "team_id": 6
  },
