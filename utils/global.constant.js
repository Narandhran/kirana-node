module.exports = {
    paths: {
        userDp: ''
    },
    uri: {},
    aws: {
        secretAccessKey: 'WGLDzMKnsdB/VY1n9dsqmGGOMllZg5kqOsafefBH',
        accessKeyId: 'AKIAIB3L7KCCYRF2ZN6A',
        region: 'ap-south-1'
    },
    s3: { basePath: 'https://kirana-signvision.s3.ap-south-1.amazonaws.com/' },
    jwt: {
        issuer: 'Arl',
        audience: 'appraamlabs.com',
        salt: 10,
        expiration: '365d',
        algorithm: 'RS256'
    },
    razorPay: {
        key_id: 'rzp_test_m0hjWTJAGI5LlD',
        key_secret: 'bB3wHTL8DXttQBi9euS2AQFD'
    }
};