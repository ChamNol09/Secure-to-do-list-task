require('dotenv').config();
let jwtConfig = {
    secret : process.env.JWT_SECRET,
    expireIn : process.env.JWT_EXPIRED,
}

module.exports = jwtConfig;