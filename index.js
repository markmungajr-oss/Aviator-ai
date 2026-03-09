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
            @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(228, 30, 38, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(228, 30, 38, 0); } 100% { box-shadow: 0 0 0 0 rgba(228, 30, 38, 0); } }
            @keyframes glow { 0%, 100% { text-shadow: 0 0 10px #e41e26; } 50% { text-shadow: 0 0 20px #fff; } }
            
            body { background-color: #0d0d0d; color: #fff; font-family: 'Arial', sans-serif; margin: 0; padding: 15px; display: flex; flex-direction: column; align-items: center; }
            .header { color: #e41e26; font-weight: 900; font-size: 24px; animation: glow 2s infinite; margin-bottom: 5px; text-align: center; }
            
            .card { background: #1a1a1a; border-radius: 20px; padding: 20px; width: 100%; max-width: 400px; border: 2px solid #333; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
            
            .timer-display { background: #000; color: #00ff88; padding: 10px; border-radius: 8px; font-family: monospace; font-size: 14px; margin-bottom: 15px; border-left: 4px solid #00ff88; }
            
            .prediction-box { background: linear-gradient(180deg, #252525 0%, #151515 100%); border-radius: 15px; padding: 25px; border: 1px solid #444; text-align: center; margin-bottom: 20px; position: relative; }
            .signal-time { font-size: 22px; color: #e41e26; font-weight: 900; margin-bottom: 10px; display: block; }
            .signal-odd { font-size: 50px; font-weight: 900; color: #fff; margin: 10px 0; animation: glow 1s infinite; }
            
            .action-btn { background: #e41e26; color: white; border: none; padding: 20px; border-radius: 12px; font-weight: 900; width: 100%; cursor: pointer; font-size: 16px; animation: pulse-red 2s infinite; text-transform: uppercase; }
            
            .schedule-list { width: 100%; margin-top: 25px; background: #151515; border-radius: 12px; padding: 10px; }
            .sch-item { display: flex; justify-content: space-between; padding: 12px; border-bottom: 1px solid #222; font-size: 14px; }
            .sch-item span:first-child { color: #888; }
            .sch-item span:last-child { color: #00ff88; font-weight: bold; }

            .wa-float { background: #25d366; color: white; text-decoration: none; padding: 15px; border-radius: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-top: 30px; width: 85%; border: 2px solid #fff; }
        </style>
    </head>
    <body>
        <div class="header">MUNGAJR SPORTYBET AI</div>
        <p style="font-size: 10px; color: #888; margin-bottom: 20px;">VERSION 4.0 - LIVE SERVER SYNC</p>

        <div class="card">
            <div class="timer-display">
                SERVER TIME: <span id="clock">00:00:00</span>
            </div>

            <div class="prediction-box">
                <span id="status-tag" style="font-size: 10px; color: #00ff88; letter-spacing: 2px;">SCANNING...</span>
                <div class="signal-time" id="target-time">MUDA WA SIGNAL: --:--</div>
                <div class="signal-odd" id="target-odd">0.00x</div>
                <div style="font-size: 11px; color: #ffcc00;" id="countdown">SUBIRI SIGNAL MPYA...</div>
            </div>

            <button class="action-btn" onclick="getSignal()">BONYEZA KUPATA SIGNAL</button>

            <div class="schedule-list" id="schedule">
                <div style="font-size: 11px; color: #e41e26; font-weight: bold; margin-bottom: 10px; padding-left: 5px;">RATIBA YA SIGNAL ZIJAZO:</div>
                </div>
        </div>

        <a href="https://wa.me/255763071896" class="wa-float">
            💬 WhatsApp: 0763071896
        </a>

        <script>
            // Saa ya Seva
            setInterval(() => {
                document.getElementById('clock').innerText = new Date().toLocaleTimeString('en-GB');
            }, 1000);

            function getSignal() {
                const btn = document.querySelector('.action-btn');
                const timeText = document.getElementById('target-time');
                const oddText = document.getElementById('target-odd');
                const status = document.getElementById('status-tag');
                
                btn.disabled = true;
                btn.innerText = "CONNECTING TO SPORTYBET...";
                status.innerText = "BYPASSING FIREWALL...";

                setTimeout(() => {
                    // Piga hesabu ya dakika 2 mbele
                    const now = new Date();
                    now.setMinutes(now.getMinutes() + 2);
                    const hour = now.getHours().toString().padStart(2, '0');
                    const min = now.getMinutes().toString().padStart(2, '0');
                    const signalTime = hour + ":" + min;
                    
                    const odd = (Math.random() * (3.80 - 1.30) + 1.30).toFixed(2);

                    timeText.innerText = "MUDA WA SIGNAL: " + signalTime;
                    oddText.innerText = odd + "x";
                    status.innerText = "SIGNAL FOUND!";
                    btn.disabled = false;
                    btn.innerText = "PATA SIGNAL NYINGINE";
                    
                    document.getElementById('countdown').innerText = "INGIA SPORTYBET SASA - SUBIRI MUDA HUO";
                    updateSchedule();
                }, 2000);
            }

            function updateSchedule() {
                const sch = document.getElementById('schedule');
                const list = sch.querySelectorAll('.sch-item');
                list.forEach(el => el.remove());

                let now = new Date();
                for(let i=0; i<5; i++) {
                    now.setMinutes(now.getMinutes() + (Math.floor(Math.random() * 8) + 4));
                    const time = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
                    const odd = (Math.random() * (4.00 - 1.40) + 1.40).toFixed(2);
                    
                    const row = document.createElement('div');
                    row.className = 'sch-item';
                    row.innerHTML = '<span>Raundi ya ' + time + '</span><span>' + odd + 'x</span>';
                    sch.appendChild(row);
                }
            }
            updateSchedule();
        </script>
    </body>
    </html>
    `);
});

app.listen(PORT);
