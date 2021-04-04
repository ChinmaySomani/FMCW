var models = require('../models');
var excel = require('exceljs');
var exports = module.exports = {}

exports.alluser = function(req, res){
    models.user.findAll()
    .then(result => {
        res.send(result);
    }).catch(error => {
        console.log(error);
    });
};

exports.getdownload = function(req, res){
  var html = '<html><body><center><form method="POST" action="/download/pa"><label for="user">User</label><input type="text" id="user" name="user"><br><label for="pass">Pass</label><br><input type="text" id="pass" name="pass"><input type="submit"></form></center></body></html>'
  // var html = '<html><body><center><form method="POST" action="/download/pa"></form></center><script type="text/javascript">document.f1.submit()</script></body></html>'
  res.writeHead(200,{'Content-Type' : 'text/html'});
  res.write(html);
  res.end();
};

exports.downloadpa = function(req, res){
 
  if(req.body.user === "fmcweekend" && req.body.pass === "$2y$12$UFFwOH5B5jklKf4y0zPAleA36kaMxEDxIb7Mq2Nbg0Xquc3ORIsm6"){
 models.pa.findAll().then((objs) => {
   let users = [];
 
   objs.forEach((isser) => {
     users.push(isser);});
     //   {name : isser.name,
     //   email: isser.email,
     //   rollno:isser.rollno,
     //   year : isser.year,
     //   address1 : isser.address1,
     //   address2 : isser.address2,
     //   state :isser.state,
     //   city : isser.city,
     //   district : isser.district,
     //   pincode : isser.pincode,
     //   phone : isser.phone,
     //   tshirt : isser.tshirt,
     //   size : isser.size,
     //   quantity : isser.quantity,
     //   amount: isser.amount,
     //   receipt: isser.receipt,
     //   image : isser.image
     // });
   // );
 
   let workbook = new excel.Workbook();
   let worksheet = workbook.addWorksheet("Participants");
 
   worksheet.columns = [
     { header: "Id", key: "id", width: 5 },
     { header: "name", key: "name", width: 10 },
     { header: "email", key: "email", width: 5 },
     { header: "organization", key: "organization", width: 5 },
     { header: "number", key: "number", width: 5 },
     { header: "refcode", key: "ref_code", width: 5 },
     { header: "referrals", key: "norefcode", width: 5 },
     { header: "redeem", key: "redeem", width: 5 },
     { header: "pass", key: "pass", width: 5 },
     { header: "add", key: "add", width: 5 },
     { header: "paid", key: "paid", width: 25 },
     { header: "amount", key: "amount", width: 25 },
     { header: "payment_id", key: "payment_id", width: 10 },
   ];
 
   // Add Array Rows
   worksheet.addRows(users);
 
   res.setHeader(
     "Content-Type",
     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
   );
   res.setHeader(
     "Content-Disposition",
     "attachment; filename=" + "participants.xlsx"
   );
 
   return workbook.xlsx.write(res).then(function () {
     res.status(200).end();
   });
 });
}
else {
  res.send("error");
};
};

// exports.getuser =
// exports.verti = async function(req, res){
//     await models.user.destroy({where: {email: 'angrycder@gmail.com'}})
//     await models.pa.destroy({where: {email: 'angrycder@gmail.com'}})
//     res.send("success");
//     // await models.user.destroy({where: {email: 'ksnabielmartin.mec18@itbhu.ac.in'}})
// }