const express = require("express");
const router = express.Router();
const axios = require('axios');
const db = require("../data/db");
const multer = require("multer");
const upload = multer();
const mailer = require("../mailer");
const crypto = require("crypto");
let verificationCodes = {};

router.get("/departments/:facultyid", async function(req, res) {
    try {
        const facultyid = req.params.facultyid;
        const [departments, ] = await db.execute("select * from departments where facultyid=?", [facultyid]);
        res.json(departments);
    } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).send("Error fetching departments.");
    }
});

router.get("/", async function(req, res) {
    try {
        const [questions, ] = await db.execute("select * from questions");
        const [faculties, ] = await db.execute("select * from faculties");
        const [departments, ] = await db.execute("select * from departments where facultyid=1");

        res.render("index", {
            title: "Survey",
            questions: questions,
            faculties: faculties,
            departments: departments,
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).send("Error fetching questions.");
    }
});

router.post("/send-verification-code", async function(req, res) {
    const { email } = req.body;
    const verificationCode = generateDecimalCode(3,6);
    verificationCodes[email] = verificationCode;

    try {
        await mailer.sendVerificationCode(email, verificationCode);
        res.status(200).send("Verification code sent.");
    } catch (error) {
        console.error("Error sending verification code:", error);
        res.status(500).send("Failed to send verification code.");
    }
});

router.post("/verify-code", async function(req, res) {
    const { email, code } = req.body;
    if (verificationCodes[email] && verificationCodes[email] === code) {
        delete verificationCodes[email];
        res.status(200).send("Verification successful.");
    } else {
        res.status(400).send("Invalid verification code.");
    }
});

router.get("/submit-survey", async function(req,res) {
        res.render("submit-survey");
    });

router.post("/", upload.none(), async function(req, res) {

    const { email, faculty, department, totalScore, negativeEmotionsScore, perceivedBarriersScore, 'g-recaptcha-response': token } = req.body;
    
    const RECAPTCHA_SECRET_KEY = 'your-recaptha-secret-key'; // Google reCAPTCHA secret key

    if (!token) {
        return res.status(400).send("Lütfen CAPTCHA'yı tamamlayın.");
    }
    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
              secret: RECAPTCHA_SECRET_KEY,
              response: token
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });       
          if (response.data.success) {
            res.send('reCAPTCHA doğrulaması başarılı!');
        } else {
            res.send('reCAPTCHA doğrulaması başarısız oldu. Lütfen tekrar deneyin.');
        }        


         // Fetch the faculty name based on the faculty ID
         const [facultyResult] = await db.execute("SELECT facultyname FROM faculties WHERE facultyid=?", [faculty]);
         const facultyName = facultyResult[0].facultyname;
 
         // Fetch the department name based on the department ID
         const [departmentResult] = await db.execute("SELECT departmentname FROM departments WHERE departmentid=?", [department]);
         const departmentName = departmentResult[0].departmentname;

        await db.execute("INSERT INTO students(studentmail, faculty, department, totalscore, negativeEmotionsScore, perceivedBarriersScore) VALUES (?,?,?,?,?,?)",
            [email, facultyName, departmentName, totalScore, negativeEmotionsScore, perceivedBarriersScore]);

        res.render("submit-survey");

    } catch (error) {
        console.error(error);
    }
});

function generateDecimalCode(byteLength, codeLength) {
    // Rastgele bayt oluştur
    const randomBytes = crypto.randomBytes(byteLength);
  
    // Rastgele baytları ondalık (10'luk sistemde) bir sayıya çevir
    const decimalCode = parseInt(randomBytes.toString('hex'), 16).toString(10);
  
    // İlk codeLength kadar karakteri al
    return decimalCode.substring(0, codeLength);
  }

module.exports = router;
