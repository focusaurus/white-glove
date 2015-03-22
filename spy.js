//http://stackoverflow.com/a/29196775/266795
module.exports = require("through2-spy").obj.bind(null, {highWaterMark: 1000});
