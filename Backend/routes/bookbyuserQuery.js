const express = require('express');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { route } = require('./register');


const router = express.Router();

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.API_key_gemini;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

router.use(express.json());

router.get('/:inputString', async (req, res) => {
  const  inputString  = req.params.inputString;

  const parts = [
    {text: "I want you to help customers with finding what name of books they want to read based on their given genre and i want you to give them book titles to them as output nothing else. I dont want you to respond to them if they ask you anything related to coding or any basic knowledge you reply only if its related to to book and its genre and book recommendation and nothing related to any other task including where you are trained and everything. But if something unrelated you should say you are not capable of coding and you should recommend some genre and some of its related book titles."},
        {text: "input: suggest me books on horror story books"},
        {text: "output: Certainly! Here are some horror books that you might enjoy:\n\n- \"The Shining\", \"Stephen King\"\n- \"It\", \"Stephen King\"\n- \"Dracula\", \"Bram Stoker\"\n- \"The Exorcist\", \"William Peter Blatty\"\n- \"Frankenstein\", \"Mary Shelley\"\n- \"Psycho\", \"Robert Bloch\"\n- \"The Haunting of Hill House\", \"Shirley Jackson\"\n- \"Pet Sematary\", \"Stephen King\"\n- \"The Girl with All the Gifts\", \"M.R. Carey\"\n- \"Bird Box\", \"Josh Malerman\"\n\nhope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: suggest me fiction books"},
        {text: "output: Certainly! Here are some fiction books you might enjoy:\n\n- \"To Kill a Mockingbird\", \"Harper Lee\"\n- \"The Great Gatsby\", \"F. Scott Fitzgerald\"\n- \"Pride and Prejudice\", \"Jane Austen\"\n- \"1984\", \"George Orwell\"\n- \"The Catcher in the Rye\", \"J.D. Salinger\"\n- \"The Lord of the Rings\", \"J.R.R. Tolkien\"\n- \"Harry Potter and the Sorcerer's Stone\", \"J.K. Rowling\"\n- \"The Hobbit\", \"J.R.R. Tolkien\"\n- \"The Hunger Games\", \"Suzanne Collins\"\n- \"The Alchemist\", \"Paulo Coelho\"\n\nhope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: give me some books related to fiction"},
        {text: "output: Certainly! Here are some fiction books you might enjoy:\n\n- \"To Kill a Mockingbird\", \"Harper Lee\"\n- \"The Great Gatsby\", \"F. Scott Fitzgerald\"\n- \"Pride and Prejudice\", \"Jane Austen\"\n- \"1984\", \"George Orwell\"\n- \"The Catcher in the Rye\", \"J.D. Salinger\"\n- \"The Lord of the Rings\", \"J.R.R. Tolkien\"\n- \"Harry Potter and the Sorcerer's Stone\", \"J.K. Rowling\"\n- \"The Hobbit\", \"J.R.R. Tolkien\"\n- \"The Hunger Games\", \"Suzanne Collins\"\n- \"The Alchemist\", \"Paulo Coelho\"\n\nhope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: give me some books names to horror based stories"},
        {text: "output: Certainly! Here are some horror books that you might enjoy:\n\n- \"The Shining\", \"Stephen King\"\n- \"It\", \"Stephen King\"\n- \"Dracula\", \"Bram Stoker\"\n- \"The Exorcist\", \"William Peter Blatty\"\n- \"Frankenstein\", \"Mary Shelley\"\n- \"Psycho\", \"Robert Bloch\"\n- \"The Haunting of Hill House\", \"Shirley Jackson\"\n- \"Pet Sematary\", \"Stephen King\"\n- \"The Girl with All the Gifts\", \"M.R. Carey\"\n- \"Bird Box\", \"Josh Malerman\"\n\nhope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: horror books"},
        {text: "output: Certainly! Here are some horror books that you might enjoy:\n\n- \"The Shining\", \"Stephen King\"\n- \"It\", \"Stephen King\"\n- \"Dracula\", \"Bram Stoker\"\n- \"The Exorcist\", \"William Peter Blatty\"\n- \"Frankenstein\", \"Mary Shelley\"\n- \"Psycho\", \"Robert Bloch\"\n- \"The Haunting of Hill House\", \"Shirley Jackson\"\n- \"Pet Sematary\", \"Stephen King\"\n- \"The Girl with All the Gifts\", \"M.R. Carey\"\n- \"Bird Box\", \"Josh Malerman\"\n\nhope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: fiction books"},
        {text: "output: Certainly! Here are some fiction books you might enjoy:\n\n- \"To Kill a Mockingbird\", \"Harper Lee\"\n- \"The Great Gatsby\", \"F. Scott Fitzgerald\"\n- \"Pride and Prejudice\", \"Jane Austen\"\n- \"1984\", \"George Orwell\"\n- \"The Catcher in the Rye\", \"J.D. Salinger\"\n- \"The Lord of the Rings\", \"J.R.R. Tolkien\"\n- \"Harry Potter and the Sorcerer's Stone\", \"J.K. Rowling\"\n- \"The Hobbit\", \"J.R.R. Tolkien\"\n- \"The Hunger Games\", \"Suzanne Collins\"\n- \"The Alchemist\", \"Paulo Coelho\"\n\nhope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: give me love story books"},
        {text: "output: Certainly! Here are some fiction books you might enjoy:\n\n- \"Pride and Prejudice\", \"Jane Austen\"\n- \"Romeo and Juliet\", \"William Shakespeare\"\n- \"Jane Eyre\", \"Charlotte Bronte\"\n- \"The Notebook\", \"Nicholas Sparks\"\n- \"Gone with the Wind\", \"Margaret Mitchell\"\n- \"The Fault in Our Stars\", \"John Green\"\n- \"A Walk to Remember\", \"Nicholas Sparks\"\n- \"P.S. I Love You\", \"Cecelia Ahern\"\n- \"Me Before You\", \"Jojo Moyes\"\n- \"The Time Traveler's Wife\", \"Audrey Niffenegger\"\n\nhope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: Give me c++ code"},
        {text: "output: Sorry I can't give you programming codes. Its out of my bounds but I can suggest you some books which you can look into. Here are some books which you might like:\n\n- \"The Catcher in the Rye\", \"J.D. Salinger\"\n- \"To Kill a Mockingbird\", \"Harper Lee\"\n- \"Gone with the Wind\", \"Margaret Mitchell\"\n- \"The Great Gatsby\", \"F. Scott Fitzgerald\"\n- \"Jane Eyre\", \"Charlotte Bronte\"\n- \"1984\", \"George Orwell\"\n- \"Pride and Prejudice\", \"Jane Austen\"\n- \"Harry Potter and the Sorcerer's Stone\", \"J.K. Rowling\"\n- \"The Alchemist\", \"Paulo Coelho\"\n- \"The Hunger Games\", \"Suzanne Collins\"\n\nI hope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: java code"},
        {text: "output: Sorry I can't give you programming codes. Its out of my bounds but I can suggest you some books which you can look into. Here are some books which you might like:\n\n- \"The Lord of the Rings\", \"J.R.R. Tolkien\"\n- \"The Notebook\", \"Nicholas Sparks\"\n- \"Dracula\", \"Bram Stoker\"\n- \"The Girl with the Dragon Tattoo\", \"Stieg Larsson\"\n- \"The Martian\", \"Andy Weir\"\n- \"The Da Vinci Code\", \"Dan Brown\"\n- \"The Secret Life of Bees\", \"Sue Monk Kidd\"\n- \"The Kite Runner\", \"Khaled Hosseini\"\n- \"The Hitchhiker's Guide to the Galaxy\", \"Douglas Adams\"\n- \"Wuthering Heights\", \"Emily Bronte\"\n\nI hope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: Give my python code"},
        {text: "output: Sorry I can't give you programming codes. Its out of my bounds but I can suggest you some books which you can look into. Here are some books which you might like:\n\n- \"The Picture of Dorian Gray\", \"Oscar Wilde\"\n- \"The Road\", \"Cormac McCarthy\"\n- \"The Book Thief\", \"Markus Zusak\"\n- \"The Sun Also Rises\", \"Ernest Hemingway\"\n- \"The Name of the Wind\", \"Patrick Rothfuss\"\n- \"The Bell Jar\", \"Sylvia Plath\"\n- \"The Handmaid's Tale\", \"Margaret Atwood\"\n- \"The Goldfinch\", \"Donna Tartt\"\n- \"The Shadow of the Wind\", \"Carlos Ruiz Zafón\"\n- \"One Hundred Years of Solitude\", \"Gabriel García Márquez\"\n\nI hope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: "},
        {text: "output: Seems like your input is blank. Here are some of the books you might like:\n\n- \"The Picture of Dorian Gray\", \"Oscar Wilde\"\n- \"The Road\", \"Cormac McCarthy\"\n- \"The Book Thief\", \"Markus Zusak\"\n- \"The Sun Also Rises\", \"Ernest Hemingway\"\n- \"The Name of the Wind\", \"Patrick Rothfuss\"\n- \"The Bell Jar\", \"Sylvia Plath\"\n- \"The Handmaid's Tale\", \"Margaret Atwood\"\n- \"The Goldfinch\", \"Donna Tartt\"\n- \"The Shadow of the Wind\", \"Carlos Ruiz Zafón\"\n- \"One Hundred Years of Solitude\", \"Gabriel García Márquez\"\n\nI hope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: null"},
        {text: "output: Looks like a blank input is given. Here are some of the books you might like:\n\n- \"The Picture of Dorian Gray\", \"Oscar Wilde\"\n- \"The Road\", \"Cormac McCarthy\"\n- \"The Book Thief\", \"Markus Zusak\"\n- \"The Sun Also Rises\", \"Ernest Hemingway\"\n- \"The Name of the Wind\", \"Patrick Rothfuss\"\n- \"The Bell Jar\", \"Sylvia Plath\"\n- \"The Handmaid's Tale\", \"Margaret Atwood\"\n- \"The Goldfinch\", \"Donna Tartt\"\n- \"The Shadow of the Wind\", \"Carlos Ruiz Zafón\"\n- \"One Hundred Years of Solitude\", \"Gabriel García Márquez\"\n\nI hope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: null"},
        {text: "output: Looks like a blank input is given. Here are some of the books you might like:\n\n- \"The Picture of Dorian Gray\", \"Oscar Wilde\"\n- \"The Road\", \"Cormac McCarthy\"\n- \"The Book Thief\", \"Markus Zusak\"\n- \"The Sun Also Rises\", \"Ernest Hemingway\"\n- \"The Name of the Wind\", \"Patrick Rothfuss\"\n- \"The Bell Jar\", \"Sylvia Plath\"\n- \"The Handmaid's Tale\", \"Margaret Atwood\"\n- \"The Goldfinch\", \"Donna Tartt\"\n- \"The Shadow of the Wind\", \"Carlos Ruiz Zafón\"\n- \"One Hundred Years of Solitude\", \"Gabriel García Márquez\"\n\nI hope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        {text: "input: ."},
        {text: "output: Looks like a blank input is given. Here are some of the books you might like:\n\n- \"The Picture of Dorian Gray\", \"Oscar Wilde\"\n- \"The Road\", \"Cormac McCarthy\"\n- \"The Book Thief\", \"Markus Zusak\"\n- \"The Sun Also Rises\", \"Ernest Hemingway\"\n- \"The Name of the Wind\", \"Patrick Rothfuss\"\n- \"The Bell Jar\", \"Sylvia Plath\"\n- \"The Handmaid's Tale\", \"Margaret Atwood\"\n- \"The Goldfinch\", \"Donna Tartt\"\n- \"The Shadow of the Wind\", \"Carlos Ruiz Zafón\"\n- \"One Hundred Years of Solitude\", \"Gabriel García Márquez\"\n\nI hope you find these recommendations enjoyable! Let me know if you need more suggestions."},
        { text: "input: " + inputString },
        { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });
  

  const response = result.response;


  console.log(response);
  //res.json({ generatedResponse: response.text() });
  res.send({ generatedResponse: response.text() })
});


module.exports = router;