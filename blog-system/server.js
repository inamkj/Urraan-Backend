const http =require('http');
const { handleRequest } = require('./src/routes/router.js');
require('./src/routes/index.js');
const { connectDB } = require('./src/config/db.js');



const server = http.createServer((req,res)=>{
    handleRequest(req,res);
    // res.writeHead(200,{'Content-Type':'application/json'});
    // res.end(JSON.stringify({ message: 'Server is running' }));
});

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    server.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
});
