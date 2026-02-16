require('dotenv').config();
const express = require('express');
const supa = require('@supabase/supabase-js')

const supaUrl = process.env.SUPA_URL
const supaKey = process.env.SUPA_KEY
const app = express();
const PORT = process.env.PORT || 3000;

const supabase = supa.createClient(supaUrl, supaKey)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

