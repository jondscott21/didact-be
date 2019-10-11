const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const hashCount = require('../utils/hashCount')
const duplicateUser = require('../utils/duplicateUser')

const secrets = require('../config/secret')

const Users = require('../users/usersModel')

/**
 * @api {post} /api/auth/register Post User Registration
 * @apiName PostUser
 * @apiGroup Authentication
 * 
 * @apiParam {String} email The email of the new user
 * @apiParam {String} password The password of the new user
 * @apiParam {String} first_name The first_name of the new user
 * @apiParam {String} last_name The last_name of the new user
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 *    "email": "doctest@example.com",
 *    "password": "blahblahblah",
 *    "first_name": "Doc",
 *    "last_name": "Test"
 *  }
 * 
 * @apiSuccess (201) {Object} user An object with the user id, email and token
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 OK
 * {
 *   "token": "fkjhfbedof84g3ygf89fgy3qf0897yguf942u7fg84gf",
 *   "id": 3,
 *   "email": "doctest@example.com"
 * }
 * 
 * @apiError (400) {Object} bad-request-error The username or password is missing.
 * 
 * @apiErrorExample 400-Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "email, password, first_name, and last_name are required"
 * }
 * 
 * @apiError (409) {Object} duplicate-email-error The email is already registered
 * 
 * @apiErrorExample 409-Error-Response:
 * HTTP/1.1 409 Conflict
 * {
 *  "message": "A user with that email already exists"
 * }
 * @apiError (500) {Object} internal-server-error The user couldn't be registered
 * 
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal-Server-Error
 * {
 *  "message": "Error connecting with server"
 * }
 * 
 */

router.post('/register', validateUserRegister, duplicateUser, (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, hashCount)
    user.password = hash

    Users.add(user)
        .then(response => {
            res.status(201).json({ message: 'User Created', email: user.email})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Error connecting with server'})
        })
})

/**
 * @api {post} /api/auth/login Post User Login
 * @apiName PostLogin
 * @apiGroup Authentication
 * 
 * @apiParam {String} email The email of the existant user
 * @apiParam {String} password The password of the existant user
 * 
 * @apiParamExample {json} Request-Example:
 *  {
 *    "email": "doctest@example.com",
 *    "password": "blahblahblah",
 *    "first_name": "Doc",
 *    "last_name": "Test"
 *  }
 * 
 * @apiSuccess (201) {Object} user An object with the user id and username and token
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 OK
 * {
 *   "message": "User Created",
 *   "email": "doctest@example.com"
 * }
 * 
 * @apiError (400) {Object} bad-request-error The username or password is missing.
 * 
 * @apiErrorExample 400-Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *  "message": "missing email or password"
 * }
 * 
 * @apiError (500) {Object} internal-server-error The user couldn't be logged in
 * 
 * @apiErrorExample 500-Error-Response:
 * HTTP/1.1 500 Internal-Server-Error
 * {
 *  "message": "Couldn't connect to login service"
 * }
 * 
 */

router.post('/login', validateUserLogin, (req, res) => {
    let { email, password } = req.body

    Users.findBy({ email })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ token, id: user.id, email: user.email});
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: `Couldn't connect to login service` })
        })
})

function generateToken(user) {
    const payload = {
        email: user.email
    };

    const options = {
        expiresIn: '1d'
    }
    

    return jwt.sign(payload, secrets.jwtSecret, options)
}

function validateUserRegister(req, res, next)
{
    if(!req.body) res.status(400).json({ message: "missing user data"})
    else if(!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name) res.status(400).json({ message: "email, password, first_name, and last_name are required"})
    else next()
}

function validateUserLogin(req, res, next)
{
    if(!req.body) res.status(400).json({ message: "missing user data"})
    else if(!req.body.email || !req.body.password) res.status(400).json({ message: "missing email or password"})
    else next()
}

module.exports = router