// Config
module.exports = (app, config, partials) => {
  require('./routes')(app, config, partials)
}