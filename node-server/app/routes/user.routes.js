const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function (router) {
    // middleware
    router.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });

    // public content
    router.get('/all/:numberOfBooks', controller.allAccess);

    // user content
    router.get('/user', [authJwt.verifyToken], controller.userBoard);

    // user profile
    router.get('/userProfile/:reviewerID', [authJwt.verifyToken], controller.userProfile);

    // moderator content
    router.get('/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

    // admin content
    router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};
