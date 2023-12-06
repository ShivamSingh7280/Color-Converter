import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HexToRgba from "../HexToRgba/HexToRgba";
import RgbaToHex from "../RgbaToHex/RgbaToHex";

const Converter = () => {
	const [converter, setConverter] = useState("hexToRgba");

	const _handleChange = (e) => {
		const value = e?.target?.value;
		setConverter(value);
	};

	const _renderSelectedConverter = (selectedConverter) => {
		switch (selectedConverter) {
			case "hexToRgba": {
				return <HexToRgba />;
			}

			case "rgbaToHex": {
				return <RgbaToHex />;
			}

			default: {
				return <HexToRgba />;
			}
		}
	};

	return (
		<>
			<Header value={converter} onChangeHandler={_handleChange} />

			{_renderSelectedConverter(converter)}

			<Footer />
		</>
	);
};

export default Converter;
