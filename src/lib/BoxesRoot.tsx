import React, {
	FunctionComponent,
} from 'react';
import Traversable from '@downpourdigital/boxes/dist/lib/Traversable';

import TraversableChildren from './TraversableChildren';


interface BoxesRootProps {
	container: Traversable;
}


const BoxesRoot: FunctionComponent<BoxesRootProps> = ({ children, container }) => (
	<TraversableChildren parent={container}>
		{children}
	</TraversableChildren>
);

export default BoxesRoot;
