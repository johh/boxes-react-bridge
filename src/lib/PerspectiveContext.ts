import { createContext } from 'react';
import { mat4 } from '@downpourdigital/boxes';


interface Perspective {
	pxPerUnit: number;
	viewMatrix: mat4;
}


const PerspectiveContext = createContext<Perspective>({
	pxPerUnit: 0,
	viewMatrix: null,
});

export default PerspectiveContext;
