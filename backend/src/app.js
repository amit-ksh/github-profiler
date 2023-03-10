const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.json());

app.get('/:user/repos', async (req, res) => {
  const { user } = req.params;
  const { page } = req.query;
  let { perPage } = req.query;

  perPage = perPage || 10;

  try {
    const resp1 = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${perPage}&page=${page}`,
      {
        headers: {
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      },
    );
    const repos = await resp1.json();

    if (resp1.ok) {
      const response = await Promise.all(
        repos.map(async (repo) => {
          const resp2 = await fetch(repo.languages_url, {
            headers: {
              authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
          });
          const languages = await resp2.json();

          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            repoLink: repo.html_url,
            languages: Object.keys(languages),
          };
        }),
      );

      res.status(200).json(
        { data: response.sort((a, b) => a.languages.length - b.languages.length) },
      );
    } else {
      res.status(404).json({
        data: {
          message: 'Not Found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/:user', async (req, res) => {
  const { user } = req.params;

  try {
    const resp = await fetch(`https://api.github.com/users/${user}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });
    const data = await resp.json();

    if (resp.ok) {
      const response = {
        id: data.id,
        name: data.login,
        avatarUrl: data.avatar_url,
        bio: data.bio,
        location: data.location,
        twitterUsername: data.twitter_username,
        githubUrl: data.html_url,
        totalRepos: data.public_repos,
      };

      res.status(200).json({ data: response });
    } else {
      res.status(404).json({
        data: {
          message: 'Not Found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: '??????????????????????????????????????',
  });
});

module.exports = app;
