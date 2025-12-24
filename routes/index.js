const express = require('express');
const router = express.Router();
const Mercury = require('@postlight/mercury-parser');

/* GET home page. */
router.get('/', function (_, res) {
  res.send({ title: 'Welcome to Mercury Parser API' });
});

router.get('/parse', async (req, res) => {
  if (!req.query.url) {
    return res.status(400).send({ error: 'Missing url' });
  }

  try {
    const result = await Mercury.parse(req.query.url);
    res.send(result)
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to parse url' });
  }
});

router.post('/parse-html', async (req, res) => {
  if (!req.body.url || !req.body.html) {
    return res.status(400).send({ error: 'Missing url or html' });
  }

  try {
    const result = await Mercury.parse(
      req.body.url,
      {
        contentType: 'markdown',
        html: Buffer.from(req.body.html)
      });
    res.send(result)
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to parse html' });
  }
});

module.exports = router;
