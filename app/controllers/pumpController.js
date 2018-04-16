const ENV = require('./../../ENV');

const PumpFactory = ENV.PI ? require('./../lib/pump') : require('./../mocks/lib/pump');
const pump = new PumpFactory(27);

const pumpController = {
  startPump: function (req, res, next) {
    // const pump = new PumpFactory(27);
    pump.on().then(() => {
      res.send('pump started');
    }, (err) => {
      //
    });
  },
  stopPump: function (req, res, next) {
    // const pump = new PumpFactory(27);
    pump.off().then(() => {
      res.send('pump stopped');
    }, (err) => {
      //
    });
  },
  getPumpStatus: function (req, res, next) {
    // const pump = new PumpFactory(27);
    pump.getState().then((state) => {
      res.send(state);
    }, (e) => {
      console.log(e);
    });
  },
  water: function (req, res, next) {
    // const pump = new PumpFactory(27);
    pump.runFor(5000).then(() => {
      res.send({
        message: 'watering',
        data: {
          timeout: 5000,
        },
      });
    }, (err) => {
      pump.off().then(() => {
        res.send('pump stopped');
      }, (err) => {
        //
      });
    });
  },
}
module.exports = pumpController;