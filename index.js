const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({
    extended: true
  }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/my-custom-prompt', (req, res) => {
    const state = req.query.state;

    res.render('pages/foo', { state });
  })
  .post('/my-custom-prompt', (req, res) => {
    console.log(req.body)
    const state = req.body.state;

    console.log("Redirecting with state ", state);

    res.redirect(`https://seejee-node-12.stage.auth0.com/continue?state=${state}`);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
