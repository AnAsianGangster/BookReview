const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function (router) {
    // middleware
    router.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });

    // sign up
    router.post(
        '/auth/signup',
        [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
        controller.signup
    );

    // sign in
    router.post('/auth/signin', controller.signin);
};
