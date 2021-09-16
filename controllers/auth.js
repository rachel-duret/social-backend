'use stric'

exports.auth = (req, res)=>{
    const userToken = req.user
    res.status(200).json(userToken)
}