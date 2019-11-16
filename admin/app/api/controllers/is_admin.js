const adminModel = require('../models/is_admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'chukwuma',
    api_key: '182225648222874',
    api_secret: 'vY9VPdqh8g_mxwO6MkjXftuhnF0'
});
require("dotenv").config();

const saveImage = (imageFile, staff_id, key) => {
    console.log("this is my image", imageFile)
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imageFile, function (err, result) {
            console.log("from here", result, err);
            if (err) return err;
            adminModel.findByIdAndUpdate(staff_id, { [key]: result.secure_url }, (err, result) => {
                // console.log("Result()=>", result)
                if (err) return reject(err);
                resolve({ status: "Success", message: `News successfully got ${result.secure_url}`, data: result })
            })
        });

    })
}

module.exports = {
    create: async (req, res, next) => {
        let { fullname, email, state, dob } = req.body;
        let data = await adminModel.find({})
        let isEmail = data.some(o => o.email === email);
        // console.log(fullname, email, state, dob)
        if (fullname === undefined || state === undefined || email === undefined || dob === undefined) {
            return res.json({ status: "error", message: "Missen Feild, please check and try again." });
        } else if (isEmail) {
            res.json({ status: "error", message: `This email ${email} already exist, please check and try again.` });
        } else {
            adminModel.create({ fullname, email, state, dob }, async (err, result) => {
                // return console.log(result, err)
                if (err) return next(err);
                let { image } = req.body;

                if (image) {
                    try {
                        await saveImage(image, result._id, "staff_dp");
                    } catch (error) {
                        console.log(error);
                    }
                }
                res.json({
                    status: "Success",
                    statuscode: 200,
                    message: "News successfully created!!!",
                    data: result
                });
            });
        }

    },
    authenticate: async (req, res) => {
        let { email } = req.body;
        let isEmail = await adminModel.findOne({ email });
        console.log(isEmail)
        if (!isEmail) {
            return res.json({ status: "info", statuscode: 200, message: "This email doesn't exist", data: null })
        } else {
            return res.json({ status: "success", statuscode: 200, message: "Staff successfully found", data: isEmail })
        }
    },
    updateById: async (req, res, next) => {
        console.log(req.body);
        let { fullname, email, state, dob } = req.body;
        await adminModel.findByIdAndUpdate(req.params.adminId, {
            fullname, email, state, dob
        }, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Staff record updated successfully", data: result })
        })
    },
    deleteById: (req, res, next) => {
        console.log(req.body);
        adminModel.findByIdAndDelete(req.params.adminId, (err, result) => {
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Admin has been successfully deleted", data: result })
        })
    },
    getById: async (req, res, next) => {
        await adminModel.findById(req.params.adminId, (err, result) => {
            console.log("One admin ()=>", result)
            if (err) throw err
            else res.json({ status: "Success", statuscode: 200, message: "Admin successfully found!", data: result });
        })
    },
    getAll: (req, res, next) => {
        // console.log(req.body);
        const adminList = [];
        adminModel.find({}, (err, result) => {
            // console.log(result)
            if (err) throw err
            else
                for (let admins of result) {
                    adminList.push({
                        id: admins._id,
                        firstname: admins.firstname, othernames: admins.othernames,
                        email: admins.email, phone: admins.phone, admin_dp: admins.admin_dp, date_created: admins.date_created
                    })
                }
            res.json({ status: "Success", statuscode: 200, message: "All Admins found", data: result.reverse() })
        })
    },
    createImage: async (req, res, next) => {
        try {
            let imageFile = req.body.image;
            let staffid = req.body.image
            let response = await saveImage(imageFile, staffid, "staff_dp");
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }
}

