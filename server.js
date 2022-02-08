const fs = require('fs');
const express = require('express'); 
const Handlebars = require('handlebars');
const app = express();

app.set('port', (process.env.PORT || 3020));

const source = fs.readFileSync('template.html', 'utf8');
const template = Handlebars.compile(source);
const dataRaw = fs.readFileSync('data.json', 'utf8');
const dataParsed = JSON.parse(dataRaw); 
const result = template(dataParsed);  
const dir = './dist';

app.get('/', function(req, res) {
    res.send(result);
});

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const stream = fs.createWriteStream("./dist/index.html");
stream.once('open', () => {
  stream.write(result);
  stream.end();
});


app.listen(app.get('port'), ()=> {
    console.log('Server started on port http://localhost:' + app.get('port'));
} )



