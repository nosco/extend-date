require('extend-string');

// Show a fuzzy timestamp between the current Date objects time and now or what you put in the first parameter
Date.prototype.timeToGo = Date.prototype.timeAway = function(starttime, showshort) {
  var showshort = showshort || false;

  // Result in a positive value
  var fuzzy = this.fuzzyTime(starttime);

  if(fuzzy.direction == 'past') {
    fuzzy.diff = -fuzzy.diff;
  }

  return fuzzy.diff + ' ' + (showshort ? fuzzy.unitShort : fuzzy.unit);
};
Object.defineProperty(Date.prototype, 'timeToGo', { enumerable: false });

// Show a fuzzy timestamp between the current Date objects time and now or what you put in the first parameter
Date.prototype.timeAgo = function(endtime, showshort) {
  var showshort = showshort || false;

  // Result in a positive value
  var fuzzy = this.fuzzyTime(endtime);

  if(fuzzy.direction == 'future') {
    fuzzy.diff = -fuzzy.diff;
  }

  return fuzzy.diff + ' ' + (showshort ? fuzzy.unitShort : fuzzy.unit);
};
Object.defineProperty(Date.prototype, 'timeAgo', { enumerable: false });

Date.prototype.fuzzyTime = function(endtime) {
  var endtime = (endtime ? new Date(endtime) : new Date());

  // Result in a positive value
  var fuzzy = this.fuzzyTimeDiff(endtime);

  fuzzy.diff = Math.ceil(fuzzy.diff);

  return fuzzy;
};
Object.defineProperty(Date.prototype, 'fuzzyTime', { enumerable: false });

// Get a fuzzy time object with the difference between the current Date objects time and now or what you put in the first parameter
// The object will look something like this (always returns a positive value): { diff: 1, unitShort = 'sec', 'unit': 'second' }
Date.prototype.fuzzyTimeDiff = function(compareTime) {
  // 60 = minute
  // 3600 = hour
  // 86400 = day
  // 604800 = week
  // 2592000 = month (30 days)
  // 31536000 = year (365 days)

  var returnObject = { direction: 'future' };

  var compareTime = (compareTime ? new Date(compareTime) : new Date());

  var timediff = Math.floor(this.getTime() - compareTime.getTime());
  if(timediff < 0) {
    timediff = -timediff;
    returnObject.direction = 'past';
  }

  if(timediff >= 31536000000) {
    var years = (timediff / 31536000000);
    returnObject.diff = years;
    returnObject.unit = 'year';

  } else if(timediff >= 2592000000) {
    var months = (timediff / 2592000000);
    returnObject.diff = months;
    returnObject.unit = 'month';

  } else if(timediff >= 604800000) {
    var weeks = (timediff / 604800000);
    returnObject.diff = weeks;
    returnObject.unit = 'week';

  } else if(timediff >= 86400000) {
    var days = (timediff / 86400000);
    returnObject.diff = days;
    returnObject.unit = 'day';
    // returnObject { diff: days+' day'+((days > 1)?'s':'');

  } else if(timediff >= 3600000) {
    var hours = (timediff / 3600000);
    returnObject.diff = hours;
    returnObject.unit = 'hour';

  } else if(timediff >= 60000) {
    var minutes = (timediff / 60000);
    returnObject.diff = minutes;
    returnObject.unit = 'minute';
    returnObject.unitShort = 'min';

  } else if(timediff >= 1000) {
    var seconds = (timediff / 1000);
    returnObject.diff = seconds;
    returnObject.unit = 'second';
    returnObject.unitShort = 'sec';

  } else {
    returnObject.diff = timediff;
    returnObject.unit = 'milliseconds';
    returnObject.unitShort = 'ms';
  }

  if(returnObject.unitShort == null) {
    returnObject.unitShort = returnObject.unit;
  }

  if( (returnObject.diff < 1 || returnObject.diff > 1) && returnObject.unit != 'milliseconds') {
    returnObject.unit += 's';
    returnObject.unitShort += 's';
  }

  return returnObject;
};
Object.defineProperty(Date.prototype, 'fuzzyTimeDiff', { enumerable: false });

Date.prototype.addMilliseconds = function(milliseconds) {
  milliseconds = String(milliseconds).parseTrueInt();
  this.setMilliseconds(this.getMilliseconds() + milliseconds);
  return this;
};
Object.defineProperty(Date.prototype, 'addMilliseconds', { enumerable: false });

