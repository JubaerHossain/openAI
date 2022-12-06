const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
var bodyParser = require('body-parser')
var cors = require('cors')

const open_secret = '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';

const configuration = new Configuration({
  apiKey: open_secret,
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
    temperature: 0.5,
    max_tokens: 60,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0,
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





app.listen({ port: process.env.PORT || 3000 }, () => {
  console.log("Server is running on port localhost: 3000");
});
