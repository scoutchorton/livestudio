/**
 * @module LiveStudio/Internal/Error
 */

export class RegistrationError extends Error {
	constructor(msg:string) {
		super(msg);
		this.name = "RegistrationError";
	}
}