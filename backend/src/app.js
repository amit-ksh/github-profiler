const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/:user/repos', async (req, res) => {
  const { user } = req.params;
  const { page } = req.query;
  let { perPage } = req.query;

  perPage = perPage || 10;

  try {
    const response = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${perPage}&page=${page}`,
    );
    const repos = await response.json();

    if (response.ok) {
      res.status(200).json({ data: repos, totalRepo: repos.length });
    } else {
      res.status(404).json({
        data: {
          message: 'Not Found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ data: { message: 'Server Error!' } });
  }
});

app.get('/:user', async (req, res) => {
  const { user } = req.params;

  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({
        data: {
          message: 'Not Found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ data: { message: 'Server Error!' } });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

module.exports = app;
