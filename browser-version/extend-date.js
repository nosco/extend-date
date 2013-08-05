String.prototype.parseTrueInt = function() {
  var number = parseInt(String(this));
  return (isNaN(number) ? 0 : number);
};

// Show a fuzzy timestamp between the current Date objects time and now or what you put in the first parameter
Date.prototype.timeAgo = function(endtime, showshort) {
  // 60 = minute
  // 3600 = hour
  // 86400 = day
  // 604800 = week
  // 2592000 = month (30 days)
  // 31536000 = year (365 days)

  var endtime = (endtime ? new Date(endtime) : new Date());
  var showshort = showshort || false;

  var timediff = Math.floor((endtime.getTime()) - (this.getTime()));

  if(timediff < 1) return "0"+((showshort)?" secs":" seconds");

  if(timediff >= 31536000000) {
    var years = Math.floor(timediff / 31536000000);
    return years+" year"+((years > 1)?"s":"");

  } else if(timediff >= 2592000000) {
    var months = Math.floor(timediff / 2592000000);
    return months+" month"+((months > 1)?"s":"");

  } else if(timediff >= 604800000) {
    var weeks = Math.floor(timediff / 604800000);
    return weeks+" week"+((weeks > 1)?"s":"");

  } else if(timediff >= 86400000) {
    var days = Math.floor(timediff / 86400000);
    return days+" day"+((days > 1)?"s":"");

  } else if(timediff >= 3600000) {
    var hours = Math.floor(timediff / 3600000);
    return hours+" hour"+((hours > 1)?"s":"");

  } else if(timediff >= 60000) {
    var minutes = Math.floor(timediff / 60000);
    return minutes+((showshort)?" min":" minute")+((minutes > 1)?"s":"");

  } else if(timediff >= 1000) {
    var seconds = Math.floor(timediff / 1000);
    return seconds+((showshort)?" sec":" second")+((seconds > 1)?"s":"");

  } else {
    return timediff+((showshort)?" ms":" millisecond")+((timediff > 1)?"s":"");
  }
};

Date.prototype.addMilliseconds = function(milliseconds) {
  milliseconds = String(milliseconds).parseTrueInt();
  this.setMilliseconds(this.getMilliseconds() + milliseconds);
};

Date.prototype.removeMilliseconds = function(milliseconds) {
  milliseconds = String(milliseconds).parseTrueInt();
  this.setMilliseconds(this.getMilliseconds() - milliseconds);
};

Date.prototype.addSeconds = function(seconds) {
  seconds = String(seconds).parseTrueInt();
  this.setSeconds(this.getSeconds() + seconds);
};

Date.prototype.removeSeconds = function(seconds) {
  seconds = String(seconds).parseTrueInt();
  this.setSeconds(this.getSeconds() - seconds);
};

Date.prototype.addMinutes = function(minutes) {
  minutes = String(minutes).parseTrueInt();
  this.setMinutes(this.getMinutes() + minutes);
};

Date.prototype.removeMinutes = function(minutes) {
  minutes = String(minutes).parseTrueInt();
  this.setMinutes(this.getMinutes() - minutes);
};

Date.prototype.addHours = function(hours) {
  hours = String(hours).parseTrueInt();
  this.setHours(this.getHours() + hours);
};

Date.prototype.removeHours = function(hours) {
  hours = String(hours).parseTrueInt();
  this.setHours(this.getHours() - hours);
};

Date.prototype.addDays = function(days) {
  days = String(days).parseTrueInt();
  this.setDate(this.getDate() + days);
};

Date.prototype.removeDays = function(days) {
  days = String(days).parseTrueInt();
  this.setDate(this.getDate() - days);
};

Date.prototype.addMonths = function(months) {
  months = String(months).parseTrueInt();
  this.setMonth(this.getMonth() + months);
};

Date.prototype.removeMonths = function(months) {
  months = String(months).parseTrueInt();
  this.setMonth(this.getMonth() - months);
};

Date.prototype.addYears = function(years) {
  years = String(years).parseTrueInt();
  this.setFullYear(this.getFullYear() + years);
};

Date.prototype.removeYears = function(years) {
  years = String(years).parseTrueInt();
  this.setFullYear(this.getFullYear() - years);
};
