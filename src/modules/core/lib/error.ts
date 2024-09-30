import { IApiError } from '@/api/types';
import { Path, UseFormReturn } from 'react-hook-form';

export const populateError = <T extends Record<string, any>>(
	form: UseFormReturn<T>,
	err: IApiError
) => {
	const errorResponse = err?.response;
	if (errorResponse?.data?.errors) {
		Object.entries(errorResponse.data.errors).forEach(
			([key, value]: [string, string]) => {
				form.setError(key as Path<T>, { message: value });
			}
		);
	}
};
