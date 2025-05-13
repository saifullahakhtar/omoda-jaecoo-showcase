"use client";

import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Flashlight = () => {
	const [isOn, setIsOn] = useState(true);
	const flashlightRef = useRef();

	return (
		<div>
			<Canvas className="min-h-[80vh] w-screen">
				{/* Spot Light (Flashlight Beam) */}
				<spotLight
					ref={flashlightRef}
					position={[0, 0, 5]} // The spotlight starts at the cube's position
					angle={0.3} // Spread of the flashlight beam
					penumbra={1}
					intensity={isOn ? 3 : 0} // Toggle intensity based on the flashlight state
					castShadow
					target={flashlightRef.current} // Spotlight points to the cube
				/>

				{/* Ambient Light (for general scene visibility) */}
				<ambientLight intensity={0.4} />

				{/* Cube representing the Flashlight body */}
				<mesh
					ref={flashlightRef}
					position={[0, 0, 5]} // Position of the flashlight body
					castShadow
				>
					<boxGeometry args={[1, 1, 3]} />
					<meshStandardMaterial color="gray" />
				</mesh>

				{/* Floor to catch shadows */}
				<mesh position={[0, -2, 0]} receiveShadow>
					<planeGeometry args={[100, 100]} />
					<meshStandardMaterial color="lightgray" />
				</mesh>

				{/* Controls for rotating and zooming the camera */}
				<OrbitControls />
			</Canvas>

			{/* Button to toggle flashlight */}
			<button onClick={() => setIsOn((prev) => !prev)}>
				{isOn ? "Turn Off Flashlight" : "Turn On Flashlight"}
			</button>
		</div>
	);
};

export default Flashlight;
