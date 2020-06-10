import React, {
	FunctionComponent, useMemo,
} from 'react';
import Traversable from '@downpourdigital/boxes/dist/lib/Traversable';
import TraversableContext from './TraversableContext';


interface TraversableChildrenProps {
	parent: Traversable;
}

const TraversableChildren: FunctionComponent<TraversableChildrenProps> = ({ parent, children }) => {
	const value = useMemo( () => ({ parent }), [parent]);
	return (
		<TraversableContext.Provider value={value}>
			{children}
		</TraversableContext.Provider>
	);
};

export default TraversableChildren;
