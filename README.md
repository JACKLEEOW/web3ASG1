# Songs API

A REST API built with Supabase that serves song, artist, genre, playlist, and mood data. Hosted on **Render** using the **Node.js** runtime, with **Express** handling all routing.

**Base URL:** `https://web-assignment-3-u2us.onrender.com`

---

## Project Files

| File | Description |
|------|-------------|
| `server.js` | Entry point that initialises Express, connects to Supabase, and registers all routes. |
| `handlers/shared.js` | Exports the shared `SONGS_SELECT` constant used across multiple handler files. |
| `handlers/songs.js` | Handlers for retrieving all songs, a single song, songs sorted by a field, and songs filtered by artist or genre. |
| `handlers/artists.js` | Handlers for retrieving all artists and computing average audio stats for a specific artist. |
| `handlers/genres.js` | Handler for retrieving all genres. |
| `handlers/playlists.js` | Handler for retrieving all songs belonging to a specific playlist. |
| `handlers/mood.js` | Handlers for mood-based song recommendations (dancing, happy, coffee, studying). |
| `handlers/search.js` | Handlers for searching songs by title prefix, title substring, or release year. |

---

## API Endpoints

### Songs

| Endpoint | Description | Test Link |
|----------|-------------|-----------|
| `/api/songs` | Returns all songs sorted by title. | [Test](https://web-assignment-3-u2us.onrender.com/api/songs) |
| `/api/songs/:ref` | Returns a single song by its `song_id`. | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/1028) |
| `/api/songs/sort/:order` | Returns all songs sorted by the given field (`id`, `title`, `artist`, `genre`, `year`, `duration`). | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/sort/title) |
| `/api/songs/artist/:ref` | Returns all songs by the specified artist ID. | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/artist/2) |
| `/api/songs/genre/:ref` | Returns all songs in the specified genre ID. | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/genre/104) |

### Search

| Endpoint | Description | Test Link |
|----------|-------------|-----------|
| `/api/songs/search/begin/:substring` | Returns songs whose title (case-insensitive) starts with the given substring. | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/search/begin/lov) |
| `/api/songs/search/any/:substring` | Returns songs whose title (case-insensitive) contains the given substring anywhere. | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/search/any/lov) |
| `/api/songs/search/year/:substring` | Returns all songs released in the given year. | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/search/year/2017) |

### Artists

| Endpoint | Description | Test Link |
|----------|-------------|-----------|
| `/api/artists` | Returns all artists sorted by name, including their type. | [Test](https://web-assignment-3-u2us.onrender.com/api/artists) |
| `/api/artists/averages/:ref` | Returns the average audio stats (bpm, energy, danceability, etc.) for the specified artist ID. | [Test](https://web-assignment-3-u2us.onrender.com/api/artists/averages/2) |

### Genres

| Endpoint | Description | Test Link |
|----------|-------------|-----------|
| `/api/genres` | Returns all genres sorted by name. | [Test](https://web-assignment-3-u2us.onrender.com/api/genres) |

### Playlists

| Endpoint | Description | Test Link |
|----------|-------------|-----------|
| `/api/playlists/:ref` | Returns all songs in the specified playlist, including title, artist, genre, and year. | [Test](https://web-assignment-3-u2us.onrender.com/api/playlists/1) |

### Mood

| Endpoint | Description | Test Link |
|----------|-------------|-----------|
| `/api/mood/dancing/:ref?` | Returns the top N songs (default 20, max 20) sorted by danceability descending. | [Test](https://web-assignment-3-u2us.onrender.com/api/mood/dancing/10) |
| `/api/mood/happy/:ref?` | Returns the top N songs (default 20, max 20) sorted by valence descending. | [Test](https://web-assignment-3-u2us.onrender.com/api/mood/happy/10) |
| `/api/mood/coffee/:ref?` | Returns the top N songs (default 20, max 20) sorted by liveness/acousticness ratio descending. | [Test](https://web-assignment-3-u2us.onrender.com/api/mood/coffee/10) |
| `/api/mood/studying/:ref?` | Returns the top N songs (default 20, max 20) sorted by energy × speechiness ascending. | [Test](https://web-assignment-3-u2us.onrender.com/api/mood/studying/10) |

> For mood routes, if `:ref` is omitted, less than 1, or greater than 20, it defaults to 20.

---

## Testing

| Route | Link |
|-------|------|
| `/api/artists` | [Test](https://web-assignment-3-u2us.onrender.com/api/artists) |
| `/api/artists/129` | [Test](https://web-assignment-3-u2us.onrender.com/api/artists/129) |
| `/api/artists/sdfjkhsdf` | [Test](https://web-assignment-3-u2us.onrender.com/api/artists/sdfjkhsdf) |
| `/api/artists/averages/129` | [Test](https://web-assignment-3-u2us.onrender.com/api/artists/averages/129) |
| `/api/genres` | [Test](https://web-assignment-3-u2us.onrender.com/api/genres) |
| `/api/songs` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs) |
| `/api/songs/sort/artist` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/sort/artist) |
| `/api/songs/sort/year` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/sort/year) |
| `/api/songs/sort/duration` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/sort/duration) |
| `/api/songs/1010` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/1010) |
| `/api/songs/sjdkfhsdkjf` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/sjdkfhsdkjf) |
| `/api/songs/search/begin/love` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/search/begin/love) |
| `/api/songs/search/begin/sdjfhs` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/search/begin/sdjfhs) |
| `/api/songs/search/any/love` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/search/any/love) |
| `/api/songs/search/year/2017` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/search/year/2017) |
| `/api/songs/search/year/2027` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/search/year/2027) |
| `/api/songs/artist/149` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/artist/149) |
| `/api/songs/artist/7834562` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/artist/7834562) |
| `/api/songs/genre/115` | [Test](https://web-assignment-3-u2us.onrender.com/api/songs/genre/115) |
