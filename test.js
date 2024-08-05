const bcrypt = require("bcrypt");
// const saltRounds = 10;

// const hasshedPassword =

async function hasshedPassword(password) {
  try {
    //define the nuber of salt rounds for hashing
    const saltRounds = 10;

    //hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // log the hashed password
    console.log("ashed password:", hashedPassword);
  } catch (error) {
    console.error("error hashing password:", error);
  }
}

hasshedPassword("soone2marry");
