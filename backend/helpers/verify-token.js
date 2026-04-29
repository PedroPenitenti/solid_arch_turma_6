const jwt = require('jsonwebtoken')
const getToken = require('./get-tokens')


const checkToken = (req, res, next) => {

    if (!req.headers.authorization){
        return res.status(401).json({ message: 'erro de Headers' })
    }

    const token = getToken(req)

    if (!token){
        return res.status(401).json({ message: 'acesso negado' })
    }

    try {
        const verified = jwt.verify(token, 'fatec-turma6-a2026')
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({ message: 'token invalido' })
    }
}

module.exports = checkToken