const User = require("../models/user-models");
const bcrypt = require("bcrypt");


const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to Soham Code Hub - router page");
    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {
        const { userName, email, password, phone } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist) {
            return res.status(400).json({ msg: "email already exist" });
        }

        const userCreated = await User.create({ userName, email, phone, password });
        res.status(201).json({ msg: userCreated })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if(!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const user = await bcrypt.compare(password, userExist.password);

        if(user) {
            res.status(200).json({
                msg: "Login Successful",
                userId: userExist._id.toString()
            })
        } else {
            res.status(401).json({ message: "Invalid email or password "});
        }

    } catch (error) {
        console.log(error);
    }
}

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const userExist = await User.findOne({ email });

//         if (!userExist) {
//             return res.status(400).json({ msg: "Invalid Credentials" });
//         }

//         console.log("User Exists:", userExist);
//         console.log("Entered Password:", password);
//         console.log("Stored Hashed Password:", userExist.password);

//         const isMatch = await bcrypt.compare(password, userExist.password);

//         console.log("Password Match:", isMatch);

//         if (isMatch) {
//             return res.status(200).json({
//                 msg: "Login Successful",
//                 userId: userExist._id.toString()
//             });
//         } else {
//             return res.status(401).json({ message: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

module.exports = { home, register, login }