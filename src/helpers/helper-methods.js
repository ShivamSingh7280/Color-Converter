import { toast } from "react-toastify";

export const clickToCopy = (value) => {
	if (!value) {
		return;
	}

	navigator.clipboard
		.writeText(value)
		.then(() => {
			showToast("success", "Text copied to clipboard", value);
		})
		.catch((error) => {
			console.log("Unable to copy text to clipboard", error);
		});
};

export const isValidHexColor = (hexColor) => {
	if (!hexColor?.length) return false;

	const value = hexColor.toLowerCase();

	if (value.length <= 7) {
		const hexChars = value?.split("");

		if (hexChars[0] !== "#") return false;

		hexChars.shift();

		if (hexChars?.length % 3 === 0 && hexChars?.length <= 6) {
			let invalidChar = hexChars?.find((each) => !Number(+each) && each > "f");
			return invalidChar ? false : true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

export const isValidRgbaColor = (red, green, blue, alpha) => {
	const redColor = !red ? 255 : red;
	const greenColor = !green ? 255 : green;
	const blueColor = !blue ? 255 : blue;
	const alphaColor = !alpha ? 1 : alpha;

	const _isValidRange = (value) => {
		if (value >= 0 && value <= 255) {
			return true;
		} else {
			return false;
		}
	};

	const _isValidAlpha = (value) => {
		const numericValue = +value;

		if (numericValue >= 0 && numericValue <= 1) {
			return true;
		} else {
			return false;
		}
	};

	const _isValid = (r, g, b, a) => {
		if (
			_isValidRange(r) &&
			_isValidRange(g) &&
			_isValidRange(b) &&
			_isValidAlpha(a)
		) {
			return true;
		} else {
			return false;
		}
	};

	const result = _isValid(redColor, greenColor, blueColor, alphaColor);
	return result;
};

export const showToast = (type, message) => {
	switch (type) {
		case "warn": {
			toast.warn(message?.trim());
			break;
		}

		case "error": {
			toast.error(message?.trim());
			break;
		}

		case "success": {
			toast.success(message?.trim());
			break;
		}

		default: {
			toast(message?.trim());
			break;
		}
	}
};
