export class Email {
	private constructor(private readonly email: string) {}

	static create(email: string): Email {
		if (!this.isValid(email)) {
			throw new Error("Invalid email format");
		}
		return new Email(email);
	}

	private static isValid(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	getValue(): string {
		return this.email;
	}
}
