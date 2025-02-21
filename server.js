const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// POST API to process an array
app.post('/process-array', (req, res) => {
    const { numbers } = req.body;

    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: "Input must be an array of numbers" });
    }

    // Example: Calculate sum of numbers
    const sum = numbers.reduce((acc, num) => acc + num, 0);

    res.json({ sum });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
