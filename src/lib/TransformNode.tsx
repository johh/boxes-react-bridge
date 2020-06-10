/* eslint-disable no-param-reassign */
import React, {
	useMemo,
	forwardRef,
	useImperativeHandle,
	ForwardRefExoticComponent,
} from 'react';
import {
	TransformNode as _TransformNode,
	vec3,
} from '@downpourdigital/boxes';
import { TraversableProps } from '@downpourdigital/boxes/dist/lib/Traversable';

import mountNode from './mountNode';
import TraversableChildren from './TraversableChildren';


export interface TransformNodeProps extends TraversableProps {
	onBeforeTransform?: ( ref: _TransformNode ) => void;
	origin?: [number, number, number];
	translation?: [number, number, number];
	scale?: [number, number, number];
	rotation?: [number, number, number];
}


export function applyTransformNodeProps(
	node: _TransformNode,
	props: Partial<TransformNodeProps>,
): void {
	// TRAVERSABLE PROPS
	if ( props.visible !== node.visible ) {
		if ( props.visible ) {
			node.unhide();
		} else {
			node.hide();
		}
	}
	if ( props.maskOnly !== node.maskOnly ) {
		node.maskOnly = props.maskOnly;
		node.invalidateSceneGraph(); // TODO: this should be handled by boxes
	}
	if ( props.onBeforeRender ) node.onBeforeRender = props.onBeforeRender;

	// TRANSFORMNODE PROPS
	if ( props.onBeforeTransform ) node.onBeforeTransform = props.onBeforeTransform;
	if ( props.origin ) vec3.copy( node.origin, props.origin );
	if ( props.translation ) vec3.copy( node.translation, props.translation );
	if ( props.scale ) vec3.copy( node.scale, props.scale );
	if ( props.rotation ) vec3.copy( node.rotation, props.rotation );
}


const TransformNode: ForwardRefExoticComponent<TransformNodeProps> = forwardRef( (
	{ children, ...props }, ref,
) => {
	const transformNode = useMemo( () => new _TransformNode(), []);
	useImperativeHandle( ref, () => transformNode, [transformNode]);

	applyTransformNodeProps( transformNode, props );
	mountNode( transformNode );

	return (
		<TraversableChildren parent={transformNode}>
			{children}
		</TraversableChildren>
	);
});

export default TransformNode;
