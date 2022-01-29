/**
 * @module LiveStudio/Internal/Error
 */

export class RegistrationError extends Error {
	override name = 'RegistrationError';

	constructor(msg?: string) {
		super(msg);
	}
}