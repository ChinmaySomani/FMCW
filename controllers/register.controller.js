const e = require('express');
const { getGoogleUserInfo } = require('../middleware/goath');
var models = require('../models');
const { genrefcodeca, genrefcodepa } = require('../services/generaterefcode');
var exports = module.exports = {}

exports.registerca = async function(req, res){
    var token = req.body.token;
    var ca = {};
    ca.name = req.body.name;
    ca.number = req.body.number;
    ca.organization = req.body.organization;
    ca.year = req.body.year;
    await getGoogleUserInfo(token).then((result)=>{
        ca.email = result;
    });

    ca.ref_code = await genrefcodeca();
    console.log(ca.ref_code);

    models.user.update({type: "CA"}, {where: {email: ca.email}})
    .then((result)=>{
        console.log("user updated");
    }).catch((error)=>{
        console.log(error);
    });

    models.ca.create(ca).then((result)=>{
        console.log(result);
        res.json({"message": "success"});
    }).catch((error)=>{
        res.send(error);
    });
};

exports.registerpa = async function(req, res){
    var token = req.body.token;
    var pa = {};
    // pa = req.body;
    pa.name = req.body.name;
    pa.number = req.body.number;
    pa.organization = req.body.organization;
    pa.year = req.body.year;
    pa.redeem = req.body.redeem;
    pa.codecheck = 0;
    
    await getGoogleUserInfo(token).then((result)=>{
        pa.email = result;
    });

    await models.user.update({type: "PA"}, {where: {email: pa.email}})
    .then((result)=>{
        console.log("user updated");
    }).catch((error)=>{
        console.log(error);
    });

    if(pa.redeem && pa.redeem.substring(0,2)==="CA"){
        console.log('ca');
        await models.ca.findOne({where: {ref_code : pa.redeem}})
        .then(async (foundItem)=>{
            if(!foundItem){
            res.json({"error": "InvalidCode"});
            }
            pa.codecheck = 1;
            console.log(pa.codecheck);
            var norefcode = foundItem.norefcode;
            console.log(norefcode);
            // await models.ca.update({norefcode: Number(norefcode)+1}, {where : {ref_code: foundItem.ref_code}})
            // .then((result)=>{
            //     console.log("ca updated");
            // }).catch((error)=>{
            //     console.log(error);
            // });
        }).catch((error)=>{
            res.send(error);
        });
    }

    else if(pa.redeem && pa.redeem.substring(0,2)==="IN"){
        console.log('in');
        await models.ins.findOne({where: {ref_code : pa.redeem}})
        .then(async (foundItem)=>{
            if(!foundItem){
            res.json({"error": "InvalidCode"});
            }
            pa.codecheck = 1;
            console.log(pa.codecheck);
            var norefcode = foundItem.norefcode;
            console.log(norefcode);
            // await models.ca.update({norefcode: Number(norefcode)+1}, {where : {ref_code: foundItem.ref_code}})
            // .then((result)=>{
            //     console.log("ca updated");
            // }).catch((error)=>{
            //     console.log(error);
            // });
        }).catch((error)=>{
            res.send(error);
        });
    }

    else if(pa.redeem && pa.redeem.substring(0,2)==="PA"){
        console.log('pa');
        await models.pa.findOne({where: {ref_code : pa.redeem}})
        .then(async (foundItem)=>{
            if(!foundItem){
            res.json({"error": "InvalidCode"});
            }
            pa.codecheck = 1;
            console.log(pa.codecheck);
            var norefcode = foundItem.norefcode;
            console.log(norefcode);
            // await models.pa.update({norefcode: Number(norefcode)+1}, {where : {ref_code: foundItem.ref_code}})
            // .then((result)=>{
                // console.log("pa updated");
            // }).catch((error)=>{
                // console.log(error);
            // });
        }).catch((error)=>{
            res.send(error);
        });
    };

    await models.pa.create(pa).then((result)=>{
        console.log(result);
        res.json({"message": "success"});
    }).catch((error)=>{
        res.send(error);
    });
};


exports.details = async function(req, res){
    var token = req.body.token;
    var dashuser = {};
    var type;
    
    await getGoogleUserInfo(token).then((result)=>{
        console.log(result);
        if(result === "notoken"){
            res.json({"message": message});
        };
        dashuser.email = result;
    }).catch((error)=>{
        console.log(error);
        res.json({"message": "no token"});
    });

    await models.user.findOne({where: {email: dashuser.email}})
    .then((result)=>{
        type = result.type;
        dashuser.type = type;
    }).catch((error)=>{
        console.log(error);
        res.send(error);
    });

    if(type === "PA"){
    await models.pa.findOne({where: {email: dashuser.email}})
    .then((result)=>{
        if(result){
            if(result.paid === "Credit"){
        dashuser.pass = result.pass;
        dashuser.add = result.add;
    }
    else {
        dashuser.pass = '';
        dashuser.add = '';
    }
        dashuser.ref_code = result.ref_code;
        dashuser.norefcode = result.norefcode;
        dashuser.name = result.name;
        dashuser.number = result.number;
        dashuser.organization = result.organization;
        dashuser.year = result.year;
        res.json(dashuser);
    };
}).catch((error)=>{
    console.log(error);
});
}
else if(type === "CA"){
    await models.ca.findOne({where: {email: dashuser.email}})
    .then((result)=>{
        if(result){
        dashuser.ref_code = result.ref_code;
        dashuser.norefcode = result.norefcode;
        dashuser.name = result.name;
        dashuser.number = result.number;
        dashuser.organization = result.organization;
        dashuser.year = result.year;
        res.json(dashuser);
    };
}).catch((error)=>{
    console.log(error);
}); 
}
else if(type === "IN"){
    await models.ins.findOne({where: {email: dashuser.email}})
    .then((result)=>{
        if(result){
        dashuser.ref_code = result.ref_code;
        dashuser.norefcode = result.norefcode;
        dashuser.name = result.name;
        res.json(dashuser);
    };
}).catch((error)=>{
    console.log(error);
});
};
};