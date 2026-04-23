const validate = (schema) => (req, res, next) => {
    const { error, value} = schema.validate(req.body, {
        abortEarly : false
    });
    console.log(error);
    if(error){
         res.status(400).json({
            msg: "Validation error",
            details: error.details.map((d) => d.message)
        })
    }
    req.validateData = value;
    next();
}
module.exports = validate;