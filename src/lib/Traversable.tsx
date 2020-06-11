/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import Traversable, {
	TraversableProps as _TraversableProps,
} from '@downpourdigital/boxes/dist/lib/Traversable';
import { ReactNode } from 'react';


export interface TraversableProps extends _TraversableProps {
	children?: ReactNode;
}

export function applyTraversableProps( node: Traversable, props: TraversableProps ): void {
	if ( typeof props.visible !== 'undefined' && props.visible !== node.visible ) {
		if ( props.visible ) {
			node.unhide();
		} else {
			node.hide();
		}
	}
	if ( typeof props.maskOnly !== 'undefined' && props.maskOnly !== node.maskOnly ) {
		// TODO: this should be handled by boxes
		node.maskOnly = props.maskOnly;
		node.invalidateSceneGraph();
	}
	if ( props.onBeforeRender ) node.onBeforeRender = props.onBeforeRender;
}