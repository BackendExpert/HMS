const Reallocations = require("../models/Reallocations");
const Student = require("../models/Student");
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const ReallocationsController = {
    createReAllocation: async (req, res) => {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ Error: "No token provided" });
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        const email = decoded?.user?.email;

        try {
            const {
                currenthostal,
                currentroom,
                requesthostel,
                requestroom,
                reson,
            } = req.body

            const checkstd = await Student.findOne({ email: email })

            const checkreqeust = await Reallocations.findOne({ studentId: checkstd._id })

            if (checkreqeust) {
                return res.json({ Error: "You Already Reqeust Reallocation" })
            }

            const newReallocation = new Reallocations({
                studentId: checkstd._id,
                currentRoom: currentroom,
                currentHostel: currenthostal,
                reqeusthostl: requesthostel,
                reqeustroom: requestroom,
                reson: reson
            })

            const resultnewReallocation = await newReallocation.save()

            if (resultnewReallocation) {
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Realloction Request',
                    text: `Dear ${checkstd.title} ${checkstd.firstName} ${checkstd.surname},

                            We would like to inform you that your reallocation request has been successfully submitted to the University of Peradeniya system.

                            Your request is currently pending and will be reviewed by the administrative team shortly. You will be notified once a decision has been made or further action is required.

                            If you have any questions or need further assistance, please do not hesitate to contact the ICT Services Division.


                            Best regards,  
                            University of Peradeniya  
                            Hostel Management System`
                };

                const mailsent = await transporter.sendMail(mailOptions);

                if (mailsent) {
                    return res.json({ Status: "Success", Message: "Reallocation Request has been Created" })
                }
            }
            else {
                return res.json({ Error: "Internal Server Error while creating Reallocation" })
            }
        }
        catch (err) {
            console.log(err)
        }
    },

    getallreqeusts: async (req, res) => {
        try {
            const allreqeust = await Reallocations.find()

            return res.json({ Result: allreqeust })
        }
        catch (err) {
            console.log(err)
        }
    },

    getmyreqeusts: async (req, res) => {
        try {
            const token = req.header('Authorization');
            if (!token) {
                return res.status(401).json({ Error: "No token provided" });
            }

            const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
            const email = decoded?.user?.email;

            const checkstd = await Student.findOne({ email: email })

            const getmyreqsults = await Reallocations.find({ studentId: checkstd._id })

            return res.json({ Result: getmyreqsults })
        }
        catch (err) {
            console.log(err)
        }
    },

    getReqeustOne: async (req, res) => {
        try {
            const id = req.params.id

            const requestget = await Reallocations.findById(id)
                .populate('studentId')
                .populate('currentRoom')
                .populate('currentHostel')
                .populate('reqeusthostl')
                .populate('reqeustroom');

            if(requestget){
                return res.json({ Result: requestget })
            }
            else{
                return res.json({ Error: "No Request Found"})
            }            
        }
        catch (err) {
            console.log(err)
        }
    }


};

module.exports = ReallocationsController;