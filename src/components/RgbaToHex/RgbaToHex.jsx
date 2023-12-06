import React, { useState } from "react";
import styles from "./RgbaToHex.module.css";
import { FiCopy } from "react-icons/fi";
import {
	clickToCopy,
	isValidRgbaColor,
	showToast,
} from "../../helpers/helper-methods";

const RgbaToHex = () => {
	const [rgbaValue, setRgbaValue] = useState({
		red: "",
		green: "",
		blue: "",
		alpha: "",
	});
	const [hexValue, setHexValue] = useState("");
	const [backgroundColor, setBackgroundColor] = useState("");

	const _handleInput = (e, key) => {
		const value = e?.target?.value;

		const newRgbaValue = { ...rgbaValue };
		newRgbaValue[key] = value;
		setRgbaValue({ ...newRgbaValue });
	};

	// Conversion Logic Begins ::

	const _hexConversion = (color) => {
		const hex = Math.floor(color)?.toString(16);

		if (hex.length === 1) {
			return "0" + hex;
		} else {
			return hex;
		}
	};

	const _mixedWithAlpha = (c, a) => {
		const alpha = a ? a : 1;
		const color = c ? c : 0;
		return color * alpha + 255 * (1 - alpha);
	};

	const _rgbaToRgbConversion = (r, g, b, a) => {
		return [
			_mixedWithAlpha(r, a),
			_mixedWithAlpha(g, a),
			_mixedWithAlpha(b, a),
		];
	};

	const _handleConversion = () => {
		const { red, green, blue, alpha } = rgbaValue;

		const rValue = parseInt(red);
		const gValue = parseInt(green);
		const bValue = parseInt(blue);
		const aValue = alpha;

		if (!isValidRgbaColor(rValue, gValue, bValue, aValue)) {
			showToast("warn", "Invalid RGBA color. Please enter a valid RGBA color.");
			return;
		}

		const [r, g, b] = _rgbaToRgbConversion(rValue, gValue, bValue, aValue);

		const color = `#${_hexConversion(Math.round(r))}${_hexConversion(
			Math.round(g)
		)}${_hexConversion(Math.round(b))}`;

		setHexValue(color);
		setBackgroundColor(color);
	};

	const _handleReset = () => {
		setRgbaValue({
			red: "",
			green: "",
			blue: "",
			alpha: "",
		});
		setHexValue("");
		setBackgroundColor("");
	};

	const { red, green, blue, alpha } = rgbaValue;

	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>
				<h2>RGBA to HEX Converter</h2>
				<button onClick={_handleReset}>RESET</button>
			</div>
			<div className={styles.content}>
				<div className={styles.inputContent}>
					<input
						type="number"
						min="0"
						max="255"
						step="1"
						value={red}
						placeholder="RED"
						onChange={(e) => {
							_handleInput(e, "red");
						}}
					/>

					<input
						type="number"
						min="0"
						max="255"
						step="1"
						value={green}
						placeholder="GREEN"
						onChange={(e) => {
							_handleInput(e, "green");
						}}
					/>

					<input
						type="number"
						min="0"
						max="255"
						step="1"
						value={blue}
						placeholder="BLUE"
						onChange={(e) => {
							_handleInput(e, "blue");
						}}
					/>

					<input
						type="number"
						min="0"
						max="1"
						step="0.1"
						value={alpha}
						placeholder="ALPHA"
						onChange={(e) => {
							_handleInput(e, "alpha");
						}}
					/>
				</div>

				<button onClick={_handleConversion}>Convert</button>

				<input
					type="text"
					placeholder="HEX"
					value={hexValue}
					readOnly
					disabled
				/>

				<span
					className={styles.copyButton}
					onClick={() => clickToCopy(hexValue)}>
					<FiCopy className={styles.copyIcon} />
				</span>

				<div
					className={styles.colorContainer}
					style={{ backgroundColor: backgroundColor }}></div>
			</div>
		</div>
	);
};

export default RgbaToHex;
