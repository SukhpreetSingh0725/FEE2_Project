import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import { GoogleGenAI } from '@google/genai';

// --- Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize the Google AI SDK using the secret key from .env
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Define allowed origins for enhanced CORS stability
// FIX: Added 'http://localhost:5174' as the development server port changed again
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'];

// --- Middleware ---
// Enhanced CORS setup to explicitly allow communication from the React dev server
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked request from origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
// Allows parsing of JSON request bodies
app.use(express.json()); 


// --- HELPER FUNCTION: Retry Mechanism with Exponential Backoff ---
// UPDATED: Increased max retries to 5 to handle persistent 503 errors.
const MAX_RETRIES = 5; 

async function retryGenerateContent(config, attempt = 1) {
    // Helper function to pause execution
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
        return await ai.models.generateContent(config);
    } catch (error) {
        // Check if the error is a 503 UNAVAILABLE (Model Overloaded)
        if (error.message.includes(`"code":503`) && attempt < MAX_RETRIES) {
            const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s, 16s delay
            console.warn(`[Attempt ${attempt}/${MAX_RETRIES}] Model overloaded (503). Retrying in ${delay / 1000} seconds...`);
            await sleep(delay);
            return retryGenerateContent(config, attempt + 1);
        }
        // If it's a different error or we've run out of retries, throw the error
        throw error;
    }
}


// --- Endpoint for Student Questions (POST /api/ask) ---
app.post('/api/ask', async (req, res) => {
    const { prompt } = req.body; 

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required in the request body.' });
    }
    
    // Define the system instruction for the AI
    // FIX: Strengthening the instruction to force the use of headings and lists, and ban large paragraphs.
    const systemInstructionText = "You are an encouraging and helpful academic assistant named SparkQ. Your primary goal is to maximize readability for a high school or college student. **STRICT RULE:** Never respond with a large block of text. **ALWAYS** use Markdown for formatting. Every response must begin with a level 2 heading (##). Use level 3 headings (###) to separate distinct topics. **MANDATORY:** Use bulleted or numbered lists for all key concepts, steps, and examples. BOLD all important terms. Keep paragraphs extremely short (max 3 sentences).";

    const geminiConfig = {
        model: "gemini-2.5-flash", 
        systemInstruction: {
            parts: [{ text: systemInstructionText }]
        },
        contents: [
            { role: "user", parts: [{ text: prompt }] }
        ],
    };

    try {
        // 3. Call the retry wrapper instead of the direct generateContent call
        const response = await retryGenerateContent(geminiConfig);

        // 4. Send the AI's response back as 'reply' (expected variable name by frontend)
        res.json({ reply: response.text }); 

    } catch (error) {
        console.error("Gemini API Error:", error.message);
        res.status(500).json({ 
            error: "Failed to get an answer from the AI, even after retries. Check server logs.",
            details: error.message
        });
    }
});

// --- Health Check Endpoint (GET /) ---
app.get('/', (req, res) => {
    res.send('SparkQ Server is running!');
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 SparkQ Server running securely on http://localhost:${PORT}`);
    if (!process.env.GEMINI_API_KEY) {
        console.warn("WARNING: GEMINI_API_KEY is missing in the .env file!");
    }
});