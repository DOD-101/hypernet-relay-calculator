// place files you want to import through the `$lib` alias in this folder.

export const PRICE_TO_CORE_RATIO = 10_000_000_000_000 / 822_786;

export function customParse(value: string) {
	return Number.parseInt(value.replaceAll(",", "").replaceAll("_", "")) || 0;
}

export function roundN(value: number, n: number) {
	return Math.round(value * 10 ** n) / 10 ** n;
}

export function displayNumber(value: number) {
	return value.toLocaleString("en-US", {
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
	});
}

export function abbreviateNumber(value: number) {
	let val = value;

	const suffixes = ["", "thousand", "million", "billion", "trillion"];
	let suffixIndex = 0;

	while (Math.abs(val) >= 1000 && suffixIndex < suffixes.length - 1) {
		val /= 1000;
		suffixIndex++;
	}

	return `${roundN(val, 2)} ${suffixes[suffixIndex]}`;
}
