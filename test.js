require('./index');

var startTime = new Date();
var endTime = new Date();

startTime.removeMilliseconds(2);
endTime.addMilliseconds(1);
console.log(startTime.timeAgo(endTime));

startTime.removeSeconds(2);
endTime.addSeconds(1);
console.log(startTime.timeAgo(endTime));

startTime.removeMinutes(2);
endTime.addMinutes(1);
console.log(startTime.timeAgo(endTime));

startTime.removeHours(2);
endTime.addHours(1);
console.log(startTime.timeAgo(endTime));

startTime.removeDays(2);
endTime.addDays(1);
console.log(startTime.timeAgo(endTime));

startTime.removeMonths(2);
endTime.addMonths(1);
console.log(startTime.timeAgo(endTime));

startTime.removeYears(2);
endTime.addYears(1);
console.log(startTime.timeAgo(endTime));

