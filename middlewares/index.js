/**
 * Created by ashishprasher on 18/02/20.
 */

const bodyParser              = require('body-parser');
const config                  = require('config');


app.set('port', config.get('PORT'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    return res.sendStatus(400);
  }
  next();
});


console.log("App Environment Running at: ", app.get('env'));