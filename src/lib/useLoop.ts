import { useEffect } from 'react';
import { loop, render } from '@downpourdigital/scheduler';
import { LoopTask } from '@downpourdigital/scheduler/dist/cjs/lib/Scheduler';


export default function useLoop(
	func: LoopTask,
): void {
	useEffect( () => {
		const unschedule = loop( () => [render( func )]);

		return (): void => unschedule();
	});
}
