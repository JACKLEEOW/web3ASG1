const getAllGenres = (supabase) => async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select('genre_id, genre_name')
        .order('genre_name', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
};

module.exports = { getAllGenres };
