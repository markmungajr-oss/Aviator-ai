const express = require("express");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;

// Hii ndio Logic iliyoboreshwa ya SHA-256
function hashToMultiplier(serverSeed) {
    // Client Seed ya SportyBet ambayo ni standard
    const clientSeed = "0000000000000000000fa3ad5c8865831a14bb57fdf851148c3d58b210515152";
    
    // Tunatengeneza HMAC-SHA256 kwa kutumia Server Seed kama KEY
    const combinedHash = crypto.createHmac('sha256', serverSeed).update(clientSeed).digest('hex');
    
    // Tunachukua herufi 13 za kwanza (52 bits)
    const val = parseInt(combinedHash.substring(0, 13), 16);
    
    // Kama namba inagawanyika kwa 33, mchezo unastop (Instant Crash 1.00x)
    if (val % 33 === 0) return (1.00).toFixed(2);
    
    // Kanuni ya hesabu ya Aviator
    const multiplier = Math.floor(4503599627370496 / (4503599627370496 - val));
    const result = Math.max(100, multiplier) / 100;
    
    return result.toFixed(2);
}

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="sw">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MUNGAJR V.I.P DECODER</title>
        <style>
            @keyframes glow { 0%, 100% { box-shadow: 0 0 10px #e41e26; } 50% { box-shadow: 0 0 20px #e41e26; } }
            body { background: #0b0c0d; color: #fff; font-family: 'Segoe UI', sans-serif; margin: 0; padding: 20px; text-align: center; }
            .header { color: #e41e26; font-size: 24px; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; }
            .card { background: #151617; border-radius: 20px; padding: 30px; max-width: 400px; margin: auto; border: 1px solid #333; animation: glow 3s infinite; }
            input { width: 90%; padding: 15px; background: #000; border: 1px solid #444; color: #00ff88; border-radius: 10px; font-family: monospace; font-size: 13px; margin: 15px 0; outline: none; }
            .res-box { font-size: 70px; color: #e41e26; font-weight: 900; margin: 25px 0; text-shadow: 0 0 15px rgba(228,30,38,0.5); }
            .btn { background: #e41e26; color: white; border: none; padding: 18px; width: 100%; border-radius: 12px; font-weight: bold; cursor: pointer; text-transform: uppercase; transition: 0.3s; }
            .btn:active { transform: scale(0.95); }
            .wa { display: block; margin-top: 30px; color: #25d366; text-decoration: none; font-weight: bold; border: 1px solid #25d366; padding: 10px; border-radius: 50px; }
            .tip { font-size: 11px; color: #777; margin-top: 15px; text-align: left; background: #000; padding: 10px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="header">MUNGAJR V.I.P DECODER</div>
        <div class="card">
            <p style="font-size: 12px; color: #aaa;">INGIZA SERVER SEED AU COMBINED HASH:</p>
            <input type="text" id="hInput" placeholder="Paste Hash hapa...">
            <div id="res" class="res-box">?.??x</div>
            <button class="btn" onclick="decode()">DECODE SIGNAL</button>
            <div class="tip">
                <strong>Ushauri:</strong> Ili kupata uhakika, nenda kwenye <em>Round History</em> kule SportyBet, gusa odds iliyopita, copy <strong>Combined Hash</strong> na uipaste hapa.
            </div>
        </div>
        <a href="https://wa.me/255763071896" class="wa">WHATSAPP: 0763071896</a>
        <script>
            function decode() {
                const val = document.getElementById('hInput').value;
                if(!val || val.length < 10) return alert("Weka Hash sahihi!");
                document.getElementById('res').innerText = "WAIT...";
                setTimeout(() => {
                    window.location.href = "/calc?seed=" + val;
                }, 1200);
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
        <body style="background:#0b0c0d; color:white; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; margin:0;">
            <div style="text-align:center; border:3px solid #e41e26; padding:60px; border-radius:30px; background:#151617; box-shadow: 0 0 50px rgba(228, 30, 38, 0.5);">
                <p style="color:#00ff88; font-weight:bold; letter-spacing:2px;">SIGNAL DECODED</p>
                <h1 style="font-size:100px; color:#e41e26; margin:10px 0;">${result}x</h1>
                <p style="color:#888;">CASH OUT AT THIS POINT!</p>
                <button onclick="window.history.back()" style="background:#e41e26; color:white; border:none; padding:15px 30px; border-radius:10px; cursor:pointer; font-weight:bold; text-transform:uppercase;">RUDI NYUMA</button>
            </div>
        </body>
    `);
});

app.listen(PORT);
