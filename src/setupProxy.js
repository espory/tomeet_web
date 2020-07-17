// const { createProxyMiddleware } = require('http-proxy-middleware');
 
// const apiProxy = createProxyMiddleware('/api', { target: 'http://localhost:7001',
// changeOrigin:true,});

// module.exports = function(app){
//     app.use(apiProxy)
// }

// include dependencies

// const { createProxyMiddleware } = require('http-proxy-middleware');
 
// app.use('/api', createProxyMiddleware({ target: 'http://localhost:7001', changeOrigin: true }));

// module.exports = function(app){
//     app.use(apiProxy)
// }

// app.listen(3000);


// const { createProxyMiddleware } = require('http-proxy-middleware');
 
// // proxy middleware options
// const options = {
//   target: 'http://localhost:7001', // target host
//   changeOrigin: true, // needed for virtual hosted sites
// //   ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api/':''
//     // '^/api/old-path': '/api/new-path', // rewrite path
//     // '^/api/remove/path': '/path', // remove base path
//   },
// //   router: {
// //     // when request.headers.host == 'dev.localhost:3000',
// //     // override target 'http://www.example.org' to 'http://localhost:8000'
// //     'dev.localhost:3000': 'http://localhost:8000',
// //   },
// };
 
// // create the proxy (without context)
// const exampleProxy = createProxyMiddleware(options);

// module.exports = function(app){
//     console.log(666666666)
//     app.use('/api', exampleProxy)
// }


const { createProxyMiddleware } = require('http-proxy-middleware');
  
module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/api',
      {
        target: 'http://localhost:7001',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    )
  );
};

