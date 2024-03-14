const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const API_URL = require('./targetUrls');
require('dotenv').config();
const app = express();




app.get("/status", (req, res, next) => {
    res.send('proxy service running');
});

const proxyOptions = {
    target: API_URL.bookingURL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api/posts`]: '/posts',
    },
}


const proxy = createProxyMiddleware(proxyOptions);


app.use('/api/posts', proxy);

app.listen(() => {
    console.log(`Proxy Started at : ${process.env.PORT}`)
});