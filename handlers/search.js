const { SONGS_SELECT } = require('./shared');

const searchSongsByBegin = (supabase) => async (req, res) => {
    const substring = req.params.substring;

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .ilike('title', `${substring}%`)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

const searchSongsByAny = (supabase) => async (req, res) => {
    const substring = req.params.substring;

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .ilike('title', `%${substring}%`)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

const searchSongsByYear = (supabase) => async (req, res) => {
    const year = Number(req.params.substring);

    if (isNaN(year)) {
        return res.status(400).json({ error: 'Year must be a number.' });
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONGS_SELECT)
        .eq('year', year)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

module.exports = { searchSongsByBegin, searchSongsByAny, searchSongsByYear };
