import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your url",
      name: "url",
    },
  ])
  .then((answers) => {
    console.log(answers);
    var qr_svg = qr.image(answers.url, { size: 10 });
    qr_svg.pipe(fs.createWriteStream("qr_image.png"));
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
