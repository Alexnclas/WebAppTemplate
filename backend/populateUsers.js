const mongoose = require("mongoose");
const User = require("./src/models/User");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const connectDB = require("./src/config/db");

const filename = "testUsers.json";
const testFileDirectory = "testAssets";

connectDB();

async function main() {
    try {
        console.log("Populating user database for test purposes")
        const filePath = path.join(__dirname, testFileDirectory, filename);

        const data = fs.readFileSync(filePath, "utf8");
        const users = JSON.parse(data)["users"];

        await User.deleteMany({});

        console.log(users);

        const usersHashedPassword = await Promise.all(
            users.map(async (u) => ({
                ...u,
                password: await bcrypt.hash(u.password, 10),
            }))
        );

        await User.insertMany(usersHashedPassword);
        console.log(`${users.length} users inserted`);
    }
    catch (err){
    console.error("Error populating users:", err);
    }
    finally {
        mongoose.disconnect();
        console.log('All users created!');
    }
}

main();