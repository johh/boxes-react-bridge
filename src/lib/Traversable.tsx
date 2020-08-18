/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { ReactNode } from 'react';
import Traversable, {
	TraversableProps as _TraversableProps,
} from '@downpourdigital/boxes/dist/cjs/lib/Traversable';


export interface TraversableProps<T> extends _TraversableProps<T> {
	children?: ReactNode;
}


export function applyTraversableProps(
	node: Traversable, props: TraversableProps<Traversable>,
): void {
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
