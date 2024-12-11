const fs = require('fs');
require('dotenv').config();

const envConfigFile = `
(function(window) {
  window._env = {
    apiUrl: '${process.env.API_URL}'
  };
})(this);
`;

fs.writeFileSync('./src/assets/env.js', envConfigFile);
