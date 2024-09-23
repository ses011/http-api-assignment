const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);

const typeFilter = (msg, id, type) => {
  let responseString;
  if (type === 'text/xml') {
    responseString = '<response>';
    responseString += `<message>${msg}</message>`;
    if (id !== '/success') {
      responseString += `<id>${id.substring(1)}</id>`;
    }

    responseString += '</response';

    // return response passing out string and content type
    return responseString;
  }

  const resp = {
    message: msg,
  };

  if (id !== 'success') {
    resp.id = id.substring(1);
  }

  responseString = JSON.stringify(resp);

  // return response passing json and content type
  return responseString;
};

const writeOut = (code, msg, request, response) => {
  const content = typeFilter(msg, request.url, request.acceptedTypes[0]);

  response.writeHead(code, {
    'Content-Type': request.acceptedTypes[0],
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  response.write(content);
};

const success = (request, response) => {
  const code = 200;
  const msg = 'This is a successful response';

  writeOut(code, msg, request, response);
};

const badRequest = (request, response) => {
  if (!request.query.valid || request.query.valid !== 'true') {
    const code = 400;
    const msg = 'Missing valid query parameter set to true';
    writeOut(code, msg, request, response);
  } else {
    const code = 200;
    const msg = 'This request has the required parameters';
    request.url = '/success';
    writeOut(code, msg, request, response);
  }
};

const unauthorized = (request, response) => {
  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    const code = 401;
    const msg = 'Missing valid query parameter set to true';
    writeOut(code, msg, request, response);
  } else {
    const code = 200;
    const msg = 'You have successfully viewed the content';
    request.url = '/success';
    writeOut(code, msg, request, response);
  }
};

const forbidden = (request, response) => {
  const code = 403;
  const msg = 'You do not have access to this content';

  writeOut(code, msg, request, response);
};

const internal = (request, response) => {
  const code = 500;
  const msg = 'Internal Server Error. Something went wrong.';

  writeOut(code, msg, request, response);
};

const notFound = (request, response) => {
  const code = 404;
  const msg = 'The page yo uare looking for was not found.';

  writeOut(code, msg, request, response);
};

const notImplemented = (request, response) => {
  const code = 501;
  const msg = 'A get request for this page has not been implemented yet. Check again later for updated content.';

  writeOut(code, msg, request, response);
};

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

module.exports = {
  success,
  getIndex,
  badRequest,
  forbidden,
  internal,
  unauthorized,
  notFound,
  notImplemented,
  getStyle,
};
