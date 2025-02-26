require("dotenv").config();
const bcrypt = require("bcryptjs");

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log("Hashed Password:", hashedPassword);
};

hashPassword("12345");
