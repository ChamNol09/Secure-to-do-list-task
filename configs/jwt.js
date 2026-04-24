let jwtConfig = {
    secret : process.env.JWT_SECRET || "secret_key",
    expireIn : "1d",
}

module.exports = jwtConfig;