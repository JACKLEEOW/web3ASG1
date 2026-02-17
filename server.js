require('dotenv').config();
const express = require('express');
const supa = require('@supabase/supabase-js');
const { getAllSongs, getSortedSongs, getSongById, getSongsByArtist, getSongsByGenre } = require('./handlers/songs');
const { getAllArtists, getArtistAverages }                                          = require('./handlers/artists');
const { getAllGenres }                                                               = require('./handlers/genres');
const { getPlaylistSongs }                                                          = require('./handlers/playlists');
const { getMoodDancing, getMoodHappy, getMoodCoffee, getMoodStudying }              = require('./handlers/mood');
const { searchSongsByBegin, searchSongsByAny, searchSongsByYear }                   = require('./handlers/search');

const supaUrl = process.env.SUPA_URL
const supaKey = process.env.SUPA_KEY
const app = express();
const PORT = process.env.PORT || 3000;

const supabase = supa.createClient(supaUrl, supaKey)


app.get('/all', async (req,res)=> {
    const {data, error} = await supabase
    .from('artists')
    .select();
    res.send(data)
});

app.get('/api/songs', getAllSongs(supabase));
app.get('/api/genres', getAllGenres(supabase));
app.get('/api/artists', getAllArtists(supabase));
app.get('/api/artists/averages/:ref', getArtistAverages(supabase));
app.get('/api/songs/sort/:order', getSortedSongs(supabase));
app.get('/api/songs/artist/:ref', getSongsByArtist(supabase));
app.get('/api/songs/genre/:ref', getSongsByGenre(supabase));
app.get('/api/playlists/:ref', getPlaylistSongs(supabase));
app.get('/api/mood/dancing/:ref', getMoodDancing(supabase));
app.get('/api/mood/dancing',      getMoodDancing(supabase));
app.get('/api/mood/happy/:ref',   getMoodHappy(supabase));
app.get('/api/mood/happy',        getMoodHappy(supabase));
app.get('/api/mood/coffee/:ref',    getMoodCoffee(supabase));
app.get('/api/mood/coffee',         getMoodCoffee(supabase));
app.get('/api/mood/studying/:ref',  getMoodStudying(supabase));
app.get('/api/mood/studying',       getMoodStudying(supabase));
app.get('/api/songs/search/begin/:substring', searchSongsByBegin(supabase));
app.get('/api/songs/search/any/:substring', searchSongsByAny(supabase));
app.get('/api/songs/search/year/:substring', searchSongsByYear(supabase));
app.get('/api/songs/:ref', getSongById(supabase));





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

