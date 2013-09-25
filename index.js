require('extend-string');

// Show a fuzzy timestamp between the current Date objects time and now or what you put in the first parameter
Date.prototype.timeToGo = function(endtime, showshort) {
  var showshort = showshort || false;

  // Result in a positive value
  var fuzzy = this.fuzzyTime(endtime);

  if(fuzzy.direction == 'past') {
    fuzzy.diff = -fuzzy.diff;
  }

  return fuzzy.diff + ' ' + (showshort ? fuzzy.unitShort : fuzzy.unit);
};

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

Date.prototype.fuzzyTime = function(endtime) {
  var endtime = (endtime ? new Date(endtime) : new Date());

  // Result in a positive value
  var fuzzy = this.fuzzyTimeDiff(endtime);

  fuzzy.diff = Math.ceil(fuzzy.diff);

  return fuzzy;
};

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

  var timediff = Math.floor((compareTime.getTime()) - (this.getTime()));
  if(timediff < 0) {
    timediff = Math.floor((this.getTime()) - (compareTime.getTime()));
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
    returnObject.unit = 'ms';
    returnObject.unitShort = 'ms';
  }

  if(returnObject.unitShort == null) {
    returnObject.unitShort = returnObject.unit;
  }

  if(returnObject.diff != 1 && returnObject.unit != 'ms') {
    returnObject.unit += 's';
    returnObject.unitShort += 's';
  }

  return returnObject;
};

Date.prototype.addMilliseconds = function(milliseconds) {
  milliseconds = String(milliseconds).parseTrueInt();
  this.setMilliseconds(this.getMilliseconds() + milliseconds);
  return this;
};

Date.prototype.removeMilliseconds = function(milliseconds) {
  milliseconds = String(milliseconds).parseTrueInt();
  this.setMilliseconds(this.getMilliseconds() - milliseconds);
  return this;
};

Date.prototype.addSeconds = function(seconds) {
  seconds = String(seconds).parseTrueInt();
  this.setSeconds(this.getSeconds() + seconds);
  return this;
};

Date.prototype.removeSeconds = function(seconds) {
  seconds = String(seconds).parseTrueInt();
  this.setSeconds(this.getSeconds() - seconds);
  return this;
};

Date.prototype.addMinutes = function(minutes) {
  minutes = String(minutes).parseTrueInt();
  this.setMinutes(this.getMinutes() + minutes);
  return this;
};

Date.prototype.removeMinutes = function(minutes) {
  minutes = String(minutes).parseTrueInt();
  this.setMinutes(this.getMinutes() - minutes);
  return this;
};

Date.prototype.addHours = function(hours) {
  hours = String(hours).parseTrueInt();
  this.setHours(this.getHours() + hours);
  return this;
};

Date.prototype.removeHours = function(hours) {
  hours = String(hours).parseTrueInt();
  this.setHours(this.getHours() - hours);
  return this;
};

Date.prototype.addDays = function(days) {
  days = String(days).parseTrueInt();
  this.setDate(this.getDate() + days);
  return this;
};

Date.prototype.removeDays = function(days) {
  days = String(days).parseTrueInt();
  this.setDate(this.getDate() - days);
  return this;
};

Date.prototype.addMonths = function(months) {
  months = String(months).parseTrueInt();
  this.setMonth(this.getMonth() + months);
  return this;
};

Date.prototype.removeMonths = function(months) {
  months = String(months).parseTrueInt();
  this.setMonth(this.getMonth() - months);
  return this;
};

Date.prototype.addYears = function(years) {
  years = String(years).parseTrueInt();
  this.setFullYear(this.getFullYear() + years);
  return this;
};

Date.prototype.removeYears = function(years) {
  years = String(years).parseTrueInt();
  this.setFullYear(this.getFullYear() - years);
  return this;
};


/** @example
var curDate = new Date();
var pastDate = new Date().removeDays(2).removeMilliseconds(30);
var futureDate = new Date().addDays(2).addMilliseconds(30);

console.log(curDate.toUTCString());
console.log(pastDate.toUTCString());
console.log(futureDate.toUTCString());

console.log(curDate.getTime());
console.log(pastDate.getTime());
console.log(futureDate.getTime());

console.log('ago:', curDate.timeAgo(pastDate));
console.log('ago:', curDate.timeAgo(futureDate));

console.log('to go:', curDate.timeToGo(pastDate));
console.log('to go:', curDate.timeToGo(futureDate));
*/