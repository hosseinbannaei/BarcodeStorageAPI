const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs").promises;

const app = express();
app.use(bodyParser.text());

// Endpoint to append data to a text file
app.post("/api/data", async (req, res) => {
  try {
    const data = req.body;
    // Append data to a text file named 'data.txt'
    await fs.appendFile("./data/data.txt", data + "\n");
    res.json({ message: "Data appended successfully", data });
  } catch (error) {
    console.error("Error appending data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to retrieve data from the text file
app.get("/api/data", async (req, res) => {
  try {
    // Read data from the text file 'data.txt'
    const rawData = await fs.readFile("./data/data.txt", "utf-8");
    res.send(rawData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to clear the text file
app.delete('/api/data', async (req, res) => {
    try {
        // Clear the content of the text file 'data.txt'
        await fs.writeFile('./data/data.txt', '');
        res.json({ message: 'Data file cleared successfully' });
    } catch (error) {
        console.error('Error clearing data file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
