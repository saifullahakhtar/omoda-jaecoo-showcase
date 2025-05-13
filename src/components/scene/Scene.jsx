"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";

// Dependencies
import { Canvas } from "@react-three/fiber";
import { useSnapshot } from "valtio";

// Store
import { state } from "@/lib/store";

// Components
import Overlay from "@/components/overlay/Overlay";
import Effects from "./Effects";
import Floor from "./Floor";
// import Studio from "./Studio";
const DynamicStudio = dynamic(() => import("./Studio"), { ssr: false });
const DynamicJaecoo8 = dynamic(() => import("./models/Jaecoo8"), {
	ssr: false,
});

// 3D Model
// import { Jaecoo8 } from "./models/Jaecoo8";

function Scene() {
	const { selectedColor, isMobile, currentAnimation } = useSnapshot(state);
	const cameraRef = useRef();

	const [mouseHoldTimer, setMouseHoldTimer] = useState(null);

	useEffect(() => {
		const handleMouseDown = () => {
			setMouseHoldTimer(
				setTimeout(() => {
					state.orbitActive = true;
				}, 1000)
			);
		};

		const handleMouseUp = () => {
			if (mouseHoldTimer) {
				clearTimeout(mouseHoldTimer);
				setMouseHoldTimer(null);
			}
			state.orbitActive = false;
		};

		if (cameraRef.current) {
			cameraRef.current.addEventListener("mousedown", handleMouseDown);
			cameraRef.current.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			if (cameraRef.current) {
				cameraRef.current.removeEventListener(
					"mousedown",
					handleMouseDown
				);
				cameraRef.current.removeEventListener("mouseup", handleMouseUp);
			}
		};
	}, [mouseHoldTimer]);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Overlay />

			<Canvas
				shadows
				dpr={
					typeof window !== "undefined" ? window.devicePixelRatio : 1
				}
				gl={{
					preserveDrawingBuffer: true,
					failIfMajorPerformanceCaveat: false,
				}}
				camera={{ position: [5, 0.5, 7], fov: isMobile ? 45 : 25 }}
				ref={cameraRef}
			>
				<DynamicStudio />
				<DynamicJaecoo8
					transitionColor={selectedColor}
					currentAnimation={currentAnimation}
					cameraRef={cameraRef}
				/>
				{/* <Studio />
				<Jaecoo8
					transitionColor={selectedColor}
					currentAnimation={currentAnimation}
					cameraRef={cameraRef}
				/> */}
				<Floor />
				<Effects />
			</Canvas>
		</Suspense>
	);
}

export default Scene;
