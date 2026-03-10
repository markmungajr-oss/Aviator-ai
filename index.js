const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Engine ya siri ya MungaJr
function getMultiplier(seed) {
    const salt = "0000000000000000000fa3ad5c8865831a14bb57fdf851148c3d58b210515152";
    const hash = crypto.createHmac('sha256', seed).update(salt).digest('hex');
    const val = parseInt(hash.substring(0, 13), 16);
    if (val % 33 === 0) return "1.00";
    const result = Math.floor(4503599627370496 / (4503599627370496 - val));
    return (Math.max(100, result) / 100).toFixed(2);
}

// Hapa ndipo kodi ya simu itatuma data "Direct"
app.get('/api/sync', (req, res) => {
    const hash = req.query.hash;
    if (!hash) return res.json({ status: "error" });
    
    const result = getMultiplier(hash);
    console.log("Auto-Synced Signal: " + result);
    res.json({ multiplier: result });
});

app.listen(PORT, () => console.log("MungaJr Auto-Engine Live!"));
