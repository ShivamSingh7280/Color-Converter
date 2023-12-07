import React, { useState } from "react";
import styles from "./HexToRgba.module.css";
import { FiCopy } from "react-icons/fi";
import {
	clickToCopy,
	isValidHexColor,
	showToast,
} from "../../helpers/helper-methods";

const HexToRgba = () => {
	const [hexValue, setHexValue] = useState("");
	const [rgbaValue, setRgbaValue] = useState("");
	const [backgroundColor, setBackgroundColor] = useState();

	const _handleInput = (e) => {
		const value = e?.target?.value;
		setHexValue(value);
	};

	const _handleConversion = () => {
		const hexColor = hexValue;
		const opacity = "1";

		if (!isValidHexColor(hexValue)) {
			showToast("warn", "Invalid HEX color. Please enter a valid HEX color.");
			return;
		}

		// Converting each Hex character pair into an integer ::
		const hexVal = hexColor?.substring(1);
		let red = "";
		let blue = "";
		let green = "";

		if (hexVal.length === 6) {
			red = parseInt(hexColor?.substring(1, 3), 16);
			green = parseInt(hexColor?.substring(3, 5), 16);
			blue = parseInt(hexColor?.substring(5, 7), 16);
		} else if (hexVal.length === 3) {
			red = parseInt(hexVal?.substring(0, 1), 16) * 17;
			green = parseInt(hexVal?.substring(1, 2), 16) * 17;
			blue = parseInt(hexVal?.substring(2, 3), 16) * 17;
		}

		console.log({ red, green, blue });
		// Concatenating into an RGBA format ::
		const rgba = `rgba(${red ? red : 0}, ${green ? green : 0} , ${
			blue ? blue : 0
		}, ${opacity})`;

		// Setting it into its state ::
		setRgbaValue(rgba);
		setBackgroundColor(rgba);
	};

	const _handleReset = () => {
		setHexValue("");
		setRgbaValue("");
		setBackgroundColor("");
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>
				<h2>RGBA to HEX Converter</h2>
				<button onClick={_handleReset}>RESET</button>
			</div>

			<div className={styles.content}>
				<input
					type="text"
					placeholder="HEX"
					value={hexValue}
					onChange={(e) => {
						_handleInput(e);
					}}
				/>

				<button onClick={_handleConversion}>Convert</button>

				<input
					type="text"
					placeholder="RGBA"
					value={rgbaValue}
					readOnly
					disabled
				/>

				<span
					className={styles.copyButton}
					onClick={() => clickToCopy(rgbaValue)}>
					<FiCopy className={styles.copyIcon} />
				</span>

				<div
					className={styles.colorContainer}
					style={{ backgroundColor: backgroundColor }}
				/>
			</div>
		</div>
	);
};

export default HexToRgba;
