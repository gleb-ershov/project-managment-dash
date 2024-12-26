import { IUserRepository } from "@/src/domain/repositories/user.repository.interface";
import { UserEntity } from "@/src/domain/enitites/user.entity";
import { Password } from "@/src/domain/value-objects/password.value-object";
import { Email } from "@/src/domain/value-objects/email.value-object";
import { CreateUserDTO, createUserSchema } from "../../dtos/user.dto";
import { ValidationError } from "@/src/domain/errors/application.error";

export class CreateUserUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(data: CreateUserDTO): Promise<UserEntity> {
		const existingUser = await this.userRepository.findByEmail(data.email);
		if (existingUser) {
			throw new ValidationError("User with this email already exists");
		}

		const validatedData = createUserSchema.safeParse(data);

		if (validatedData.success === false) {
			throw new ValidationError("Invalid data");
		}

		const { email, password, name, surname, imageUrl, plan, description } =
			validatedData.data;

		const user = UserEntity.create({
			email: Email.create(email),
			password: await Password.create(password),
			name,
			surname,
			imageUrl,
			plan,
			description,
		});

		await this.userRepository.create(user);
		return user;
	}
}
