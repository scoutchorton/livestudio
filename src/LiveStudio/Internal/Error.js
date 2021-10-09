/**
 * @file Error.js
 * @desc Internal Errors
 * @author scoutchorton
 * 
 * @module Internal/Error
 */

/**
 * Issues with registering a module
 * @extends Error
 */
class RegistrationError extends Error {
	constructor(msg) {
		super(msg);
		this.name = "RegistrationError";
	}
}


module.exports = {
	RegistrationError
}