import { useContext } from 'react';

import PerspectiveContext from './PerspectiveContext';


export default function usePxPerUnit(): number {
	const ctx = useContext( PerspectiveContext );

	return ctx.pxPerUnit;
}
