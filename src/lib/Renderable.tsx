/* eslint-disable no-param-reassign */
import React, {
	forwardRef,
	ForwardRefExoticComponent,
	Ref,
} from 'react';
import { Renderable as _Renderable } from '@downpourdigital/boxes';
import {
	RenderableProps as _RenderableProps,
} from '@downpourdigital/boxes/dist/cjs/lib/Renderable';

import { TransformNodeProps, applyTransformNodeProps } from './TransformNode';
import mountNode from './mountNode';
import TraversableChildren from './TraversableChildren';
import createInstance from './createInstance';
import { applyTraversableProps } from './Traversable';


interface RenderableProps extends _RenderableProps, TransformNodeProps<_Renderable> {
	ref?: Ref<_Renderable>;
}


export function applyRenderableProps(
	node: _Renderable,
	props: Partial<RenderableProps>,
): void {
	if ( props.geometry !== node.geometry ) {
		// TODO: this should be handled by boxes
		node.geometry.delete();
		node.geometry = props.geometry;
	}
	if ( props.material !== node.material ) {
		// TODO: this should be handled by boxes
		node.material.delete();
		node.material = props.material;
	}
	if ( props.mask !== node.mask ) {
		// TODO: this should be handled by boxes
		node.mask = props.mask;
		node.invalidateSceneGraph();
	}
	node.layer = props.layer;
	node.depthTest = props.depthTest ?? node.depthTest;
	node.depthWrite = props.depthWrite ?? node.depthWrite;
	node.flipFaces = props.flipFaces ?? node.flipFaces;
	node.renderOrder = props.renderOrder ?? node.renderOrder;
	if ( props.blending ) node.blending = props.blending;
}


const Renderable: ForwardRefExoticComponent<RenderableProps> = forwardRef( (
	{ children, ...props }, ref,
) => {
	const renderable = createInstance(
		ref,
		() => new _Renderable({
			geometry: props.geometry,
			material: props.material,
		}),
	);

	applyTraversableProps( renderable, props );
	applyTransformNodeProps( renderable, props );
	applyRenderableProps( renderable, props );
	mountNode( renderable );

	if ( children ) {
		return (
			<TraversableChildren parent={renderable}>
				{children}
			</TraversableChildren>
		);
	}
	return null;
});

export default Renderable;
