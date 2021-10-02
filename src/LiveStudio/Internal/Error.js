/**
 * @file Error.js
 * @desc Internal Errors
 * @author scoutchorton
 * 
 * @module LiveStudio/Internal/Error
 */

/**
 * Issues with registering a module
 * @module LiveStudio/Internal/Error
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