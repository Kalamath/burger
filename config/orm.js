// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  selectAll: function(table, cb) {
    var queryString = "SELECT * FROM " + table;
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      // console.log(result);
      cb(result);
    });
  },
  insertOne: function(table, column, value, cb) {
    var queryString = 'INSERT INTO ' + table + ' (' + column + ') VALUES ("' + value + '");'

    console.log(queryString);
    connection.query(queryString, value, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateOne: function(table, updateColVal, condition, cb) {
    var queryString = "UPDATE " + table + " SET " + objToSql(updateColVal) + " WHERE " + condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

// Export the orm object for the model (cat.js).
module.exports = orm;
