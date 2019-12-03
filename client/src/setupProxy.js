  
const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    if(process.env.IS_PRODUCTION_ENV!=='true'){
        app.use(proxy(['/api'], { target: 'http://localhost:3001' }));
    }
}