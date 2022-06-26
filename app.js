const http = require('http');
const { o3 } = require('goss_proto');

const get_proto = (obj) => {
    let result = [];
    result.push(obj.name);

    let proto = Object.getPrototypeOf(obj);

    while (proto) {
        result.push(proto.name);

        proto = Object.getPrototypeOf(proto);
    }

    return result;
}

const send_author_name = (res) => {
    res.write('Vladislav Marchenko');
    res.end();
}

const send_proto = (res) => {
    let result = get_proto(o3);

    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify(result));
    res.end();
}

const server = http.createServer();

server.on('request', (req, res) => {

    if (req.url === '/author') {
        send_author_name(res);
    }
    else {
        send_proto(res);
    }
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log('Server has been started'))