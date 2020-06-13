import React, {
	FunctionComponent, useMemo,
} from 'react';
import { PerspectiveCamera, mat4 } from '@downpourdigital/boxes';

import PerspectiveContext from './PerspectiveContext';
import useLoop from './useLoop';


interface PerspectiveWrapperProps {
	width: number;
	height: number;
	camera: PerspectiveCamera;
}


const PerspectiveWrapper: FunctionComponent<PerspectiveWrapperProps> = ({
	width,
	height,
	children,
	camera,
}) => {
	const pxPerUnit = useMemo( () => (
		height / (
			( 1 / camera.projectionMatrix[5])
			* 2
			* camera.translation[2]
		)
	), [camera]);
	const perspective = useMemo( () => (
		camera.translation[2]
	), [camera]);
	const viewMatrix = useMemo( () => mat4.create(), []);
	const value = useMemo( () => ({ viewMatrix, pxPerUnit }), [camera]);

	useLoop( () => {
		mat4.copy( viewMatrix, camera.viewMatrix );
		viewMatrix[14] += perspective;
	});

	return (
		<div
			style={{
				width,
				height,
				position: 'relative',
				perspective: perspective * pxPerUnit,
			}}
			className="gl-dom"
		>
			<PerspectiveContext.Provider value={value}>
				{children}
			</PerspectiveContext.Provider>
		</div>
	);
};

export default PerspectiveWrapper;
