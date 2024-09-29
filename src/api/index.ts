import { AuthClient } from './clients/AuthClient';

export const api = {
	auth: new AuthClient(),
};
