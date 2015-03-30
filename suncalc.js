/*
 SunCalc refactor by Nenad Vukicevic, forked from:
 (c) 2011-2014, Vladimir Agafonkin https://github.com/mourner/suncalc
*/

function SunCalc (date, lat, lng) {

  var sin  = Math.sin,
      cos  = Math.cos,
      tan  = Math.tan,
      asin = Math.asin,
      atan = Math.atan2,
      acos = Math.acos,
      rad  = Math.PI / 180;

  // sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas
  // date/time constants and conversions
  var dayMs = 86400000,
      J1970 = 2440588,
      J2000 = 2451545;

  var J0  = 0.0009,
      e   = rad * 23.4397; // obliquity of the Earth

  var lw  = rad * -lng,
      phi = rad * lat,
      d   = toDays(date),
      n   = julianCycle(d, lw),
      ds  = approxTransit(0, lw, n),
      M   = solarMeanAnomaly(ds),
      L   = eclipticLongitude(M),
      dec = declination(L, 0);

  var Jzn = solarTransitJ(ds, M, L);

  function toJulian (date) { return date.valueOf() / dayMs - 0.5 + J1970; }
  function fromJulian (j)  { return new Date((j + 0.5 - J1970) * dayMs); }
  function toDays (date)   { return toJulian(date) - J2000; }

  // general calculations for position
  function rightAscension (l, b)  { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
  function declination (l, b)     { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }
  function azimuth (H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
  function altitude (H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }
  function siderealTime (d, lw)   { return rad * (280.16 + 360.9856235 * d) - lw; }

  // general sun calculations
  function solarMeanAnomaly (d)   { return rad * (357.5291 + 0.98560028 * d); }

  function eclipticLongitude (M) {
    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + Math.PI;
  }

  function sunCoords (d) {
    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        "dec" : declination(L, 0)
      , "ra"  : rightAscension(L, 0)
    };
  }

  // calculates sun position for a given date and latitude/longitude
  function getPosition () {
    var c   = sunCoords(d),
        H   = siderealTime(d, lw) - c.ra;

    return {
        "altitude" : altitude(H, phi, c.dec)
      , "azimuth"  : azimuth(H, phi, c.dec)
    };
  }

  // calculations for sun times
  function julianCycle (d, lw) { return Math.round(d - J0 - lw / (2 * Math.PI)); }
  function approxTransit (Ht, lw, n) { return J0 + (Ht + lw) / (2 * Math.PI) + n; }
  function solarTransitJ (ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }
  function hourAngle (h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }

  // returns set time for the given sun altitude
  function getSetJ (h) {
      var w = hourAngle(h, phi, dec),
          a = approxTransit(w, lw, n);

      return solarTransitJ(a, M, L);
  }

  function getMorningTime (angle) {
    return fromJulian(Jzn - (getSetJ(angle * rad) - Jzn));
  }

  function getEveningTime (angle) {
    return fromJulian(getSetJ(angle * rad));
  }

  return {

      "antipodes" : { "zenith" : fromJulian(Jzn), "nadir" : fromJulian(Jzn - 0.5) }
    , "dawn"      : { "astronomical" : getMorningTime(-18), "civil" : getMorningTime(-6), "nautical" : getMorningTime(-12) }
    , "dusk"      : { "astronomical" : getEveningTime(-18), "civil" : getEveningTime(-6), "nautical" : getEveningTime(-12) }
    , "position"  : getPosition()
    , "sunrise"   : getMorningTime(-0.833)
    , "sunset"    : getEveningTime(-0.833)

  };

}

module.exports = SunCalc;