const Hapi = require('@hapi/hapi');
const routes = require('./src/routes');

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: process.env.PORT || 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.state('userSession', {
    ttl: 24 * 60 * 60 * 1000,
    encoding: 'base64json',
    isSecure: false,
    isHttpOnly: true,
    clearInvalid: false,
    strictHeader: true,
  });

  server.route(routes);

  await server.register({
    plugin: require('@hapi/cookie'),
  });

  await server.start();
  console.log(`Server started on ${server.info.uri}`);
};

init();
