var Users = require('./users.dao');

exports.createUser = function (req, res, next) {
    var user = {
        name: req.body.name,
        dob: req.body.dob,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        mobile: req.body.mobile,
        email: req.body.email,
    };

    Users.create(user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User created successfully"
        })
    })
}

exports.getUsers = function(req, res, next) {
    Users.get({}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
    })
}

// exports.getHero = function(req, res, next) {
//     Heros.get({name: req.params.name}, function(err, heros) {
//         if(err) {
//             res.json({
//                 error: err
//             })
//         }
//         res.json({
//             heros: heros
//         })
//     })
// }

exports.updateUser = function(req, res, next) {
    var user = {
        name: req.body.name,
        dob: req.body.dob,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        mobile: req.body.mobile,
        email: req.body.email,
    };
    Users.update({_id: req.params.id}, user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User updated successfully"
        })
    })
}

exports.removeUser = function(req, res, next) {
    Users.delete({_id: req.params.id}, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User deleted successfully"
        })
    })
}
