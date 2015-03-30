var assert  = require("assert");
var suncalc = require("../suncalc.js");

function near(val1, val2, margin) {
	return Math.abs(val1 - val2) < (margin || 1E-15);
}

describe("Sun calculations", function () {

	before(function () {
		result = suncalc(new Date('2013-03-05UTC'), 50.5, 30.5);
		console.log(result);
	});

	var result;

	it("should return correct position of sun", function () {
		assert(near(result.position.azimuth, -2.5003175907168385));
		assert(near(result.position.altitude, -0.7000406838781611));
	});

	it("should return correct times of sun events", function () {
		assert.equal(Math.floor(result.sunrise.start.getTime()/1000), 1362458096);
		assert.equal(Math.floor(result.sunset.finish.getTime()/1000), 1362498417);
	});

});
