var nodemailer = require('nodemailer');

function sendmail(unm,pass,cb)
{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phpbatch34@gmail.com',
    pass: '123@@123'
  }
});

var myurl="http://localhost:3000/loginauthentication/?myid="+unm
var mailOptions = {
  from: 'phpbatch34@gmail.com',
  to: unm,
  subject: 'Confirmation mail for registration!!!',
  html: "<h1>Welcome User To Usell.com</h1><br><br><h2>Username : "+unm+"</h2><br><h2>Password : "+pass+"</h2><br><br><h1>Click here to verify your Account....</h1><br><br>http://localhost:3000/api/user/loginauthentication/"+unm
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    cb(false);
  } else {
    cb(true);
  }
});
}

function forgetpass(unm,passw,cb)
{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phpbatch34@gmail.com',
    pass: '123@@123'
  }
});

var mailOptions = {
  from: 'phpbatch34@gmail.com',
  to: unm,
  subject: 'Forget Password?',
  html: "<h1>Welcome User To PostKrde.com</h1><br><br><h2>Username : "+unm+"</h2><br><h2>Password : "+passw+"</h2><br><br><h1>Click here to login....</h1><br><br>http://localhost:3000/login"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    cb(false);
  } else {
    cb(true);
  }
});
}

module.exports={sendmail:sendmail,forgetpass:forgetpass}
