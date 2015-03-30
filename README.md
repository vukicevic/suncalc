
SunCalc
=======

This is a refactored fork of SunCalc only returning calculated times.

SunCalc is a tiny BSD-licensed JavaScript library for calculating
sunlight phases (times for sunrise, sunset, dusk, etc.)
created by [Vladimir Agafonkin](http://agafonkin.com/en) ([@mourner](https://github.com/mourner)).

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

Returns an object with the following properties

| Property       | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| sunrise        | sunrise                                                            |
| sunset         | sunset                                                             |
| dusk           | end of dusk twilights                                              |
|  .civil        | civil twilight                                                     |
|  .nautical     | nautical twilights                                                 |
|  .astronomical | astronomical twilight (night begins)                               |
| dawn           | beginning of dawn twilights                                        |
|  .civil        | civil dawn                                                         |
|  .nautical     | nautical dawn                                                      |
|  .astronomical | astronomical dawn (night ends)                                     |
| antipodes      |                                                                    |
|  .nadir        | nadir (darkest moment of the night, sun is in the lowest position) |
|  .zenith       | solar noon (sun is in the highest position)                        |


## Changelog

#### 2.0.0

Forked from original, moon positions removed. Output reworked.
