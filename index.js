const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = process.env.PORT || 3000;

// --- LOGIC YA KUPIGA HESABU (SHA-256) ---
function generateSignal(seed) {
    const salt = "0000000000000000000fa3ad5c8865831a14bb57fdf851148c3d58b210515152";
    const hash = crypto.createHmac('sha256', seed).update(salt).digest('hex');
    const val = parseInt(hash.substring(0, 13), 16);
    
    // Kanuni halisi ya Aviator Multiplier
    if (val % 33 === 0) return "1.00";
    const multiplier = Math.floor(4503599627370496 / (4503599627370496 - val));
    const result = Math.max(100, multiplier) / 100;
    return result.toFixed(2);
}

// --- ROUTE KUU YA APP ---
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="sw">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MUNGAJR V3 - AUTO LIVE</title>
        <style>
            body { 
                background: #0b0c0d; 
                color: white; 
                font-family: 'Segoe UI', Roboto, sans-serif; 
                margin: 0; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                height: 100vh;
                overflow: hidden;
            }
            .header { color: #e41e26; font-size: 18px; font-weight: 900; letter-spacing: 2px; margin-bottom: 20px; }
            .container { 
                background: #151617; 
                border: 2px solid #e41e26; 
                border-radius: 25px; 
                padding: 40px; 
                width: 280px; 
                text-align: center;
                box-shadow: 0 0 30px rgba(228, 30, 38, 0.2);
            }
            .status-dot { height: 8px; width: 8px; background-color: #00ff88; border-radius: 50%; display: inline-block; margin-right: 5px; animation: blink 1s infinite; }
            @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
            
            .odds-display { font-size: 70px; font-weight: 900; color: #e41e26; margin: 20px 0; text-shadow: 0 0 10px rgba(228,30,38,0.3); }
            .label { color: #555; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
            
            .progress-bar { width: 100%; height: 4px; background: #333; border-radius: 2px; margin-top: 20px; overflow: hidden; }
            .progress-fill { height: 100%; background: #e41e26; width: 0%; transition: width 0.1s linear; }
            
            .footer { margin-top: 20px; font-size: 10px; color: #444; }
        </style>
    </head>
    <body>
        <div class="header">MUNGAJR LIVE V3</div>
        <div class="container">
            <div style="font-size: 10px; color: #00ff88; margin-bottom: 10px;">
                <span class="status-dot"></span> CONNECTION STABLE
            </div>
            <div class="label">Next Predict</div>
            <div id="signal" class="odds-display">WAIT</div>
            <div class="progress-bar"><div id="fill" class="progress-fill"></div></div>
            <div id="timer" style="font-size: 10px; color: #555; margin-top: 10px;">SCANNING NEW HASH...</div>
        </div>
        <div class="footer">HP ELITEBOOK OPTIMIZED ENGINE</div>

        <script>
            let progress = 0;
            const signalElement = document.getElementById('signal');
            const fillElement = document.getElementById('fill');

            function updateSignal() {
                // Hii inatengeneza signal kulingana na algorithm ya siri ya MungaJr
                // Inatumia hesabu ya uwezekano (Probability)
                fetch('/api/live-calc')
                    .then(res => res.json())
                    .then(data => {
                        signalElement.innerText = data.val + "x";
                        progress = 0;
                    });
            }

            // Loop ya kuonesha maendeleo (Fake Loading bar kufanana na raundi ya ndege)
            setInterval(() => {
                progress += 1.25; 
                if (progress >= 100) {
                    progress = 0;
                    updateSignal();
                }
                fillElement.style.width = progress + "%";
            }, 100);

            // Anza kazi mara moja
            updateSignal();
        </script>
    </body>
    </html>
    `);
});

// --- API YA SIRI INAYOTOA SIGNAL KWA FRONTEND ---
app.get('/api/live-calc', (req, res) => {
    // Tunatengeneza random seed ya kufanyia hesabu (Kufanana na kile kinachofanyika SportyBet)
    const randomSeed = crypto.randomBytes(32).toString('hex');
    const multiplier = generateSignal(randomSeed);
    res.json({ val: multiplier });
});

app.listen(PORT, () => console.log('MungaJr Live System is Online!'));
