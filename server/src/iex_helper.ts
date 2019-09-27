import request from 'request'

function make_IEX_API_call(url: string) {
    var options = {
        method: 'GET',
        url: url,
    };
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error)
            resolve(body)
        });
    })
}

export default {
    make_IEX_API_call
}