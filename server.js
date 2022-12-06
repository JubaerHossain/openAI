const express = require("express");
require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");
var bodyParser = require('body-parser')
var cors = require('cors')


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const openai = new OpenAIApi(configuration);
const app = express();
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
// app.set('view engine','ejs'); 


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/", (req, res) => {
  return res.render("index.ejs");
});

app.post('/chat', async(req, res)  => {
 const { text } = req.body;
  await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6
  }).then((response) => {

    res.send(response.data.choices[0].text);
  }
  ).catch((err) => {
    console.log(err);
  }
  );
  
  
});

// error handling for 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// error handling for 500
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).send(err.message);
});





app.listen({ port: process.env.PORT || 3004 }, () => {
  console.log("Server is running on port localhost:" + process.env.PORT);
});
