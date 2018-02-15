const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n' , (error) => {
    if(error) {
      console.log('Unable to log');
    }
  });
  next();
})


app.use((req,res,next) => {
  res.render('maintenance.hbs')
})

app.set('view engine', 'hbs');
app.get('/',(req,res) => {

  res.send({
  name: 'Abacus',
  name: 'Abacus',
  likes: [
    'Biking',
    'Tracking',
  ]
  })

  // res.send('<h1>Hello World!</h1>');
});
app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle:'About Page',
    currentYear: new Date().getFullYear(),
  });
})

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Bad Request',
  })
})






app.listen(3000, () => {
  console.log('Server is listening to port 3000');
});
