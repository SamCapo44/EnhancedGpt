const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const configuration = new Configuration({
    organization: "org-bWBoSLGCSmfaKsYsB8FpolEV",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// create a simple express api that calls the function above
const app = express()
const port = 3080;

//add cors to express
app.use(bodyParser.json())
app.use(cors())


app.post("/", async (req, res) => {
    const { message } = req.body;
    console.log(message, "message")
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    res.json({
        message: response.data.choices[0].text,
    });
});

app.get('/models', async (req, res) => {
    const response = await openai.listEngines();
    console.log(response.data.data) 
    res.json({
        models: response.data.data
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});