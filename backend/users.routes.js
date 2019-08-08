var Users = require('./users.controller');

module.exports = function(router) {
    router.post('/create', Users.createUser);
    router.get('/get', Users.getUsers);
    // router.get('/get/:name', Users.getHero);
    router.put('/update/:id', Users.updateUser);
    router.delete('/remove/:id', Users.removeUser);
}