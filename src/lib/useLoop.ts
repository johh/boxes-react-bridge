import { useEffect } from 'react';
import scheduler from '@downpourdigital/scheduler';


export default function useLoop(
	func: ( delta?: number, time?: number ) => void, priority?: number,
): void {
	useEffect( () => {
		const loop = scheduler.schedule( func, priority );

		return (): void => { loop.unschedule(); };
	});
}
