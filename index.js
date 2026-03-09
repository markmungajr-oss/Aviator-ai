const express = require("express");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;

function hashToMultiplier(seed) {
    const hash = crypto.createHmac('sha256', seed).update('0000000000000000000fa3ad5c8865831a14bb57fdf851148c3d58b210515152').digest('hex');
    const val = parseInt(hash.substring(0, 13), 16);
    const multiplier = Math.max(100, Math.floor(4503599627370496 / (4503599627370496 - val)));
    return (multiplier / 100).toFixed(2);
}

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="sw">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MUNGAJR HASH DECODER</title>
        <style>
            body { background: #0b0c0d; color: #fff; font-family: sans-serif; padding: 20px; text-align: center; }
            .card { max-width: 400px; margin: auto; border: 2px solid #e41e26; border-radius: 15px; padding: 20px; background: #151617; box-shadow: 0 0 20px rgba(228, 30, 38, 0.3); }
            input { width: 90%; padding: 15px; margin: 15px 0; background: #000; border: 1px solid #444; color: #00ff88; border-radius: 8px; font-family: monospace; }
            .btn { background: #e41e26; color: #fff; border: none; padding: 15px; width: 100%; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px; }
            .res-box { font-size: 60px; color: #e41e26; font-weight: bold; margin: 20px 0; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .wa { display: block; margin-top: 20px; color: #25d366; text-decoration: none; font-weight: bold; }
        </style>
    </head>
    <body>
        <h2 style="color:#e41e26;">MUNGAJR V.I.P DECODER</h2>
        <div class="card">
            <p style="font-size: 13px;">PASTE "SERVER SEED SHA256" HAPA:</p>
            <input type="text" id="hInput" placeholder="675fbe47b202cce1a58e0dd921...">
            <div id="res" class="res-box">?.??x</div>
            <button class="btn" onclick="run()">DECODE NOW</button>
            <p style="font-size: 10px; color: #888; margin-top: 15px;">Huu mfumo unatumia SHA-256 kupata matokeo halisi ya SportyBet.</p>
        </div>
        <a href="https://wa.me/255763071896" class="wa">WASILIANA NA MUNGAJR (0763071896)</a>
        <script>
            function run() {
                const val = document.getElementById('hInput').value;
                if(!val) return alert("Weka Hash kwanza!");
                document.getElementById('res').innerText = "CALCULATING...";
                setTimeout(() => {
                    window.location.href = "/calc?seed=" + val;
                }, 1000);
            }
        </script>
    </body>
    </html>
    `);
});

app.get('/calc', (req, res) => {
    const seed = req.query.seed;
    const result = hashToMultiplier(seed);
    res.send(`
        <body style="background:#0b0c0d; color:white; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif;">
            <div style="text-align:center; border:3px solid #e41e26; padding:50px; border-radius:25px; background:#151617; box-shadow: 0 0 30px rgba(228, 30, 38, 0.5);">
                <p style="color:#888;">MATOKEO YA HASH:</p>
                <h1 style="font-size:90px; color:#e41e26; margin:10px 0;">${result}x</h1>
                <button onclick="window.history.back()" style="background:#e41e26; color:white; border:none; padding:12px 25px; border-radius:8px; cursor:pointer; font-weight:bold;">RUDI NYUMA</button>
            </div>
        </body>
    `);
});

app.listen(PORT);
