const getPlaylistSongs = (supabase) => async (req, res) => {
    const ref = Number(req.params.ref);

    if (isNaN(ref)) {
        return res.status(400).json({ error: 'Playlist ID must be a number.' });
    }

    // get all song_ids for this playlist
    const { data: playlistRows, error: playlistError } = await supabase
        .from('playlists')
        .select('playlist_id, song_id')
        .eq('playlist_id', ref);

    if (playlistError) return res.status(500).json({ error: playlistError.message });

    if (!playlistRows.length) {
        return res.status(404).json({ error: `Playlist ${ref} not found.` });
    }

    const songIds = playlistRows.map(row => row.song_id);

    // fetch the song details for those ids
    const { data: songs, error: songsError } = await supabase
        .from('songs')
        .select(`
            song_id,
            title,
            year,
            artists ( artist_name ),
            genres  ( genre_name  )
        `)
        .in('song_id', songIds)
        .order('title', { ascending: true });

    if (songsError) return res.status(500).json({ error: songsError.message });

    const result = songs.map(song => ({
        playlist:     ref,
        song_id:      song.song_id,
        title:        song.title,
        artist_name:  song.artists.artist_name,
        genre_name:   song.genres.genre_name,
        year:         song.year,
    }));

    res.json(result);
};

module.exports = { getPlaylistSongs };
