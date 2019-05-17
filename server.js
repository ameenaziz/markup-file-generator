const fs = require('fs');
const express = require('express'); 
const Handlebars = require('handlebars');
const app = express();
app.set('port', (process.env.PORT || 3010));

const source = fs.readFileSync('template.html', 'utf8');
const template = Handlebars.compile(source);
   
const dataRaw = fs.readFileSync('data.json', 'utf8');
const dataParsed = JSON.parse(dataRaw); 

const result = template(dataParsed);  

app.get('/', function(req, res) {
    res.send(result);
});

app.use('/html', function(req, res) {
  res.render('index.html', result);
})

const stream = fs.createWriteStream("./dist/index.html");
stream.once('open', function(fd) {
  stream.write(result);
  stream.end();
});


app.listen(app.get('port'), function(){
    console.log('Server started on port ' + app.get('port'));
} )



