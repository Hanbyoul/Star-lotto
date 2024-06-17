import { useEffect, useRef } from 'react';

const useOutSideClick = <T extends HTMLElement>(callback: () => void) => {
	const targetElement = useRef<T>(null);

	const handleOutSideClick = () => (e: MouseEvent) => {
		if (
			targetElement &&
			targetElement.current &&
			!targetElement.current.contains(e.target as Node)
		) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleOutSideClick());

		return document.removeEventListener('mousedown', handleOutSideClick());
	}, [callback]);

	return [targetElement];
};

export default useOutSideClick;
