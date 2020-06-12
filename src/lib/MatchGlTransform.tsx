import React, {
	FunctionComponent, useContext, useRef,
} from 'react';
import { mat4, Renderable } from '@downpourdigital/boxes';

import PerspectiveContext from './PerspectiveContext';
import useLoop from './useLoop';
import TraversableContext from './TraversableContext';


const mat = mat4.create();


const MatchGlTransform: FunctionComponent = ({ children }) => {
	const { viewMatrix, pxPerUnit } = useContext( PerspectiveContext );
	const { parent } = useContext( TraversableContext );
	const ref = useRef<HTMLDivElement>();

	useLoop( () => {
		if ( ( parent as Renderable ).isRenderable ) {
			mat4.mul( mat, viewMatrix, ( parent as Renderable ).worldMatrix );

			// flip y axis
			mat[1] = -mat[1];
			mat[5] = -mat[5];

			// adjust scale
			mat[12] *= pxPerUnit;
			mat[13] *= -pxPerUnit;
			mat[14] *= pxPerUnit;

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
			}}
		>
			<div
				style={{
					transform: 'scale(1,-1)',
				}}
			>
				{ children }
			</div>
		</div>
	);
};

export default MatchGlTransform;
