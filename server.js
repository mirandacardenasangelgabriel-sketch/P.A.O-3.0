const express = require("express");

const app = express();
app.use(express.json());

const OPENROUTER_API_KEY = "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";
const systemPrompt = "Te llamas P.A.O. Eres una asistente virtual todoterreno con una interfaz estilo HUD cósmico, combinando una personalidad sumamente empática, alegre y cercana con un sistema operativo avanzado.";

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>P.A.O. - Cosmic HUD Sunset Edition</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;700&display=swap" rel="stylesheet">
        <style>
            :root {
                --hud-pink: #ff1493;
                --hud-orange: #ff4500;
                --hud-red: #cc0033;
                --hud-glow: rgba(255, 69, 0, 0.6);
                --hud-bg: rgba(15, 5, 10, 0.85);
            }
            body {
                font-family: 'Rajdhani', sans-serif;
                background: radial-gradient(circle at center, #260515 0%, #0a0104 100%);
                margin: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                color: #ffccd5;
            }
            body::before {
                content: " ";
                display: block;
                position: absolute;
                top: 0; left: 0; bottom: 0; right: 0;
                background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
                z-index: 999;
                background-size: 100% 4px, 6px 100%;
                pointer-events: none;
            }
            .login-overlay {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: radial-gradient(circle at center, #1a0210 0%, #050002 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            .login-box {
                background: var(--hud-bg);
                border: 2px solid var(--hud-orange);
                box-shadow: 0 0 35px var(--hud-glow), inset 0 0 20px rgba(255, 20, 147, 0.2);
                padding: 40px;
                border-radius: 12px;
                text-align: center;
                display: flex;
                flex-direction: column;
                gap: 20px;
                width: 90%;
                max-width: 420px;
            }
            .login-box h2 {
                font-family: 'Orbitron', sans-serif;
                color: #fff;
                margin: 0;
                font-size: 1.5rem;
                text-shadow: 0 0 10px var(--hud-pink);
                letter-spacing: 2px;
            }
            .login-box p {
                color: #ff99b3;
                font-size: 0.95rem;
                margin: 0;
            }
            .login-box input {
                background: rgba(0, 0, 0, 0.7);
                border: 1px solid var(--hud-pink);
                border-radius: 4px;
                padding: 12px;
                color: #fff;
                font-family: 'Rajdhani', sans-serif;
                font-size: 1.1rem;
                outline: none;
                text-align: center;
                box-shadow: inset 0 0 8px rgba(255,20,147,0.3);
            }
            .login-box input:focus {
                border-color: var(--hud-orange);
                box-shadow: 0 0 15px var(--hud-glow);
            }
            .login-box button {
                background: linear-gradient(135deg, var(--hud-orange), var(--hud-pink));
                border: none;
                color: #fff;
                padding: 14px;
                font-family: 'Orbitron', sans-serif;
                font-weight: bold;
                letter-spacing: 2px;
                cursor: pointer;
                border-radius: 4px;
                box-shadow: 0 0 12px var(--hud-glow);
                transition: all 0.2s;
            }
            .login-box button:hover {
                filter: brightness(1.2);
                box-shadow: 0 0 20px var(--hud-pink);
            }
            .hud-frame {
                width: 92vw;
                max-width: 1200px;
                height: 88vh;
                background: var(--hud-bg);
                border: 2px solid var(--hud-orange);
                box-shadow: 0 0 25px var(--hud-glow), inset 0 0 30px rgba(255, 20, 147, 0.15);
                border-radius: 12px;
                display: grid;
                grid-template-columns: 260px 1fr 260px;
                grid-template-rows: 70px 1fr 70px;
                grid-template-areas:
                    "header header header"
                    "left-panel chat-main right-panel"
                    "footer footer footer";
                position: relative;
            }
            .hud-header {
                grid-area: header;
                border-bottom: 2px solid var(--hud-pink);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 25px;
                background: linear-gradient(90deg, rgba(255,20,147,0.1), rgba(255,69,0,0.2), rgba(255,20,147,0.1));
                font-family: 'Orbitron', sans-serif;
                letter-spacing: 3px;
                color: #fff;
                text-shadow: 0 0 10px var(--hud-orange);
            }
            .hud-title {
                font-size: 1.4rem;
                font-weight: 900;
                background: linear-gradient(90deg, #ff758c, #ff7eb3);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .voice-btn, .mic-btn {
                background: rgba(255, 20, 147, 0.2);
                border: 1px solid var(--hud-pink);
                color: #fff;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-family: 'Orbitron', sans-serif;
                font-size: 0.75rem;
                transition: all 0.2s;
            }
            .voice-btn.active, .mic-btn.active {
                background: var(--hud-pink);
                box-shadow: 0 0 10px var(--hud-pink);
            }
            .mic-btn.active {
                background: var(--hud-orange);
                border-color: var(--hud-orange);
                box-shadow: 0 0 15px var(--hud-orange);
                animation: pulse 1.5s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.08); }
                100% { transform: scale(1); }
            }
            .hud-panel-left, .hud-panel-right {
                padding: 15px;
                font-size: 0.85rem;
                border-color: rgba(255, 69, 0, 0.3);
                display: flex;
                flex-direction: column;
                gap: 12px;
                color: #ff99b3;
            }
            .hud-panel-left { grid-area: left-panel; border-right: 1px dashed var(--hud-orange); }
            .hud-panel-right { grid-area: right-panel; border-left: 1px dashed var(--hud-orange); }
            .stat-box {
                background: rgba(255, 69, 0, 0.05);
                border: 1px solid var(--hud-pink);
                padding: 10px;
                border-radius: 4px;
                box-shadow: inset 0 0 8px rgba(255,20,147,0.2);
            }
            .stat-bar {
                height: 6px;
                background: #400;
                margin-top: 6px;
                border-radius: 3px;
                overflow: hidden;
            }
            .stat-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--hud-orange), var(--hud-pink));
                width: 78%;
            }
            .hud-chat-main {
                grid-area: chat-main;
                display: flex;
                flex-direction: column;
                padding: 20px;
                position: relative;
                min-height: 0;
            }
            .hud-chat-main::before {
                content: "";
                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: 350px; height: 350px;
                border: 2px dashed rgba(255, 69, 0, 0.15);
                border-radius: 50%;
                pointer-events: none;
                animation: spin 30s linear infinite;
            }
            @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
            .chat-messages {
                flex: 1;
                min-height: 0;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 12px;
                padding-right: 12px;
                z-index: 2;
            }
            .chat-messages::-webkit-scrollbar { width: 8px; }
            .chat-messages::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.4);
                border-radius: 4px;
                border: 1px solid rgba(255, 20, 147, 0.2);
            }
            .chat-messages::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, var(--hud-orange), var(--hud-pink));
                border-radius: 4px;
                box-shadow: 0 0 8px var(--hud-glow);
            }
            .message {
                padding: 12px 16px;
                border-radius: 6px;
                max-width: 80%;
                line-height: 1.5;
                font-size: 0.95rem;
                backdrop-filter: blur(4px);
            }
            .user {
                background: linear-gradient(135deg, rgba(255, 69, 0, 0.4), rgba(204, 0, 51, 0.5));
                border: 1px solid var(--hud-orange);
                color: #fff;
                align-self: flex-end;
                box-shadow: 0 0 10px rgba(255,69,0,0.3);
            }
            .assistant {
                background: linear-gradient(135deg, rgba(255, 20, 147, 0.2), rgba(255, 105, 180, 0.1));
                border: 1px solid var(--hud-pink);
                color: #ffccd5;
                align-self: flex-start;
                box-shadow: 0 0 10px rgba(255,20,147,0.2);
            }
            .hud-input-bar {
                grid-area: footer;
                border-top: 2px solid var(--hud-orange);
                display: flex;
                align-items: center;
                padding: 0 20px;
                background: rgba(255, 20, 147, 0.05);
                gap: 15px;
            }
            .hud-input-bar input {
                flex: 1;
                background: rgba(0, 0, 0, 0.6);
                border: 1px solid var(--hud-pink);
                border-radius: 4px;
                padding: 12px;
                color: #fff;
                font-family: 'Rajdhani', sans-serif;
                font-size: 1rem;
                outline: none;
                box-shadow: inset 0 0 8px rgba(255,20,147,0.3);
            }
            .hud-input-bar input:focus {
                border-color: var(--hud-orange);
                box-shadow: 0 0 12px var(--hud-glow);
            }
            .hud-input-bar button {
                background: linear-gradient(135deg, var(--hud-orange), var(--hud-pink));
                border: none;
                color: #fff;
                padding: 12px 25px;
                font-family: 'Orbitron', sans-serif;
                font-weight: bold;
                letter-spacing: 2px;
                cursor: pointer;
                border-radius: 4px;
                box-shadow: 0 0 12px var(--hud-glow);
                transition: all 0.2s;
            }
            .hud-input-bar button:hover {
                filter: brightness(1.2);
                box-shadow: 0 0 20px var(--hud-pink);
            }
            @media(max-width: 900px) {
                .hud-frame { grid-template-columns: 1fr; grid-template-areas: "header" "chat-main" "footer"; height: 96vh; }
                .hud-panel-left, .hud-panel-right { display: none; }
            }
        </style>
    </head>
    <body>
        <div class="login-overlay" id="loginOverlay">
            <div class="login-box">
                <h2>P.A.O. // ACCESO HUD</h2>
                <p>Introduce tu nombre para inicializar el protocolo de enlace:</p>
                <input type="text" id="userNameInput" placeholder="Tu nombre..." onkeypress="if(event.key === 'Enter') startSession()">
                <button onclick="startSession()">CONECTAR</button>
            </div>
        </div>

        <div class="hud-frame">
            <div class="hud-header">
                <div class="hud-title">P.A.O. // SOLAR OS</div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button class="mic-btn" id="micBtn" onclick="toggleMic()" title="Hablar con P.A.O.">🎤 MIC</button>
                    <button class="voice-btn active" id="voiceToggle" onclick="toggleVoice()">🔊 VOZ: ACTIVA</button>
                </div>
            </div>

            <div class="hud-panel-left">
                <div style="font-family: 'Orbitron'; font-size: 0.8rem; color: #fff;">SYSTEM DIAGNOSTICS</div>
                <div class="stat-box">
                    <div>CORE TEMP: 36.4°C</div>
                    <div class="stat-bar"><div class="stat-fill"></div></div>
                </div>
                <div class="stat-box">
                    <div>SOLAR MATRIX: 98.2%</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: 92%;"></div></div>
                </div>
                <div class="stat-box">
                    <div>SYNAPSE LINK: SECURE</div>
                </div>
            </div>

            <div class="hud-chat-main">
                <div class="chat-messages" id="messages">
                </div>
            </div>

            <div class="hud-panel-right">
                <div style="font-family: 'Orbitron'; font-size: 0.8rem; color: #fff;">VIBE SPECTRUM</div>
                <div class="stat-box" style="border-color: var(--hud-orange);">
                    <div style="color: #ff4500;">● RED FREQUENCY</div>
                    <div style="color: #ff8c00;">● SOLAR ORANGE</div>
                    <div style="color: #ff1493;">● NEON PINK</div>
                </div>
                <div class="stat-box">
                    <div>AI MODEL: OPENROUTER</div>
                </div>
            </div>

            <div class="hud-input-bar">
                <input type="text" id="userInput" placeholder="Introduce comandos o mensajes para P.A.O..." onkeypress="if(event.key === 'Enter') sendMessage()">
                <button onclick="sendMessage()">EJECUTAR</button>
            </div>
        </div>

        <script>
            let history = [];
            let voiceEnabled = true;
            let recognition = null;
            let isListening = false;
            let spanishVoice = null;
            let currentUserName = "";

            function loadVoices() {
                const voices = window.speechSynthesis.getVoices();
                spanishVoice = voices.find(v => v.lang.startsWith('es') && (
                    v.name.toLowerCase().includes('female') || 
                    v.name.toLowerCase().includes('mujer') || 
                    v.name.toLowerCase().includes('helena') || 
                    v.name.toLowerCase().includes('laura') || 
                    v.name.toLowerCase().includes('lucia') || 
                    v.name.toLowerCase().includes('sofia') || 
                    v.name.toLowerCase().includes('mia') || 
                    v.name.toLowerCase().includes('paulina') || 
                    v.name.toLowerCase().includes('monica') || 
                    v.name.toLowerCase().includes('sabina') ||
                    v.name.toLowerCase().includes('zira') ||
                    v.name.toLowerCase().includes('victoria')
                )) 
                || voices.find(v => v.lang.startsWith('es') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Microsoft'))) 
                || voices.find(v => v.lang.startsWith('es'));
            }

            if ('speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = loadVoices;
                loadVoices();
            }

            function speakText(text) {
                if (!voiceEnabled || !('speechSynthesis' in window)) return;
                
                const cleanText = text.replace(/[*#_\`~]/g, '').replace(/[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{2600}-\u{26FF}]/gu, '');
                
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(cleanText);
                utterance.lang = 'es-MX';
                utterance.rate = 1.05;
                utterance.pitch = 1.25;
                
                if (spanishVoice) {
                    utterance.voice = spanishVoice;
                }

                window.speechSynthesis.speak(utterance);
            }

            function startSession() {
                const inputVal = document.getElementById('userNameInput').value.trim();
                if(!inputVal) {
                    alert("Por favor, introduce un nombre.");
                    return;
                }
                currentUserName = inputVal;
                
                document.getElementById('loginOverlay').style.display = 'none';

                const messagesDiv = document.getElementById('messages');
                const welcomeText = '¡Hola, ' + currentUserName + '! 🌸 Protocolo solar activo. P.A.O. enlazada a tu interfaz HUD con toda la energía. ¿Qué desarrollamos hoy? ✨';
                messagesDiv.innerHTML = '<div class="message assistant">' + welcomeText + '</div>';
                
                speakText('¡Hola, ' + currentUserName + '! Protocolo solar activo. P.A.O. enlazada a tu interfaz HUD.');
            }

            function toggleVoice() {
                voiceEnabled = !voiceEnabled;
                const btn = document.getElementById('voiceToggle');
                if (voiceEnabled) {
                    btn.classList.add('active');
                    btn.innerText = "🔊 VOZ: ACTIVA";
                } else {
                    btn.classList.remove('active');
                    btn.innerText = "🔇 VOZ: SILENCIADA";
                }
            }

            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                recognition = new SpeechRecognition();
                recognition.lang = 'es-MX';
                recognition.continuous = false;
                recognition.interimResults = false;

                recognition.onresult = function(event) {
                    const speechToText = event.results[0][0].transcript;
                    document.getElementById('userInput').value = speechToText;
                    stopListening();
                    sendMessage();
                };

                recognition.onerror = () => stopListening();
                recognition.onend = () => stopListening();
            }

            function toggleMic() {
                if (!recognition) {
                    alert('Tu navegador no soporta reconocimiento de voz.');
                    return;
                }
                const micBtn = document.getElementById('micBtn');
                if (isListening) {
                    recognition.stop();
                } else {
                    recognition.start();
                    isListening = true;
                    micBtn.classList.add('active');
                    micBtn.innerText = "🔴 ESCUCHANDO...";
                    document.getElementById('userInput').placeholder = "Habla ahora con P.A.O....";
                }
            }

            function stopListening() {
                isListening = false;
                const micBtn = document.getElementById('micBtn');
                if (micBtn) {
                    micBtn.classList.remove('active');
                    micBtn.innerText = "🎤 MIC";
                }
                document.getElementById('userInput').placeholder = "Introduce comandos o mensajes para P.A.O...";
            }

            async function sendMessage() {
                const input = document.getElementById('userInput');
                const messagesDiv = document.getElementById('messages');
                const text = input.value.trim();
                if (!text) return;

                messagesDiv.innerHTML += '<div class="message user">' + text + '</div>';
                input.value = '';
                messagesDiv.scrollTop = messagesDiv.scrollHeight;

                history.push({ role: "user", content: text });

                try {
                    const res = await fetch('/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ messages: history, userName: currentUserName })
                    });
                    const data = await res.json();
                    if(data.reply) {
                        messagesDiv.innerHTML += '<div class="message assistant">' + data.reply + '</div>';
                        speakText(data.reply); 
                        if (!data.reply.includes("Fluctuación en el núcleo") && !data.reply.includes("Error de red")) {
                            history.push({ role: "assistant", content: data.reply });
                        }
                    } else {
                        messagesDiv.innerHTML += '<div class="message assistant">¡Ay, ' + currentUserName + '! Fluctuación en el núcleo.</div>';
                    }
                } catch (e) {
                    messagesDiv.innerHTML += '<div class="message assistant">¡Ay, ' + currentUserName + '! Error de red en el HUD: ' + e.message + '</div>';
                }
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }
        </script>
    </body>
    </html>
    `);
});

app.post("/chat", async (req, res) => {
    try {
        const userMessages = req.body.messages || [];
        const userName = req.body.userName || "Usuario";
        
        const dynamicSystemPrompt = systemPrompt + " Te estás comunicando con " + userName + ". Dirígete a él o ella por su nombre cuando sea natural.";
        const fullMessages = [{ role: "system", content: dynamicSystemPrompt }, ...userMessages];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + OPENROUTER_API_KEY,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://vercel.com",
                "X-Title": "P.A.O. HUD Assistant"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: fullMessages,
                temperature: 0.7,
                max_tokens: 2048
            })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            res.json({ reply: data.choices[0].message.content });
        } else {
            res.json({ reply: "¡Ay! Detalle técnico: " + (data.error?.message || "Error en OpenRouter") });
        }
    } catch (error) {
        res.json({ reply: "¡Ay! Detalle técnico: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));

module.exports = app;
