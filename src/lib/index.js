// place files you want to import through the `$lib` alias in this folder.

import { clsx } from 'clsx';

export function cn(...inputs) {
	return clsx(inputs);
}
