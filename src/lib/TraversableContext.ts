import { createContext } from 'react';
import Traversable from '@downpourdigital/boxes/dist/lib/Traversable';

interface TraversableParent {
	parent: Traversable;
}

const TraversableContext = createContext<TraversableParent>({
	parent: null,
});

export default TraversableContext;
