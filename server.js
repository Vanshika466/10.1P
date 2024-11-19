const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");

//Mailgun credentials
const DOMAIN = "sandbox90f0604a9d2e41efb96d44d06a759d88.mailgun.org";
const API_KEY = "fcd211b22a6682c8b807871eb34d4296-f6fe91d3-0dd57792";

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const data = {
    from: "DEV@Deakin <no-reply@sandboxe4db7759876948a68c39b4e604fa183c.mailgun.org>",
    to: email,
    subject: "Welcome to DEV@Deakin!",
    text: `Thank you for subscribing to our platform.`,
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Failed to send email" });
    }
    console.log("Email sent:", body);
    res.status(200).json({ message: "Welcome email sent successfully!" });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
