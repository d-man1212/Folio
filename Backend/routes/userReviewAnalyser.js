const express = require('express');
const router = express.Router();

async function query(data) {
    try {
        // Using dynamic import to import node-fetch
        const fetch = await import('node-fetch');
        
        const response = await fetch.default(
            "https://api-inference.huggingface.co/models/lxyuan/distilbert-base-multilingual-cased-sentiments-student",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

router.get('/:userQuery', async (req, res) => {
    try {
        const userQuery = req.params.userQuery; // Correcting the parameter name
        const data = { "inputs": userQuery };
        const result = await query(data);
        res.json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
