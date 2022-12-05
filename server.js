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



app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.render("index.ejs");
});



app.post('/chat', function(req, res) {
 const { text } = req.body;
  console.log(text);
  const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    max_tokens: 7,
    temperature: 0,
  });
  response.then((data) => {
    data = data?.data?.choices[0].text;
    res.send(data);
  }
  ).catch((err) => {
    // console.log(err);
    res.send (err);
  }
  );

      


  
});

app.post('/chatttttt', (req, res) => {
  // console.log(req.body);
  // const response = openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
  //   temperature: 0.9,
  //   max_tokens: 150,
  //   top_p: 1,
  //   frequency_penalty: 0.0,
  //   presence_penalty: 0.6,
  //   stop: [" Human:", " AI:"],
  // });
  // console.log(response.data);
  res.send('Hello World!');
});



app.listen({ port: process.env.PORT || 3000 }, () => {
  console.log("Server is running on port localhost: 3000");
});
