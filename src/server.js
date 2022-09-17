const Hapi = require('@hapi/hapi');
const notes = require('./notes');
const route = require('./route');

const init = async () => {
    const server = Hapi.server({
        port : 5000,
        host : 'localhost',
        routes:{
            cors : {
                origin:['*']
            }
        }
    });

    server.route(route);

    await server.start();

    console.log(`klik ${server.info.uri}`);
};
init();