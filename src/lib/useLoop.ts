import { useEffect } from 'react';
import { loop } from '@downpourdigital/scheduler';
import { LoopTask } from '@downpourdigital/scheduler/dist/cjs/lib/Scheduler';


export default function useLoop(
	func: LoopTask,
): void {
	useEffect( () => {
		const unschedule = loop( func );

		return (): void => unschedule();
	});
}
