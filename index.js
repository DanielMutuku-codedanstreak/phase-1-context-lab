/* Your Code Here */
function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
}
  
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(function (array) {
        return createEmployeeRecord(...array);
    });
}
  
function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
}
  
function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });
    return this;
}
  
function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);

    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100; // Assuming hour is in cents
    }

    return 0;
}
  
function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
}
  
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
}
  
function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function (totalPayroll, employee) {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
}
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// Custom test scenario
const employee = createEmployeeRecord("Gray", "Worm", "Security", 1);
const employees = createEmployeeRecords([
   ["Gray", "Worm", "Security", 1],
   ["Bob", "Johnson", "Manager", 30],
]);

createTimeInEvent.call(employee, "2023-10-01 0800");
createTimeOutEvent.call(employee, "2023-10-01 1700");

console.log(hoursWorkedOnDate.call(employee, "2023-10-01")); // Output: 9
console.log(wagesEarnedOnDate.call(employee, "2023-10-01")); // Output: 180
console.log(allWagesFor.call(employee));

const foundEmployee = findEmployeeByFirstName(employees, "Gray");
console.log(foundEmployee);

const payroll = calculatePayroll(employees);
console.log(payroll); // Output: Total payroll for all employees
