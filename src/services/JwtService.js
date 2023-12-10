const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

// Tạo tooken với thời gian sống là 1h
const genneralAccessToken = async (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

    return access_token
}

// Tạo 1 refresh tooken với thời gian sống là 1y
const genneralRefreshToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

// Xác thực lại refresh tooken
const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'The authemtication'
                    })
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'SUCESS',
                    access_token
                })
            })
        } catch (e) {
            reject(e)
        }
    })

}

module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}