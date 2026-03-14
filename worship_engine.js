import {
    Coordinates,
    CalculationMethod,
    PrayerTimes,
    SunnahTimes,
    Prayer,
    Qibla
} from 'adhan';
import { DateTime } from 'luxon';

/**
 * UmmahVerse Worship Engine
 * Handles Prayer Times, Sunnah Times, and Qibla Direction
 */
class WorshipEngine {
    constructor(latitude, longitude, method = 'MuslimWorldLeague') {
        this.coordinates = new Coordinates(latitude, longitude);
        this.date = new Date();
        this.params = CalculationMethod[method]();
        this.prayerTimes = new PrayerTimes(this.coordinates, this.date, this.params);
    }

    /**
     * Get prayer times for the current day
     * @returns {Object} Formatted prayer times
     */
    getTimes() {
        return {
            fajr: DateTime.fromJSDate(this.prayerTimes.fajr).toLocaleString(DateTime.TIME_SIMPLE),
            sunrise: DateTime.fromJSDate(this.prayerTimes.sunrise).toLocaleString(DateTime.TIME_SIMPLE),
            dhuhr: DateTime.fromJSDate(this.prayerTimes.dhuhr).toLocaleString(DateTime.TIME_SIMPLE),
            asr: DateTime.fromJSDate(this.prayerTimes.asr).toLocaleString(DateTime.TIME_SIMPLE),
            maghrib: DateTime.fromJSDate(this.prayerTimes.maghrib).toLocaleString(DateTime.TIME_SIMPLE),
            isha: DateTime.fromJSDate(this.prayerTimes.isha).toLocaleString(DateTime.TIME_SIMPLE),
        };
    }

    /**
     * Get the next prayer
     * @returns {String} Next prayer name
     */
    getNextPrayer() {
        return this.prayerTimes.nextPrayer();
    }

    /**
     * Get Qibla direction from current coordinates
     * @returns {Number} Degrees
     */
    getQiblaDirection() {
        return Qibla(this.coordinates);
    }

    /**
     * Get Sunnah times (Middle of Night, Last Third)
     * @returns {Object} Formatted times
     */
    getSunnahTimes() {
        const sunnah = new SunnahTimes(this.prayerTimes);
        return {
            middleOfTheNight: DateTime.fromJSDate(sunnah.middleOfTheNight).toLocaleString(DateTime.TIME_SIMPLE),
            lastThirdOfTheNight: DateTime.fromJSDate(sunnah.lastThirdOfTheNight).toLocaleString(DateTime.TIME_SIMPLE),
        };
    }
}

export default WorshipEngine;
