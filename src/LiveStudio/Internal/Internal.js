/**
 * @file Internal.js
 * @desc Internal functions not intended for module developers to use
 * @author scoutchorton
 * 
 * @module LiveStudio/Internal
 */

const fs = require("fs").promises;
const path = require("path");

/*
 * Internal variables 
 */
var module_cache = {};



module.exports = {
	Error: require("./Error.js"),
	Module: require("./Module.js"),
	File: require("./File.js")
}