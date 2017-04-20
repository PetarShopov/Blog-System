let fs = require('fs')
let url = require('url')

function getContentType(url) {
    let contentType = 'text/plain'
    if (url.endsWith('.css')){
        contentType = 'text/css'
    } else if (url.endsWith('.js')){
        contentType = 'application/javascript'
    } 

    return contentType
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    fs.readFile('.' + req.pathname, (err, data) => {
        if(err) {
            res.writeHead(404)
            res.write('404 not found!')
            res.end()
            return true
        }

       let contentType = getContentType(req.pathname)

        res.writeHead(200, {
            'Content-Type':contentType
        })
        res.write(data)
        res.end()
    })
}