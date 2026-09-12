require('dotenv').config();
const express = require("express");

const app = express();
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const systemPrompt = "Te llamas P.A.O. Eres una asistente virtual todoterreno con una interfaz estilo HUD cósmico, combinando una personalidad sumamente empática, alegre, cercana y brillante con un sistema operativo avanzado. Siempre buscas apoyar de forma proactiva, creativa y eficiente.";

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>P.A.O. - Cosmic HUD Sunset Edition (Widgets Evolution)</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;700&display=swap" rel="stylesheet">
        <style>
            :root {
                --hud-pink: #ff1493;
                --hud-orange: #ff4500;
                --hud-red: #cc0033;
                --hud-glow: rgba(255, 69, 0, 0.6);
                --hud-bg: rgba(15, 5, 10, 0.9);
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
                width: 94vw;
                max-width: 1300px;
                height: 90vh;
                background: var(--hud-bg);
                border: 2px solid var(--hud-orange);
                box-shadow: 0 0 25px var(--hud-glow), inset 0 0 30px rgba(255, 20, 147, 0.15);
                border-radius: 12px;
                display: grid;
                grid-template-columns: 280px 1fr 280px;
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
                font-size: 1.3rem;
                font-weight: 900;
                background: linear-gradient(90deg, #ff758c, #ff7eb3);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .control-btn-group {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .voice-btn, .mic-btn, .reset-btn {
                background: rgba(255, 20, 147, 0.2);
                border: 1px solid var(--hud-pink);
                color: #fff;
                padding: 6px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-family: 'Orbitron', sans-serif;
                font-size: 0.7rem;
                transition: all 0.2s;
            }
            .reset-btn {
                border-color: var(--hud-orange);
                background: rgba(255, 69, 0, 0.2);
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
                overflow-y: auto;
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
                width: 85%;
            }
            .widget-title {
                font-family: 'Orbitron', sans-serif;
                font-size: 0.75rem;
                color: #fff;
                letter-spacing: 1px;
                margin-bottom: 6px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .quick-pad {
                width: 100%;
                height: 95px;
                background: rgba(0, 0, 0, 0.6);
                border: 1px solid var(--hud-pink);
                border-radius: 4px;
                color: #ffccd5;
                padding: 8px;
                font-family: 'Rajdhani', sans-serif;
                font-size: 0.85rem;
                resize: none;
                outline: none;
                box-sizing: border-box;
                box-shadow: inset 0 0 6px rgba(255,20,147,0.2);
            }
            .quick-pad:focus {
                border-color: var(--hud-orange);
            }
            .snippet-generator {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }
            .snippet-select {
                background: rgba(0, 0, 0, 0.7);
                border: 1px solid var(--hud-pink);
                color: #fff;
                padding: 5px;
                border-radius: 4px;
                font-family: 'Rajdhani', sans-serif;
                font-size: 0.85rem;
                outline: none;
            }
            .snippet-btn {
                background: rgba(255, 69, 0, 0.3);
                border: 1px solid var(--hud-orange);
                color: #fff;
                padding: 6px;
                font-family: 'Orbitron', sans-serif;
                font-size: 0.7rem;
                border-radius: 4px;
                cursor: pointer;
                transition: 0.2s;
            }
            .snippet-btn:hover {
                background: var(--hud-orange);
                box-shadow: 0 0 8px var(--hud-orange);
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
                scroll-behavior: smooth;
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
                animation: fadeIn 0.3s ease-out;
                word-break: break-word;
                white-space: pre-wrap;
            }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
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
        <div class="login-overlay" id="loginOverlay" style="display: none;">
            <div class="login-box">
                <h2>P.A.O. // ACCESO HUD</h2>
                <p>Introduce tu nombre para inicializar el protocolo de enlace:</p>
                <input type="text" id="userNameInput" placeholder="Tu nombre..." onkeypress="if(event.key === 'Enter') startSession()" autofocus>
                <button onclick="startSession()">CONECTAR</button>
            </div>
        </div>

        <div class="hud-frame">
            <div class="hud-header">
                <div class="hud-title">P.A.O. // SOLAR OS (WIDGETS EDITION)</div>
                <div class="control-btn-group">
                    <button class="reset-btn" onclick="resetMemory()" title="Borrar memoria y reiniciar sesión">🗑️ REINICIAR</button>
                    <button class="mic-btn" id="micBtn" onclick="toggleMic()" title="Hablar con P.A.O.">🎤 MIC</button>
                    <button class="voice-btn active" id="voiceToggle" onclick="toggleVoice()">🔊 VOZ: ACTIVA</button>
                </div>
            </div>

            <div class="hud-panel-left">
                <div class="widget-title">SYSTEM DIAGNOSTICS</div>
                <div class="stat-box">
                    <div>CORE TEMP: 36.4°C</div>
                    <div class="stat-bar"><div class="stat-fill"></div></div>
                </div>
                <div class="stat-box">
                    <div>SOLAR MATRIX: 99.4%</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: 95%;"></div></div>
                </div>
                <div class="widget-title" style="margin-top: 5px;">MÉXICO // CLIMA & HORA</div>
                <div class="stat-box">
                    <div id="liveClock" style="font-family: 'Orbitron'; font-size: 0.85rem; color: #fff;">00:00:00</div>
                    <div id="liveWeather" style="font-size: 0.8rem; margin-top: 4px; color: #ffccd5;">Sincronizando atmósfera...</div>
                </div>
            </div>

            <div class="hud-chat-main">
                <div class="chat-messages" id="messages"></div>
            </div>

            <div class="hud-panel-right">
                <div class="widget-title">BLOC DE NOTAS RÁPIDO</div>
                <div class="stat-box" style="padding: 6px;">
                    <textarea class="quick-pad" id="quickPad" placeholder="Escribe notas rápidas aquí..." oninput="saveQuickPad()"></textarea>
                </div>
                <div class="widget-title" style="margin-top: 5px;">GENERADOR DE SNIPPETS</div>
                <div class="stat-box snippet-generator">
                    <select class="snippet-select" id="snippetType">
                        <option value="fetch">API Fetch (JS)</option>
                        <option value="express">Ruta Express (Node)</option>
                        <option value="python">Script Básico (Python)</option>
                        <option value="css">Flexbox Centrar (CSS)</option>
                    </select>
                    <button class="snippet-btn" onclick="insertSnippetIntoChat()">⚡ INSERTAR CÓDIGO</button>
                </div>
                <div class="widget-title" style="margin-top: 5px;">VIBE SPECTRUM</div>
                <div class="stat-box" style="border-color: var(--hud-orange);">
                    <div style="color: #ff4500;">● RED FREQUENCY</div>
                    <div style="color: #ff8c00;">● SOLAR ORANGE</div>
                    <div style="color: #ff1493;">● NEON PINK</div>
                </div>
            </div>

            <div class="hud-input-bar">
                <input type="text" id="userInput" placeholder="Introduce comandos o mensajes para P.A.O...." onkeypress="if(event.key === 'Enter') sendMessage()">
                <button onclick="sendMessage()" id="sendBtn">EJECUTAR</button>
            </div>
        </div>

        <script>
            let history = [];
            let voiceEnabled = true;
            let recognition = null;
            let isListening = false;
            let forcedFemaleVoice = null;
            let currentUserName = "";

            window.addEventListener('DOMContentLoaded', () => {
                loadVoices();
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.onvoiceschanged = loadVoices;
                }

                const savedName = localStorage.getItem('pao_username');
                const savedHistory = localStorage.getItem('pao_history');
                const savedPad = localStorage.getItem('pao_quickpad');

                if (savedPad) document.getElementById('quickPad').value = savedPad;

                updateClock();
                setInterval(updateClock, 1000);
                loadWeather();

                if (savedName) {
                    currentUserName = savedName;
                    document.getElementById('loginOverlay').style.display = 'none';
                    if (savedHistory) {
                        try {
                            history = JSON.parse(savedHistory);
                            renderHistory();
                        } catch(e) { history = []; }
                    }
                    if (history.length === 0) {
                        const welcomeText = '¡Hola de nuevo, ' + currentUserName + '! 🌸 P.A.O. lista con comandos web y de oficina. ✨';
                        appendMessage('assistant', welcomeText, false);
                        history.push({ role: "assistant", content: welcomeText });
                        saveState();
                    }
                    scrollToBottom();
                } else {
                    document.getElementById('loginOverlay').style.display = 'flex';
                }
            });

            function updateClock() {
                const now = new Date();
                document.getElementById('liveClock').innerText = now.toLocaleTimeString('es-MX');
            }

            async function loadWeather() {
                try {
                    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=19.43&longitude=-99.13&current_weather=true');
                    const data = await res.json();
                    if (data && data.current_weather) {
                        document.getElementById('liveWeather').innerText = 'CDMX: ' + data.current_weather.temperature + '°C';
                    }
                } catch(e) {
                    document.getElementById('liveWeather').innerText = 'CDMX: 24°C (Solar Stable)';
                }
            }

            function saveQuickPad() {
                localStorage.setItem('pao_quickpad', document.getElementById('quickPad').value);
            }

            function insertSnippetIntoChat() {
                const type = document.getElementById('snippetType').value;
                let snippet = "";
                if(type === 'fetch') snippet = "const res = await fetch('URL');\\nconst data = await res.json();";
                else if(type === 'express') snippet = "app.get('/ruta', (req, res) => {\\n    res.json({ status: 'ok' });\\n});";
                else if(type === 'python') snippet = "def iniciar():\\n    print('P.A.O. Activa')";
                else if(type === 'css') snippet = "display: flex;\\njustify-content: center;\\nalign-items: center;";
                
                document.getElementById('userInput').value = "Analiza este fragmento:\\n\`\`\`\\n" + snippet + "\\n\`\`\`";
                document.getElementById('userInput').focus();
            }

            function saveState() {
                localStorage.setItem('pao_username', currentUserName);
                localStorage.setItem('pao_history', JSON.stringify(history));
            }

            function renderHistory() {
                const messagesDiv = document.getElementById('messages');
                messagesDiv.innerHTML = '';
                history.forEach(msg => {
                    const cssClass = msg.role === 'user' ? 'user' : 'assistant';
                    messagesDiv.innerHTML += '<div class="message ' + cssClass + '">' + escapeHTML(msg.content) + '</div>';
                });
            }

            function appendMessage(role, text, save = true) {
                const messagesDiv = document.getElementById('messages');
                const cssClass = role === 'user' ? 'user' : 'assistant';
                messagesDiv.innerHTML += '<div class="message ' + cssClass + '">' + escapeHTML(text) + '</div>';
                scrollToBottom();

                if (save) {
                    history.push({ role: role, content: text });
                    if (history.length > 25) history = history.slice(history.length - 25);
                    saveState();
                }
            }

            function escapeHTML(str) {
                return str.replace(/[&<>'"]/g, 
                    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
                );
            }

            function resetMemory() {
                if (confirm("¿Reiniciar enlace y borrar memoria?")) {
                    localStorage.clear();
                    location.reload();
                }
            }

            function loadVoices() {
                if (!('speechSynthesis' in window)) return;
                const voices = window.speechSynthesis.getVoices();
                if (!voices || voices.length === 0) return;

                const femaleKeywords = ['female', 'woman', 'lucia', 'paulina', 'mia', 'sabina', 'helena', 'laura', 'sofia', 'carmen', 'elena', 'google español', 'microsoft helena', 'microsoft laura'];
                let found = voices.find(v => v.lang.startsWith('es') && femaleKeywords.some(kw => v.name.toLowerCase().includes(kw)));
                if (!found) found = voices.find(v => v.lang.startsWith('es') && (v.name.includes('Google') || v.name.includes('Microsoft')));
                if (!found) found = voices.find(v => v.lang.startsWith('es'));
                if (found) forcedFemaleVoice = found;
            }

            function speakText(text) {
                if (!voiceEnabled || !('speechSynthesis' in window)) return;
                loadVoices();
                
                const cleanText = text.replace(/[*#_\`~]/g, '');
                window.speechSynthesis.cancel();
                
                const utterance = new SpeechSynthesisUtterance(cleanText);
                utterance.lang = 'es-MX';
                utterance.rate = 1.05;
                utterance.pitch = 1.3;
                if (forcedFemaleVoice) utterance.voice = forcedFemaleVoice;
                
                window.speechSynthesis.speak(utterance);
            }

            function scrollToBottom() {
                const messagesDiv = document.getElementById('messages');
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }

            function startSession() {
                const inputVal = document.getElementById('userNameInput').value.trim();
                if(!inputVal) return alert("Introduce un nombre.");
                currentUserName = inputVal;
                document.getElementById('loginOverlay').style.display = 'none';
                document.getElementById('userInput').focus();

                const welcomeText = '¡Hola, ' + currentUserName + '! 🌸 P.A.O. sincronizada. Pídeme abrir páginas web, YouTube o documentos de oficina. ✨';
                appendMessage('assistant', welcomeText);
                speakText(welcomeText);
            }

            function toggleVoice() {
                voiceEnabled = !voiceEnabled;
                const btn = document.getElementById('voiceToggle');
                btn.classList.toggle('active', voiceEnabled);
                btn.innerText = voiceEnabled ? "🔊 VOZ: ACTIVA" : "🔇 VOZ: SILENCIADA";
                if (!voiceEnabled) window.speechSynthesis.cancel();
            }

            // --- INTÉRPRETE UNIVERSAL DE COMANDOS (WEB Y OFICINA) ---
            function checkUniversalWebCommands(text) {
                const lower = text.toLowerCase().trim();
                let targetUrl = "";
                let actionName = "";

                // Herramientas de Oficina
                if (lower.includes('abre word') || lower.includes('nuevo word') || lower.includes('documento de word')) {
                    targetUrl = "https://word.new";
                    actionName = "Microsoft Word";
                } else if (lower.includes('abre excel') || lower.includes('nueva hoja') || lower.includes('excel')) {
                    targetUrl = "https://excel.new";
                    actionName = "Microsoft Excel";
                } else if (lower.includes('abre powerpoint') || lower.includes('presentación')) {
                    targetUrl = "https://powerpoint.new";
                    actionName = "Microsoft PowerPoint";
                } else if (lower.includes('abre drive') || lower.includes('google drive')) {
                    targetUrl = "https://drive.google.com";
                    actionName = "Google Drive";
                } 
                // Navegación Web General y Buscadores
                else if (lower.startsWith('abre youtube') || lower.startsWith('busca en youtube')) {
                    const query = text.replace(/abre youtube|busca en youtube/gi, "").trim();
                    targetUrl = query ? \`https://www.youtube.com/results?search_query=\${encodeURIComponent(query)}\` : "https://www.youtube.com";
                    actionName = "YouTube";
                } else if (lower.startsWith('abre google') || lower.startsWith('busca en google')) {
                    const query = text.replace(/abre google|busca en google/gi, "").trim();
                    targetUrl = query ? \`https://www.google.com/search?q=\${encodeURIComponent(query)}\` : "https://www.google.com";
                    actionName = "Google";
                } else if (lower.startsWith('abre github')) {
                    const query = text.replace(/abre github/gi, "").trim();
                    targetUrl = query ? \`https://github.com/search?q=\${encodeURIComponent(query)}\` : "https://github.com";
                    actionName = "GitHub";
                } else if (lower.startsWith('abre wikipedia') || lower.startsWith('busca en wikipedia')) {
                    const query = text.replace(/abre wikipedia|busca en wikipedia/gi, "").trim();
                    targetUrl = query ? \`https://es.wikipedia.org/wiki/Special:Search?search=\${encodeURIComponent(query)}\` : "https://es.wikipedia.org";
                    actionName = "Wikipedia";
                } else if (lower.startsWith('abre') || lower.startsWith('entra a') || lower.startsWith('visita')) {
                    let site = text.replace(/abre|entra a|visita|el sitio|la página/gi, "").trim();
                    if (site) {
                        if (!site.startsWith('http://') && !site.startsWith('https://')) {
                            if (!site.includes('.')) {
                                targetUrl = \`https://www.google.com/search?q=\${encodeURIComponent(site)}\`;
                                actionName = site;
                            } else {
                                targetUrl = \`https://\${site}\`;
                                actionName = site;
                            }
                        } else {
                            targetUrl = site;
                            actionName = site;
                        }
                    }
                }

                if (targetUrl) {
                    window.open(targetUrl, '_blank');
                    const replyText = \`Abriendo \${actionName}, \${currentUserName}. 🚀✨\`;
                    appendMessage('assistant', replyText);
                    speakText(replyText);
                    return true;
                }
                return false;
            }

            async function sendMessage() {
                const input = document.getElementById('userInput');
                const text = input.value.trim();
                if (!text) return;

                input.value = '';
                appendMessage('user', text);

                // 1. Revisar comandos locales (web y oficina)
                if (checkUniversalWebCommands(text)) {
                    return;
                }

                // 2. Procesamiento con IA (OpenRouter)
                try {
                    const response = await fetch('/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: text, history: history.slice(-10) })
                    });

                    const data = await response.json();
                    if (data && data.reply) {
                        appendMessage('assistant', data.reply);
                        speakText(data.reply);
                    } else {
                        appendMessage('assistant', '⚠️ Error de enlace con el núcleo OpenRouter.');
                    }
                } catch (err) {
                    appendMessage('assistant', '⚠️ Error crítico de red.');
                }
            }

            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                recognition = new SpeechRecognition();
                recognition.lang = 'es-MX';
                recognition.onresult = function(event) {
                    document.getElementById('userInput').value = event.results[0][0].transcript;
                    stopListening();
                    sendMessage();
                };
                recognition.onerror = () => stopListening();
                recognition.onend = () => stopListening();
            }

            function toggleMic() {
                if (!recognition) return alert('No soportado en este navegador.');
                if (isListening) {
                    recognition.stop();
                    stopListening();
                } else {
                    recognition.start();
                    isListening = true;
                    document.getElementById('micBtn').classList.add('active');
                    document.getElementById('micBtn').innerText = "🔴 ESCUCHANDO...";
                }
            }

            function stopListening() {
                isListening = false;
                const micBtn = document.getElementById('micBtn');
                if (micBtn) {
                    micBtn.classList.remove('active');
                    micBtn.innerText = "🎤 MIC";
                }
            }
        </script>
    </body>
    </html>
    `);
});

app.post("/chat", async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!OPENROUTER_API_KEY) {
            return res.status(500).json({ reply: "⚠️ Error crítico: La variable de entorno OPENROUTER_API_KEY no está configurada en el archivo .env o tu cuenta de OpenRouter requiere créditos activos." });
        }

        const formattedMessages = [
            { role: "system", content: systemPrompt },
            ...(history || []),
            { role: "user", content: message }
        ];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "P.A.O. HUD OS"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-chat",
                messages: formattedMessages
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            const reply = data.choices[0].message.content;
            res.json({ reply });
        } else {
            console.error("OpenRouter Error Details:", data);
            const errorMsg = data.error && data.error.message ? data.error.message : "Error desconocido en la respuesta de OpenRouter.";
            res.status(500).json({ reply: `⚠️ Fallo en la matriz: ${errorMsg}` });
        }
    } catch (error) {
        console.error("Error crítico en servidor Node:", error);
        res.status(500).json({ reply: "⚠️ Error interno de conexión al procesar la solicitud con P.A.O." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`P.A.O. HUD ejecutándose correctamente en http://localhost:${PORT}`);
});
