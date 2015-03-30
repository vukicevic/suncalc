
SunCalc
=======

SunCalc is a tiny BSD-licensed JavaScript library for calculating sun position,
sunlight phases (times for sunrise, sunset, dusk, etc.)
created by [Vladimir Agafonkin](http://agafonkin.com/en) ([@mourner](https://github.com/mourner))
as a part of the [SunCalc.net project](http://suncalc.net).

Most calculations are based on the formulas given in the excellent Astronomy Answers articles
about [position of the sun](http://aa.quae.nl/en/reken/zonpositie.html)
and [the planets](http://aa.quae.nl/en/reken/hemelpositie.html).
You can read about different twilight phases calculated by SunCalc
in the [Twilight article on Wikipedia](http://en.wikipedia.org/wiki/Twilight).

## Reference

### Sunlight times

```javascript
SunCalc(/*Date*/ date, /*Number*/ latitude, /*Number*/ longitude)
```

Returns an object with the following properties (each is a `Date` object) CURRENTLY INCORRECT:

| Property        | Description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| `sunrise`       | sunrise (top edge of the sun appears on the horizon)                     |
| `sunriseEnd`    | sunrise ends (bottom edge of the sun touches the horizon)                |
| `sunsetStart`   | sunset starts (bottom edge of the sun touches the horizon)               |
| `sunset`        | sunset (sun disappears below the horizon, evening civil twilight starts) |
| `dusk`          | dusk (evening nautical twilight starts)                                  |
| `nauticalDusk`  | nautical dusk (evening astronomical twilight starts)                     |
| `night`         | night starts (dark enough for astronomical observations)                 |
| `dawn`          | dawn (morning nautical twilight ends, morning civil twilight starts)     |
| `nauticalDawn`  | nautical dawn (morning nautical twilight starts)                         |
| `nightEnd`      | night ends (morning astronomical twilight starts)                        |
| `nadir`         | nadir (darkest moment of the night, sun is in the lowest position)       |
| `solarNoon`     | solar noon (sun is in the highest position)                              |


### Sun position

Returns an object with the following properties:

 * `altitude`: sun altitude above the horizon in radians,
 e.g. `0` at the horizon and `PI/2` at the zenith (straight over your head)
 * `azimuth`: sun azimuth in radians (direction along the horizon, measured from south to west),
 e.g. `0` is south and `Math.PI * 3/4` is northwest

## Changelog

#### 2.0.0

Forked from original, moon positions removed. Output reworked.
