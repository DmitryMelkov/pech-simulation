import express from 'express';

const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 96;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});