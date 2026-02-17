const { SONGS_SELECT } = require('./shared');

const ORDER_MAP = {
    id:       { column: 'song_id' },
    title:    { column: 'title' },
    artist:   { column: 'artist_name', referencedTable: 'artists' },
    genre:    { column: 'genre_name',  referencedTable: 'genres'  },
    year:     { column: 'year' },
    duration: { column: 'duration' },
};

const getAllSongs = (supabase) => async (req, res) => {
    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

const getSortedSongs = (supabase) => async (req, res) => {
    const order = req.params.order?.toLowerCase();
    const mapping = ORDER_MAP[order];

    if (!mapping) {
        return res.status(400).json({
            error: `Invalid sort field "${order}". Valid options: ${Object.keys(ORDER_MAP).join(', ')}`
        });
    }

    const { column, referencedTable } = mapping;

    let query = supabase
        .from('songs')
        .select(`
            song_id,
            title,
            release_date:year,
            duration,
            bpm,
            energy,
            danceability,
            loudness,
            liveness,
            valence,
            acousticness,
            speechiness,
            popularity,
            artists ( artist_id, artist_name ),
            genres  ( genre_id,  genre_name  )
        `);

    if (referencedTable) {
        query = query.order(column, { referencedTable, ascending: true });
    } else {
        query = query.order(column, { ascending: true });
    }

    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

const getSongById = (supabase) => async (req, res) => {
    const ref = Number(req.params.ref);

    if (isNaN(ref)) {
        return res.status(400).json({ error: 'Song ID must be a number.' });
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .eq('song_id', ref)
        .single();

    if (error) return res.status(404).json({ error: `Song with ID ${ref} not found.` });

    res.json(data);
};

const getSongsByArtist = (supabase) => async (req, res) => {
    const ref = Number(req.params.ref);

    if (isNaN(ref)) {
        return res.status(400).json({ error: 'Artist ID must be a number.' });
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .eq('artist_id', ref)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    if (!data.length) {
        return res.status(404).json({ error: `No songs found for artist ID ${ref}.` });
    }

    res.json(data);
};

const getSongsByGenre = (supabase) => async (req, res) => {
    const ref = Number(req.params.ref);

    if (isNaN(ref)) {
        return res.status(400).json({ error: 'Genre ID must be a number.' });
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .eq('genre_id', ref)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    if (!data.length) {
        return res.status(404).json({ error: `No songs found for genre ID ${ref}.` });
    }

    res.json(data);
};

module.exports = { getAllSongs, getSortedSongs, getSongById, getSongsByArtist, getSongsByGenre };
