let fs = require('fs')
let http = require('http')
let multiparty = require('multiparty')
let handlers = require('./handlers/index')
let port = 1337
let query = require('querystring')
var articleDB = ''

http
    .createServer((req,res) => {
        if (req.method === "GET"){
            for (let handler of handlers) {
            var next = handler(req, res) 
                if (!next) {
                    break
                }
            }
        } else if (req.method === "POST") {
            fs.readFile('./content/database.json', 'utf8',(err, dataDB) => {
                if(err) console.log(err)
                articleDB = JSON.parse(dataDB)
                let body =''
                req.on('data', (data) => {body += data})
                req.on('end', () => {
                    let result = query.parse(body)
                    let newArt = {}
                    newArt['id'] = articleDB.length + 1
                    newArt['title'] = result.title
                    newArt['description'] = result.description
                    articleDB.push(newArt)
                    fs.writeFile('./content/database.json',JSON.stringify(articleDB, null, 4), (err) => {
                        if(err) throw err
                    })
                    res.writeHead(302, {
                    'Location': './'
                    });
                    res.end();
                })
            })
        }
    })
    .listen(port)
console.log(`Server is running on ${port} port`)