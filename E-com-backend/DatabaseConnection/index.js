const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(cors({
    origin:["https://rouchacielo-nsqy.vercel.app/"],
    method:["POST","GET"],
    Credential:true
}));
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define the Link Schema
const LinkSchema = new mongoose.Schema({
    short: { type: String, required: true, unique: true },
    long: { type: String, required: true }
});
const Link = mongoose.model('Link', LinkSchema);

// API Routes

// Shorten URL
app.post('/api/shorten', async (req, res) => {
    try {
        const { long } = req.body;
        if (!long) return res.status(400).json({ error: "URL is required" });

        const short = Math.random().toString(36).substring(7); // Generate a short code
        const newLink = new Link({ short, long });
        await newLink.save();

        res.json({ short, long, shortUrl: `${req.protocol}://${req.get('host')}/${short}` });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Redirect to Original URL
app.get('/:short', async (req, res) => {
    try {
        const link = await Link.findOne({ short: req.params.short });
        if (link) return res.redirect(link.long);
        res.status(404).json({ error: "Link not found" });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to the URL Shortener API!");
});

// Export for Vercel
module.exports = app;
