import { createContext } from 'react';
import Traversable from '@downpourdigital/boxes/dist/cjs/lib/Traversable';


interface TraversableParent {
	parent: Traversable;
}


const TraversableContext = createContext<TraversableParent>({
	parent: null,
});

export default TraversableContext;
