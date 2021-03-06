import React, {
	FunctionComponent, useContext, useRef,
} from 'react';
import { mat4, TransformNode } from '@downpourdigital/boxes';
import Traversable from '@downpourdigital/boxes/dist/cjs/lib/Traversable';

import PerspectiveContext from './PerspectiveContext';
import useLoop from './useLoop';
import TraversableContext from './TraversableContext';


const mat = mat4.create();


const checkVisibilityRecursive = ( node: Traversable ): boolean => {
	if ( !node.visible ) return false;
	if ( node.parent ) return checkVisibilityRecursive( node.parent );
	return true;
};


const MatchGlTransform: FunctionComponent = ({ children }) => {
	const { viewMatrix, pxPerUnit } = useContext( PerspectiveContext );
	const { parent } = useContext( TraversableContext );
	const ref = useRef<HTMLDivElement>();

	useLoop( () => {
		if ( !checkVisibilityRecursive( parent ) ) {
			ref.current.style.visibility = 'hidden';
		} else if ( ( parent as TransformNode ).isTransformNode ) {
			mat4.mul( mat, viewMatrix, ( parent as TransformNode ).worldMatrix );

			// flip y axis
			mat[1] *= -1;
			mat[4] *= -1;
			mat[6] *= -1;
			mat[7] *= -1;

			// adjust scale
			mat[12] *= pxPerUnit;
			mat[13] *= -pxPerUnit;
			mat[14] *= pxPerUnit;

			ref.current.style.visibility = 'visible';
			ref.current.style.transform = `matrix3d(${
				mat.join( ',' )
			})`;
		}
	});

	return (
		<div
			ref={ref}
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'scale(0)',
				maxWidth: 0,
				maxHeight: 0,
				willChange: 'transform, visibility',
			}}
		>
			{ children }
		</div>
	);
};

export default MatchGlTransform;
