/**
 * Safe min/max that doesn't blow the stack on large arrays.
 * Math.min/max(...arr) throws RangeError when arr > ~65K elements.
 */
export function minMax(arr: number[]): [number, number] {
	if (arr.length === 0) return [0, 0];
	let min = arr[0];
	let max = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < min) min = arr[i];
		if (arr[i] > max) max = arr[i];
	}
	return [min, max];
}
