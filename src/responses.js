const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, status, content, type) => {
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'uft8'),
  });

  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, 200, index, 'text/html');
};

const success = (request, response) => {
  const responseJSON = {
    message: 'Successful response',
    id: 'success',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Successful Response</message>`;
    responseXML = `${responseXML} <id>success</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);

  return respond(request, response, 200, responseString, 'application/json');
};

const badRequest = (request, response) => {
  const responseJSON = {
    message: 'THis request has the required parameters',
  };

  // check for query
  if (!request.query.valid || request.query.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    // check for type with in query
    if (request.acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>Missing valid query parameter set to true</message>`;
      responseXML = `${responseXML} <id>badRequest</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 400, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseJSON);
    return respond(request, response, 400, responseString, 'application/json');
  }

  // check for type outside of query checker
  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>THis request has the required parameters</message>`;
    responseXML = `${responseXML} <id>badRequest</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 200, responseString, 'application/json');
};

const unauthorized = (request, response) => {
  const responseJSON = {
    message: 'this request has the required parameters',
  };

  // check for query
  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';

    // checks for type
    if (request.acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>Missing loggedIn query parameter set to yes</message>`;
      responseXML = `${responseXML} <id>unauthorized</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 401, responseXML, 'text/xml');
    }

    const responseString = JSON.stringify(responseJSON);
    return respond(request, response, 401, responseString, 'application/json');
  }
  // check for type again outside of the query check
  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>this request has the required parameters</message>`;
    responseXML = `${responseXML} <id>unauthorized</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 200, responseString, 'application/json');
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>You do not have acces to this content</message>`;
    responseXML = `${responseXML} <id>forbidden</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 403, responseString, 'application/json');
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Interal Server Error. Something went wrong.',
    id: 'internalError',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Interal Server Error. Something went wrong.</message>`;
    responseXML = `${responseXML} <id>internalError</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 500, responseString, 'application/json');
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemeted yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>A get request for this page has not been implemeted yet. Check again later for updated content.</message>`;
    responseXML = `${responseXML} <id>notImplemented</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 501, responseString, 'application/json');
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'the page you are looking for was not found',
    id: 'notFound',
  };

  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>the page you are looking for was not found</message>`;
    responseXML = `${responseXML} <id>notFound</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 404, responseString, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
  getIndex,
};
