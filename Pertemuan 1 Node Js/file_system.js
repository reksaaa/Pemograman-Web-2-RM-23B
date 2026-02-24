const fs = require("fs");

fs.writeFile("contoh.txt", "Hello, World!", (err) => {
  if (err) throw err;
  console.log("File berhasil dibuat!");
});

fs.readFile("./contoh.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