Date.prototype.removeMilliseconds = function(milliseconds) {
  milliseconds = String(milliseconds).parseTrueInt();
  this.setMilliseconds(this.getMilliseconds() - milliseconds);
  return this;
};
Object.defineProperty(Date.prototype, 'removeMilliseconds', { enumerable: false });

Date.prototype.addSeconds = function(seconds) {
  seconds = String(seconds).parseTrueInt();
  this.setSeconds(this.getSeconds() + seconds);
  return this;
};
Object.defineProperty(Date.prototype, 'addSeconds', { enumerable: false });

Date.prototype.removeSeconds = function(seconds) {
  seconds = String(seconds).parseTrueInt();
  this.setSeconds(this.getSeconds() - seconds);
  return this;
};
Object.defineProperty(Date.prototype, 'removeSeconds', { enumerable: false });

Date.prototype.addMinutes = function(minutes) {
  minutes = String(minutes).parseTrueInt();
  this.setMinutes(this.getMinutes() + minutes);
  return this;
};
Object.defineProperty(Date.prototype, 'addMinutes', { enumerable: false });

Date.prototype.removeMinutes = function(minutes) {
  minutes = String(minutes).parseTrueInt();
  this.setMinutes(this.getMinutes() - minutes);
  return this;
};
Object.defineProperty(Date.prototype, 'removeMinutes', { enumerable: false });

Date.prototype.addHours = function(hours) {
  hours = String(hours).parseTrueInt();
  this.setHours(this.getHours() + hours);
  return this;
};
Object.defineProperty(Date.prototype, 'addHours', { enumerable: false });

Date.prototype.removeHours = function(hours) {
  hours = String(hours).parseTrueInt();
  this.setHours(this.getHours() - hours);
  return this;
};
Object.defineProperty(Date.prototype, 'removeHours', { enumerable: false });

Date.prototype.addDays = function(days) {
  days = String(days).parseTrueInt();
  this.setDate(this.getDate() + days);
  return this;
};
Object.defineProperty(Date.prototype, 'addDays', { enumerable: false });

Date.prototype.removeDays = function(days) {
  days = String(days).parseTrueInt();
  this.setDate(this.getDate() - days);
  return this;
};
Object.defineProperty(Date.prototype, 'removeDays', { enumerable: false });

Date.prototype.addMonths = function(months) {
  months = String(months).parseTrueInt();
  this.setMonth(this.getMonth() + months);
  return this;
};
Object.defineProperty(Date.prototype, 'addMonths', { enumerable: false });

Date.prototype.removeMonths = function(months) {
  months = String(months).parseTrueInt();
  this.setMonth(this.getMonth() - months);
  return this;
};
Object.defineProperty(Date.prototype, 'removeMonths', { enumerable: false });

Date.prototype.addYears = function(years) {
  years = String(years).parseTrueInt();
  this.setFullYear(this.getFullYear() + years);
  return this;
};
Object.defineProperty(Date.prototype, 'addYears', { enumerable: false });

Date.prototype.removeYears = function(years) {
  years = String(years).parseTrueInt();
  this.setFullYear(this.getFullYear() - years);
  return this;
};
Object.defineProperty(Date.prototype, 'removeYears', { enumerable: false });


/** @example
var curDate = new Date();
var pastDate = new Date().removeDays(2).removeMilliseconds(30);
var futureDate = new Date().addDays(2).addMilliseconds(30);

console.log('curDate:', curDate.toUTCString());
console.log('pastDate:', pastDate.toUTCString());
console.log('futureDate:', futureDate.toUTCString());

console.log('');

console.log('curDate:', curDate.getTime());
console.log('pastDate:', pastDate.getTime());
console.log('futureDate:', futureDate.getTime());

console.log('');

console.log('pastDate is ' + pastDate.timeAgo() + ' ago relative to now'); // Expect + result
console.log('futureDate is ' + futureDate.timeAgo() + ' ago relative to now'); // Expect - result

console.log('');

console.log('pastDate is ' + pastDate.timeAway() + ' away relative to now'); // Expect - result
console.log('futureDate is ' + futureDate.timeAway() + ' away relative to now'); // Expect + result

console.log('');

console.log('curDate is ' + curDate.timeAgo(pastDate) + ' ago relative to pastDate'); // Expect - result
console.log('curDate is ' + curDate.timeAgo(futureDate) + ' ago relative to futureDate'); // Expect + result

console.log('');

console.log('curDate is ' + curDate.timeAway(pastDate) + ' away relative to pastDate'); // Expect + result
console.log('curDate is ' + curDate.timeAway(futureDate) + ' away relative to futureDate'); // Expect - result
*/