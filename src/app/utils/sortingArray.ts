export default function sortingArray(array: number[]) {
	const newArray = [...array];
	newArray.sort((a, b) => a - b);
	return newArray;
}
