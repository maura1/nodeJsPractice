//Creating a server, two different routes and some html that will be displayed depending on which route the user entered
//Using a form to create a new user,parsing the users string input and displaying what the user entered on the terminal


const http  = require('http') //this allows use to create a new server by using the create server method



//This takes a function which will be executed for every incoming request.
const server = http.createServer((req, res)=>{
    //parsing the url, this will show us what the user entered after entering localhost:3000
    const url = req.url;
    if(url ==='/'){
        //send a response where we first send a header and tell the browser that we are sending some html code
        res.setHeader('Content-Type', 'text/html')
        //Write a response
        res.write('<html>')
        res.write('<head><title>Assignment1</title></head>')
        //res.write('<body><h1>Welcome the our site!!</h1></body>')
        res.write('<body><form action="/create-user"method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        //return is not necessary here as there are no other res.write() calls outside of the if statements, but it doesn't hurt
        return res.end()
    }
    if(url ==='/users'){
        //send a response where we first send a header and tell the browser that we are sending some html code
        res.setHeader('Content-Type', 'text/html')
        //Write a response
        res.write('<html>')
        res.write('<head><title>Assignment1</title></head>')
        res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>')
        res.write('</html>')
        //return is not necessary here as there are no other res.write() calls outside of the if statements, but it doesn't hurt
        return res.end()
    }
    //Send a HTML response with some 'Page not found text'
    //Targeting the route from the form
    if(url === '/create-user'){
        //parsing the request data and logg it to the console.(stream and buffer ie not waiting on all the data to be available)
        //creating an array to store the chunks of data as they are coming in 
        const body = []
        //register an event.On the request object the data event is registerd(listening for the data coming in ),the second parameter is the function that will be used on each chunk of data coming in
        req.on('data',(chunk)=>{
            //adding to the array
            body.push(chunk)
        });
        //all the data has been read and added to body array, so at the end we run a function to create one buffer of all the chunks of data and convert it to a string
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString()
            //console.log(parsedBody)//this will output what the user entered, username =..
            //split the string on the '=', we want the second element in the array, the first element is username and the second element is the actual username (username='Tom Cat')
            console.log(parsedBody.split('=')[1])
        })
        res.statusCode = 302
        res.setHeader('Location','/')
        res.end();

    }
})



server.listen(3000)