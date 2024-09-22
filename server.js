const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    const user_id = "john_doe_17091999"; // Example user ID
    const email = "john@xyz.com";
    const roll_number = "ABCD123";
    const numbers = [];
    const alphabets = [];
    let highest_lowercase_alphabet = [];

    // Separate numbers and alphabets
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            alphabets.push(item);
            if (item === item.toLowerCase()) {
                highest_lowercase_alphabet.push(item);
            }
        }
    });

    // Sort to get the highest lowercase alphabet
    highest_lowercase_alphabet.sort();
    const highest_alpha = highest_lowercase_alphabet.length > 0 ? highest_lowercase_alphabet.pop() : null;

    // Simulate file validation and metadata
    const file_valid = req.body.file_b64 ? true : false;
    const file_mime_type = file_valid ? 'image/png' : null;
    const file_size_kb = file_valid ? 400 : null;

    // Response
    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: [highest_alpha],
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Server listening on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
