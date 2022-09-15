const http = require('http')
const fs = require('fs')
const FB = require('fb')

const port = 3000

const server = http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('index.html', function(error, data) {
        if (error) {
            response.writeHead(404)
            response.write('Error: File Not Found')
        } else {
            response.write(data)
        }
        response.end
    })
})

server.listen(port, function(error){
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening in port', port)
    }
})