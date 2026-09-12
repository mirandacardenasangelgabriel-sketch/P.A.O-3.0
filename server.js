require('dotenv').config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const systemPrompt = "Te llamas P.A.O. Eres una asistente virtual todoterreno con una interfaz estilo HUD cósmico, combinando una personalidad sumamente empática, alegre, cercana y brillante con un sistema operativo avanzado. Siempre buscas apoyar de forma proactiva, creativa y eficiente en tareas de programación, automatización y gestión.";

// Sirve el index.html directamente desde la raíz del proyecto
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post("/chat", async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!OPENROUTER_API_KEY) {
            return res.status(500).json({ reply: "⚠️ Error crítico: La variable de entorno OPENROUTER_API_KEY no está configurada." });
        }

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
                messages: [
                    { role: "system", content: systemPrompt },
                    ...(history || []),
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            res.json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ reply: "⚠️ Error en la respuesta de OpenRouter." });
        }
    } catch (error) {
        res.status(500).json({ reply: "⚠️ Error interno de conexión." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});
