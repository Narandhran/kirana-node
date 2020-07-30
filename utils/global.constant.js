module.exports = {
    fcm: {
        SERVER_KEY: 'AAAAwI-1_uM:APA91bGaEAQp5GPmHCo8gxXbyeI7CLLSs_SdGLQeiHoi-TQaeIN_1xOnZaSL2Q_OT1jp5jbrEbKkBLRfZqIwuwOUZsWY9JRvMfqna6Tp6vPbtiHQtjUgZ8SOU3tFDuDfmjnBRnEbSkwC'
    },
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
        key_id: 'rzp_live_8XnsF5GRdFes6y',
        key_secret: 'l00s7869aqEU7B2yIaKcljjT'
    }
};