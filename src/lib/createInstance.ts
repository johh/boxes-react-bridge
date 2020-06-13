import {
	useMemo,
	useImperativeHandle,
	Ref,
} from 'react';


export default function createInstance<T>( ref: Ref<unknown>, factory: () => T ): T {
	const instance = useMemo( factory, []);
	useImperativeHandle( ref, () => instance, [instance]);

	return instance;
}
