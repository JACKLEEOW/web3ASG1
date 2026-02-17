const AVG_FIELDS = ['bpm', 'energy', 'danceability', 'loudness', 'liveness', 'valence', 'duration', 'acousticness', 'speechiness', 'popularity'];

const getAllArtists = (supabase) => async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select(`
            artist_id,
            artist_name,
            artist_image_url,
            spotify_url,
            spotify_desc,
            types ( type_name )
        `)
        .order('artist_name', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

const getArtistAverages = (supabase) => async (req, res) => {
    const ref = Number(req.params.ref);

    if (isNaN(ref)) {
        return res.status(400).json({ error: 'Artist ID must be a number.' });
    }

    const { data: artist, error: artistError } = await supabase
        .from('artists')
        .select('artist_id, artist_name')
        .eq('artist_id', ref)
        .single();

    if (artistError || !artist) {
        return res.status(404).json({ error: `Artist "${ref}" not found.` });
    }

    const { data: songs, error: songsError } = await supabase
        .from('songs')
        .select(AVG_FIELDS.join(', '))
        .eq('artist_id', artist.artist_id);

    if (songsError) return res.status(500).json({ error: songsError.message });

    if (!songs.length) {
        return res.status(404).json({ error: `No songs found for artist "${artist.artist_name}".` });
    }

    // Compute averages (rounded to whole numbers, matching ROUND(AVG(...)) in SQL)
    const result = {
        artist_id:   artist.artist_id,
        artist_name: artist.artist_name,
    };
    for (const field of AVG_FIELDS) {
        const avg = songs.reduce((sum, s) => sum + s[field], 0) / songs.length;
        result[`avg_${field}`] = Math.round(avg);
    }

    res.json(result);
};

const getArtistById = (supabase) => async (req, res) => {
    const ref = Number(req.params.ref);

    if (isNaN(ref)) {
        return res.status(400).json({ error: 'Artist ID must be a number.' });
    }

    const { data, error } = await supabase
        .from('artists')
        .select(`
            artist_id,
            artist_name,
            artist_image_url,
            spotify_url,
            spotify_desc,
            types ( type_name )
        `)
        .eq('artist_id', ref)
        .single();

    if (error) return res.status(404).json({ error: `Artist with ID ${ref} not found.` });

    res.json(data);
};

module.exports = { getAllArtists, getArtistById, getArtistAverages };
