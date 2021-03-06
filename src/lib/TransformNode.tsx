/* eslint-disable no-param-reassign */
import React, {
	forwardRef,
	ForwardRefExoticComponent,
	Ref,
} from 'react';
import {
	TransformNode as _TransformNode,
	vec3,
} from '@downpourdigital/boxes';

import mountNode from './mountNode';
import TraversableChildren from './TraversableChildren';
import createInstance from './createInstance';
import { applyTraversableProps, TraversableProps } from './Traversable';


export interface TransformNodeProps<T> extends TraversableProps<T> {
	onBeforeTransform?: ( ref: T ) => void;
	origin?: [number, number, number];
	translation?: [number, number, number];
	scale?: [number, number, number];
	rotation?: [number, number, number];
	ref?: Ref<_TransformNode>;
}


export function applyTransformNodeProps(
	node: _TransformNode,
	props: Partial<TransformNodeProps<_TransformNode>>,
): void {
	// TRANSFORMNODE PROPS
	if ( props.onBeforeTransform ) node.onBeforeTransform = props.onBeforeTransform;
	if ( props.origin ) vec3.copy( node.origin, props.origin );
	if ( props.translation ) vec3.copy( node.translation, props.translation );
	if ( props.scale ) vec3.copy( node.scale, props.scale );
	if ( props.rotation ) vec3.copy( node.rotation, props.rotation );
}


const TransformNode: ForwardRefExoticComponent<TransformNodeProps<_TransformNode>> = forwardRef( (
	{ children, ...props }, ref,
) => {
	const transformNode = createInstance(
		ref,
		() => new _TransformNode(),
	);

	applyTraversableProps( transformNode, props );
	applyTransformNodeProps( transformNode, props );
	mountNode( transformNode );

	if ( children ) {
		return (
			<TraversableChildren parent={transformNode}>
				{children}
			</TraversableChildren>
		);
	}
	return null;
});

export default TransformNode;
