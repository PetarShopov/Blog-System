let fs = require('fs')
let url = require('url')
var jsdom = require("jsdom");
var window = jsdom.jsdom().defaultView;
var $ = require("jquery")(window);

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname

    if (req.pathname === '/') {
    fs.readFile('./index.html', (err, data) => {
        if(err) console.log(err)

        res.writeHead(200, {
            'Content-Type':'text/html'
        })
        res.write(data)
    })
    fs.readFile('./content/database.json', 'utf8', (err, output) => {
        if(err) console.log(err)
        let obj = JSON.parse(output)
        let articlesHTML = ''
        for (let art of obj) {
             articlesHTML += `<section style="border: 1px solid #006400; width:500px; border-radius:20px; margin: 20px auto; padding: 15px; text-align:center; background-color:#8FBC8F">
             <h3>${art.title}</h3>
             ${art.description}
             <a href="/details/${art.id}">More details...</a>
             </section>`
        }
        res.write(articlesHTML)
        res.end()
    })
        
    } else {
        return true
    }
}