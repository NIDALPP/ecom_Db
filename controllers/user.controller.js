// const client = require("../helpers/init_redis")
// const User = require('../models/user.models')
// const createError = require('http-errors')
// const bcrypt = require('bcrypt');
// const authSchema = require('../helpers/validation')


// module.exports = {
//     register: async (req, res) => {
//         const { name, email, password, role } = req.body;
//         try {
//             const user = await User.create({ name, email, password, role });
//             res.status(201).json(user);
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     },
//     login: async (req, res, next) => {

//         try {
//             const result = await authSchema.validateAsync(req.body);
//             const user = await User.findOne({ email: req.body.email });
//             if (!user) throw createError.NotFound('user not registered')

//             const isMatch = await user.isValidPassword(result.password)
//             if (!isMatch) throw createError.Unauthorized('invalid password')
//             res.send({ result })
//         } catch (error) {
//             if (error.isJoi === true) return next(createError.BadRequest("invalid username/password"))
//         }
//     },
//     logout: async (req, res) => {
//         const { userId } = req.body;
//         try {
//             await client.del(`user:${userId}`);
//             res.status(200).json({ message: 'Logged out successfully' });
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     }


// }