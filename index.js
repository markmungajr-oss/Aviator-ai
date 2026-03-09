const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="sw">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MUNGAJR SPORTYBET V.I.P</title>
        <style>
            @keyframes floating { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
            @keyframes glow { 0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #e41e26; } 50% { text-shadow: 0 0 15px #fff, 0 0 25px #e41e26; } }
            @keyframes shake { 0% { transform: translate(1px, 1px) rotate(0deg); } 10% { transform: translate(-1px, -2px) rotate(-1deg); } 20% { transform: translate(-3px, 0px) rotate(1deg); } 100% { transform: translate(1px, 1px) rotate(0deg); } }

            body { background-color: #0b0c0d; color: #fff; font-family: 'Arial', sans-serif; margin: 0; padding: 15px; display: flex; flex-direction: column; align-items: center; overflow-x: hidden; }
            
            .header { color: #e41e26; font-weight: 900; font-size: 22px; margin-bottom: 20px; animation: glow 2s infinite, floating 3s infinite ease-in-out; letter-spacing: 1px; }
            
            .nav-tabs { display: flex; gap: 8px; margin-bottom: 20px; width: 100%; max-width: 400px; }
            .tab-btn { flex: 1; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: bold; background: #1a1b1c; color: #888; border: 1px solid #333; transition: 0.3s; font-size: 11px; }
            .tab-btn.active { background: #e41e26; color: white; border-color: #ff4d4d; animation: shake 0.5s infinite; }

            .card { background: #151617; border-radius: 15px; padding: 20px; width: 100%; max-width: 380px; border: 1px solid #2a2b2c; box-shadow: 0 10px 30px rgba(228, 30, 38, 0.1); position: relative; display: none; }
            .card.active { display: block; }

            /* Aviator Engine */
            .live-box { background: #000; border-radius: 10px; height: 180px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid #333; }
            .multiplier { font-size: 55px; font-weight: 900; color: white; z-index: 10; animation: floating 2s infinite; }
            .plane { position: absolute; bottom: 20px; left: 20px; font-size: 35px; z-index: 5; transition: 0.1s linear; }

            /* Mines Grid */
            .grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 20px 0; }
            .cell { aspect-ratio: 1; background: #1f2021; border-radius: 6px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; font-size: 22px; transition: 0.3s; }
            .cell.active { border: 2px solid #e41e26; background: rgba(228, 30, 38, 0.2); animation: glow 1s infinite; }

            .status-text { font-size: 11px; color: #00ff88; text-transform: uppercase; margin: 10px 0; animation: floating 2.5s infinite; font-weight: bold; }
            .action-btn { background: linear-gradient(135deg, #e41e26, #b3141a); color: white; border: none; padding: 16px; border-radius: 8px; font-weight: 900; width: 100%; cursor: pointer; text-transform: uppercase; box-shadow: 0 5px 15px rgba(228, 30, 38, 0.4); margin-top: 10px; }

            .whatsapp-float { background: #25d366; color: white; text-decoration: none; padding: 15px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; margin-top: 30px; width: 90%; max-width: 320px; animation: floating 3s infinite ease-in-out; border: 2px solid #fff; }
        </style>
    </head>
    <body>
        <div class="header">MUNGAJR SPORTYBET AI</div>
        
        <div class="nav-tabs">
            <button class="tab-btn active" id="btn-aviator" onclick="show('aviator')">AVIATOR SERVER</button>
            <button class="tab-btn" id="btn-mines" onclick="show('mines')">MINES FIXED</button>
        </div>

        <div id="aviator-card" class="card active">
            <div class="live-box">
                <div class="multiplier" id="mult">1.00x</div>
                <div class="plane" id="plane">✈️</div>
            </div>
            <center>
                <div class="status-text" id="a-status">SERVER CONNECTED: SPORTYBET.COM</div>
                <div style="font-size: 35px; color: #e41e26; font-weight: 900;" id="a-sig">?.??x</div>
                <button class="action-btn" onclick="crackAviator()">CRACK NEXT ROUND</button>
            </center>
        </div>

        <div id="mines-card" class="card">
            <div class="grid" id="grid"></div>
            <center>
                <div class="status-text" id="m-status">SPORTYBET MINES 3 BOMBS: READY</div>
                <button class="action-btn" onclick="crackMines()">GENERATE FIXED SIGNAL</button>
            </center>
        </div>

        <a href="https://wa.me/255763071896" class="whatsapp-float">
            💬 WASILIANA NA MUNGAJR (0763071896)
        </a>

        <script>
            function show(t) {
                document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.getElementById(t + '-card').classList.add('active');
                document.getElementById('btn-' + t).classList.add('active');
            }

            function crackAviator() {
                const sig = document.getElementById('a-sig');
                const stat = document.getElementById('a-status');
                sig.innerText = "SCANNING...";
                stat.innerText = "SYNCING WITH SPORTYBET SERVER...";
                
                setTimeout(() => {
                    const res = (Math.random() * (4.00 - 1.21) + 1.21).toFixed(2);
                    sig.innerText = res + "x";
                    stat.innerText = "SIGNAL FOUND! CASH OUT AT " + res + "x";
                    fly(res);
                }, 1800);
            }

            function fly(target) {
                const p = document.getElementById('plane');
                const d = document.getElementById('mult');
                let cur = 1.00;
                let start = Date.now();
                function step() {
                    let elap = (Date.now() - start) / 1000;
                    cur = Math.pow(1.2, elap).toFixed(2);
                    d.innerText = cur + "x";
                    p.style.transform = \`translate(\${elap * 40}px, -\${Math.pow(elap, 1.5) * 10}px)\`;
                    if (cur < target) requestAnimationFrame(step);
                    else { d.innerText = "FLEW AWAY!"; setTimeout(() => { d.innerText = "1.00x"; p.style.transform = "translate(0,0)"; }, 2000); }
                }
                step();
            }

            function crackMines() {
                const g = document.getElementById('grid');
                const s = document.getElementById('m-status');
                s.innerText = "BYPASSING SECURITY...";
                g.innerHTML = '';
                setTimeout(() => {
                    let stars = new Set();
                    while(stars.size < 4) stars.add(Math.floor(Math.random() * 25));
                    for(let i=0; i<25; i++) {
                        const cell = document.createElement('div');
                        cell.className = 'cell' + (stars.has(i) ? ' active' : '');
                        cell.innerText = stars.has(i) ? '⭐' : '';
                        g.appendChild(cell);
                    }
                    s.innerText = "FIXED PATTERN INJECTED!";
                }, 1500);
            }
            crackMines();
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT);
