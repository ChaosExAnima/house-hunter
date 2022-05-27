export class StatusError extends Error {
	constructor(message: string, public status = 500) {
		super(message);
	}
}

export class AuthError extends StatusError {
	constructor(message = 'Unauthorized') {
		super(message);
		this.status = 401;
	}
}
