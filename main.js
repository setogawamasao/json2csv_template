const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

// for csv file name function
const getNow = () => {
  const dt = new Date();
  const yy = dt.getFullYear();
  const mm = ("00" + (dt.getMonth() + 1)).slice(-2);
  const dd = ("00" + dt.getDate()).slice(-2);
  const hh = ("00" + dt.getHours()).slice(-2);
  const mi = ("00" + dt.getMinutes()).slice(-2);
  const ss = ("00" + dt.getSeconds()).slice(-2);
  var result = yy + mm + dd + hh + mi + ss;
  return result;
};

// read json file
const jsonObject = JSON.parse(fs.readFileSync("./json/sample.json", "utf8"));
const fields = [];
for (key in jsonObject[0]) {
  fields.push(key);
}

// json to csv
const json2csvParser = new Json2csvParser({ fields, header: true });
const csv = json2csvParser.parse(jsonObject);

// write csv
console.log(csv);
fs.writeFile(`./csv/out${getNow()}.csv`, csv, (err) => {
  if (err) console.log(err);
  else console.log("process end");
});
