import React, { useEffect } from "react";
import { gsap } from "gsap";

const Cursor = () => {
	useEffect(() => {
		// Select the cursor element
		const cursor = document.getElementById("primary-cursor");

		// Hide the default cursor
		document.body.style.cursor = "none";

		// Track mouse movement
		const mouseMoveHandler = (e) => {
			gsap.to(cursor, {
				x: e.clientX - cursor.offsetWidth / 3,
				y: e.clientY - cursor.offsetHeight / 4.5,
				duration: 0.1,
				ease: "power1.out",
			});
		};

		// Add event listener for mouse move
		document.addEventListener("mousemove", mouseMoveHandler);

		// Cleanup the event listener when the component unmounts
		return () => {
			document.removeEventListener("mousemove", mouseMoveHandler);
		};
	}, []);

	return <div id="primary-cursor"></div>;
};

export default Cursor;
