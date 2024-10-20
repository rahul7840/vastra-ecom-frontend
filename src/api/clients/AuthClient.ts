import { SignupFormSchema } from '@/modules/auth/signup/form/schema';
import { BaseClient } from './templates/BaseClient';
import { LoginFormSchema } from '@/modules/auth/login/form/schema';
export class AuthClient extends BaseClient {
	constructor() {
		super('customer/auth');
	}

	async login(data: LoginFormSchema) {
		return await this.post('/login', data);
	}

	async register(data: SignupFormSchema) {
		return await this.post('/register', data);
	}

	async session() {
		return await this.get('/session');
	}

	async logout() {
		return await this.post('/logout');
	}
}
