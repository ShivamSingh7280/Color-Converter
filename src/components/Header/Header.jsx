import React from "react";
import styles from "./Header.module.css";
import { typesOfConverter } from "../../helpers/helper-config";

const Header = ({ value, onChangeHandler }) => {
	return (
		<div className={styles.header}>
			<div className={styles.logo}>Dev Converter</div>
			<div className={styles.dropdownBox}>
				<select
					value={value}
					onChange={(e) => {
						onChangeHandler(e);
					}}>
					{typesOfConverter?.map((each) => (
						<option key={each?.value} value={each?.value}>
							{each?.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Header;
