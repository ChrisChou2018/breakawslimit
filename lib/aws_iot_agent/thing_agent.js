'use strict';
const AWS = require('aws-sdk');

const common = require('../../lib/common.js');
// const logger = require('../../lib/logger.js');

try{
  AWS.config.loadFromPath( __dirname + '/config_local.json');
}catch(err){
  AWS.config.loadFromPath( __dirname + '/config.json');
}

const iot = new AWS.Iot();

class ThingAgent{
  async detachThingPrincipal(principal, thingName){
    return new Promise((resolve)=>{
      const returnData = {error: null, data: null};
      if(common.isEmptyString(thingName)
        || common.isEmptyString(principal)){
        returnData.error = new Error('ErrRequest');
        resolve(returnData);
        return;
      }
      const params = {
        principal: principal,
        thingName: thingName
      };
      iot.detachThingPrincipal(params, (err, data)=>{
        if(err){
          returnData.error = new Error('detachThingPrincipalErr');
          // logger.loggerError.info({info: err.stack, source: 'detachThingPrincipal'});
          console.error('detachThingPrincipalErr>>>', err.stack);
          resolve(returnData);
          return;
        }
        returnData.data = data;
        resolve(returnData);
        return;
      });
    });
  }

  async attachThingPrincipal(principal, thingName){
    return new Promise((resolve)=>{
      const returnData = {error: null, data: null};
      if(common.isEmptyString(principal)
        || common.isEmptyString(thingName)){
        returnData.error = new Error('ErrRequest');
        resolve(returnData);
        return;
      }
      const params = {
        principal: principal,
        thingName: thingName
      };
      iot.attachThingPrincipal(params, function(err, data) {
        if(err){
          returnData.error = new Error('attachThingPrincipalErr');
          // logger.loggerError.info({info: err.stack, source: 'attachThingPrincipal'});
          console.error('attachThingPrincipalErr>>>', err.stack);
          resolve(returnData);
          return;
        }
        returnData.data = data;
        resolve(returnData);
        return;
      });
    });
  }

  async listThingPrincipals(thingName){
    return new Promise((resolve)=>{
      const returnData = {error: null, data: null};
      const params = {
        thingName: thingName
      };
      iot.listThingPrincipals(params, (err, data)=>{
        if(err){
          returnData.error = err;
          resolve(returnData);
          return;
        }
        returnData.data = data;
        resolve(returnData);
        return;
      });
    });
  }

}

module.exports = ThingAgent;
