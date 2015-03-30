var assert  = require("assert");
var suncalc = require("../suncalc.js");

function near(val1, val2, margin) {
	return Math.abs(val1 - val2) < (margin || 1E-15);
}

describe("Sun calculations", function () {

	before(function () {
		result = suncalc(new Date('2013-03-05UTC'), 50.5, 30.5);
	});

	var result;

	it("should return correct times of sun events", function () {
		assert.equal(Math.floor(result.sunrise.getTime()/1000), 1362458096);
		assert.equal(Math.floor(result.sunset.getTime()/1000), 1362498417);
	});

});
