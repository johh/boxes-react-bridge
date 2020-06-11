/* eslint-disable no-param-reassign */
import React, {
	ForwardRefExoticComponent,
	forwardRef,
	MutableRefObject,
} from 'react';
import { UniformProvider as _UniformProvider } from '@downpourdigital/boxes';
import {
	UniformProviderProps as _UniformProviderProps,
} from '@downpourdigital/boxes/dist/lib/UniformProvider';

import createInstance from './createInstance';
import { applyTraversableProps, TraversableProps } from './Traversable';
import TraversableChildren from './TraversableChildren';
import mountNode from './mountNode';


interface UniformProviderProps extends _UniformProviderProps, TraversableProps {
	ref?: MutableRefObject<_UniformProvider>;
}


export function applyUniformProviderProps(
	node: _UniformProvider,
	props: UniformProviderProps,
): void {
	node.uniforms = props.uniforms;
}

const UniformProvider: ForwardRefExoticComponent<UniformProviderProps> = forwardRef( (
	{ children, ...props }, ref,
) => {
	const uniformProvider = createInstance(
		ref,
		() => new _UniformProvider({
			uniforms: props.uniforms,
		}),
	);

	applyTraversableProps( uniformProvider, props );
	applyUniformProviderProps( uniformProvider, props );
	mountNode( uniformProvider );

	return children && (
		<TraversableChildren parent={uniformProvider}>
			{children}
		</TraversableChildren>
	);
});

export default UniformProvider;
