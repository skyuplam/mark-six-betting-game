#! /usr/bin/env node

'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');
const chalk = require('chalk');
const invariant = require('invariant');
const _ = require('lodash');
const argv = require('minimist')(process.argv.slice(2));
const config = require('./configs');

const log = (msg) => console.log(chalk.green(msg));
const err = (msg) => console.log(chalk.red(msg));

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  error.status = response.status;
  throw error;
};

const parseJSON = (response) => response.json();

const request = (url, option) => fetch(url, option)
  .then(checkStatus).then(parseJSON);

invariant(!(_.isEmpty(argv) || !Boolean(argv.dbUrl)),
  `dbUrl is expected, please try yarn run db:new -- --dbUrl localhost:32769`);

invariant((Boolean(argv.username) && Boolean(argv.password)),
  `Please provide a valid username and password. e.g. --username superman --password secretpassword`);


/*
 * Create Database
 */

log(`
  Creating new databases at ${argv.dbUrl} ...
`);
_.keys(config.db)
  .forEach((db) =>
    request(`http://${argv.username}:${argv.password}@${argv.dbUrl}/${db}?batch=ok`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then((response) => {
      if (!response.ok) {
        const error = new Error(response.reason);
        error.error = response.error;
        throw error;
      }
      log(
        `Created database [${db}].`
      );
      if (db === 'settings') {
        /*
         * Populate Data
         */
        log(`
  Populating Data to 'settings' DB ...
         `);
        return config.db.settings.forEach((db) =>
         request(`http://${argv.username}:${argv.password}@${argv.dbUrl}/settings?batch=ok`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json',
           },
           body: JSON.stringify(db),
         }).then((response) => {
           if (!response.ok) {
             const error = new Error(response.reason);
             error.error = response.error;
             throw error;
           }
           log(`Doc [${response.id} created.]`);
         }).catch((e) => {
           switch (e.status) {
             case 400:
               return err(`400 Bad Request – Invalid database name`);
             case 401:
               return err(`401 Unauthorized – Write privileges required`);
             case 404:
               return err(`404 Not Found – Database doesn’t exist`);
             case 409:
               return err(`409 Conflict – A Conflicting Document with same ID already exists`);
             default:
               return err(e);
           }
         })
        );
      }
    }).catch((error) => {
      switch(error.status) {
        case 400:
          return err(`400 Bad Request – Invalid database name: [${db}]`);
        case 401:
          return err(`401 Unauthorized – CouchDB Server Administrator privileges required: [${db}]`);
        case 412:
          return err(`412 Precondition Failed – Database already exists: [${db}]`);
        default:
          return err(error);
      }
    })
  );
