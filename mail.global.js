const nodemailer = require('nodemailer');
async function sendMail() {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        sendMail: true,
        name: 'ethereal.email',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'elscriptsandbox@gmail.com',
            pass: 'cgnzhrmoreqtzkmf'
        },
        from: 'elscriptsandbox@gmail.com'
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'elscriptsandbox@gmail.com', // sender address
        to: 'gauravnepal3@gmail.com', // list of receivers
        subject: "Message from contact form", // Subject line
        text: `Message From: ${req.body.name}, Email: ${req.body.email} , Message: ${req.body.message} `,
        // HTML response
        html: `<h2>Message from Contact Form</h2><br/>
      <p><b>Name:</b>${req.body.name}</p></br>
      <p><b>Email:</b>${req.body.email}</p></br>
      <p><b>Phone:</b>${req.body.phone}</p></br>
      <b>Message:</b><br/><p>${req.body.message}</p>`, // html body
    });
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).json({ 'message': "Email send successfully" })
}
sendMail().catch(console.error);
var utc = new Date().toJSON().slice(0, 10);
const insertQuery = `INSERT into students_db (name,date,phone,status,remark) VALUES ('${req.body.name}','${utc}','${req.body.phone}','pending','')`
db.query(insertQuery, (err, result) => {
    if (err) {
        console.log(err)
    }
})