const nodemailer = require('nodemailer');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const UserActivity = require('../models/UserActivity');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { signin } = require('mern-mvc-gen')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const AuthController = {
    signup: async (req, res) => {
        try {
            const {
                indexNo,
                username,
                email,
                password
            } = req.body

            if (!validator.isEmail(email)) {
                return res.json({ error: "Invalid email format" });
            }

            if (password.length < 6) {
                return res.json({ Error: "Password must be at least 6 characters" });
            }

            const checkuser = await User.findOne({
                $or: [
                    { indexNo: indexNo },
                    { username: username },
                    { email: email },
                ]
            })

            if (checkuser) {
                return res.json({ Error: "User Already Exists" })
            }

            const hashpass = await bcrypt.hash(password, 10)

            const newuser = new User({
                indexNo: indexNo,
                username: username,
                email: email,
                password: hashpass
            })
            const resultnewuser = await newuser.save()

            if (resultnewuser) {
                const newAct = new UserActivity({
                    email: email,
                    activity: "Student Registation"
                })
                const newActResult = await newAct.save()

                return res.json({ Status: "Success" })
            }
            else {
                return res.json({ Error: "Internal Server Error white creating New user" })
            }

        }
        catch (err) {
            console.log(err)
        }
    },

    signin: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body

            const checkuser = await User.findOne({ email: email })

            if (!checkuser) {
                return res.json({ Error: 'User not Exists' })
            }

            const checkpass = await bcrypt.compare(password, checkuser.password)

            if (!checkpass) {
                return res.json({ Error: "Password Not Match" })
            }

            if (checkuser.isActive === false) {
                return res.json({ Error: "Your Account is Deactive..." })
            }

            const newAct = new UserActivity({
                email: email,
                activity: "User Login"
            })

            const reusltnewAct = await newAct.save()

            if (reusltnewAct) {
                const token = jwt.sign({ id: checkuser._id, role: checkuser.role, user: checkuser }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({ Status: "Success", Result: checkuser, Token: token })
            }
            else {
                return res.json({ Error: "Internal Server Error" })
            }

        }
        catch (err) {
            console.log(err)
        }
    },

    updatepassviadash: async (req, res) => {
        try {
            const token = req.header('Authorization');
            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            req.user = decoded;
            const email = req.user.user.email;

            const checkuser = await User.findOne({ email: email })

            if(!checkuser){
                return res.json({ Error: "User Not Found..."})
            }

            const {
                oldPass,
                newpass,
            } = req.body

            if (newpass.length < 6) {
                return res.json({ Error: "Password must be at least 6 characters" });
            }
            
            if(oldPass === newpass){
                return res.json({ Error: 'Passwords are same...'})
            }


            const isMatch = await bcrypt.compare(oldPass, checkuser.password);
            if (!isMatch) {
                return res.json({ Error: "Old password is incorrect" });
            }      

            const hashnewpass = await bcrypt.hash(newpass, 10);
            checkuser.password = hashnewpass;
            const resultsave = await checkuser.save();

            if(resultsave){
                return res.json({ Status: "Success"})
            }
            else{
                return res.json({ Error: 'Internal Server Error While Updating password'})
            }            

        }
        catch (err) {
            console.log(err)
        }
    }
};

module.exports = AuthController;