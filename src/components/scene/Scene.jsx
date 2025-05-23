"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";

// Dependencies
import { Canvas } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { Perf } from "r3f-perf";
import { PerformanceMonitor } from "@react-three/drei";

// Store
import { state } from "@/lib/store";

// Components
import Overlay from "@/components/overlay/Overlay";
import Effects from "./Effects";
import Floor from "./Floor";
import Studio from "./Studio";

// 3D Model
import { Jaecoo8 } from "./models/Jaecoo8";

function Scene() {
	const { selectedColor, isMobile, currentAnimation } = useSnapshot(state);
	const cameraRef = useRef();

	const [mouseHoldTimer, setMouseHoldTimer] = useState(null);
	const [dpr, setDpr] = useState(1);

	useEffect(() => {
		const handleMouseDown = () => {
			// Set a timer to change orbitActive after 1 second
			setMouseHoldTimer(
				setTimeout(() => {
					state.orbitActive = true;
				}, 1000)
			); // 1000ms = 1 second
		};

		const handleMouseUp = () => {
			// Clear the timer and set orbitActive to false
			if (mouseHoldTimer) {
				clearTimeout(mouseHoldTimer);
				setMouseHoldTimer(null);
			}
			state.orbitActive = false;
		};

		if (cameraRef.current) {
			// Add event listeners for mouse down and mouse up
			cameraRef.current.addEventListener("mousedown", handleMouseDown);
			cameraRef.current.addEventListener("mouseup", handleMouseUp);
		}

		// Cleanup event listeners on component unmount
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
				dpr={dpr}
				// dpr={
				// 	typeof window !== "undefined" ? window.devicePixelRatio : 1
				// }
				gl={{
					preserveDrawingBuffer: true,
					failIfMajorPerformanceCaveat: false,
				}}
				camera={{ position: [5, 0.5, 7], fov: isMobile ? 45 : 25 }}
				ref={cameraRef}
			>
				{/* <Perf position="top-left" showGraph /> */}
				<PerformanceMonitor
					onIncline={() => setDpr(2)}
					onDecline={() => setDpr(1)}
				>
					<Studio />
					<Jaecoo8
						transitionColor={selectedColor}
						currentAnimation={currentAnimation}
						cameraRef={cameraRef}
					/>
					<Floor />
					<Effects />
				</PerformanceMonitor>
			</Canvas>
		</Suspense>
	);
}

export default Scene;
