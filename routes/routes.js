// routes.js
import axios from 'axios';
var fs = require('fs');

module.exports = (app, config, partials) => {

  app.get('/', async (req, res) => {
    return res.render('home', {
      partials
    })
  });
  // Submit form
  app.get('/getInventory', async (req, res) => {
    const url = config.BASE_URL + "/merchants/" + config.MID + "/items?access_token=" + config.API_TOKEN;
    axios.get(url).then(function (response) {
        if(!!response.data.elements)
        {
          fs.writeFile('clover/items.json', JSON.stringify(response.data.elements), 'utf8', (err) => {
            if (err){
              console.log(err);
              res.status(500).json({
                status: 'error',
                data: 'Unable to Get items'
              })
            }
            res.json({
              status: 'success',
              data: response.data.elements
            })
          });
        }
        else{
          res.status(500).json({
            status: 'error',
            data: 'No items found'
          })
        }
    }).catch(function (error) {
      console.log(error);
      res.status(500).json({
        status: 'error',
        data: 'Unable to Get items'
      })
    });      
  })
}