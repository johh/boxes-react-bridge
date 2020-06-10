import { useContext, useEffect } from 'react';
import Traversable from '@downpourdigital/boxes/dist/lib/Traversable';

import TraversableContext from './TraversableContext';

export default function mountNode( node: Traversable ): void {
	const ctx = useContext( TraversableContext );

	useEffect( () => {
		ctx.parent.append( node );
		return (): void => {
			ctx.parent.remove( node );
		};
	}, [ctx.parent]);
}
