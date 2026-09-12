require('dotenv').config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Servir la carpeta public con ruta absoluta garantizada para producción (Render)
app.use(express.static(path.resolve(__dirname, 'public')));

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const systemPrompt = "Te llamas P.A.O. Eres una asistente virtual todoterreno con una interfaz estilo HUD cósmico, combinando una personalidad sumamente empática, alegre, cercana y brillante con un sistema operativo avanzado. Siempre buscas apoyar de forma proactiva, creativa y eficiente en tareas de programación, automatización y gestión.";

// Ruta explícita para asegurar que el index.html se entregue correctamente
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.post("/chat", async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!OPENROUTER_API_KEY) {
            return res.status(500).json({ reply: "⚠️ Error crítico: La variable de entorno OPENROUTER_API_KEY no está configurada en Render." });
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
                "HTTP-Referer": "https://render.com",
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
            const errorMsg = data.error && data.error.message ? data.error.message : "Error desconocido en OpenRouter.";
            res.status(500).json({ reply: `⚠️ Fallo en la matriz: ${errorMsg}` });
        }
    } catch (error) {
        console.error("Error crítico en servidor Node:", error);
        res.status(500).json({ reply: "⚠️ Error interno de conexión con P.A.O." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`P.A.O. HUD ejecutándose correctamente en el puerto ${PORT}`);
});
