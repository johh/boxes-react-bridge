/* eslint-disable no-param-reassign */
import React, {
	forwardRef,
	ForwardRefExoticComponent,
	useMemo,
	useImperativeHandle,
} from 'react';

import { Renderable as _Renderable } from '@downpourdigital/boxes';
import { RenderableProps as _RenderableProps } from '@downpourdigital/boxes/dist/lib/Renderable';
import { TransformNodeProps, applyTransformNodeProps } from './TransformNode';
import mountNode from './mountNode';
import TraversableChildren from './TraversableChildren';


interface RenderableProps extends _RenderableProps, TransformNodeProps {}


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
		// TODO: this should be done by boxes
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
	const renderable = useMemo( () => new _Renderable({
		geometry: props.geometry,
		material: props.material,
	}), []);
	useImperativeHandle( ref, () => renderable, [renderable]);

	applyTransformNodeProps( renderable, props );
	applyRenderableProps( renderable, props );
	mountNode( renderable );

	return (
		<TraversableChildren parent={renderable}>
			{children}
		</TraversableChildren>
	);
});

export default Renderable;
