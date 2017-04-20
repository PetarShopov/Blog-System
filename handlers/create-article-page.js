let fs = require('fs')
let url = require('url')


module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (req.pathname === '/createArticle') {
    fs.readFile('./content/create-article-page.html', (err, data) => {
        if(err) console.log(err)

        res.writeHead(200, {
            'Content-Type':'text/html'
        })
        res.write(data)
        res.end()
    })
    } else {
        return true
    }
}