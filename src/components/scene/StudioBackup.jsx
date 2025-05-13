import { useEffect, useRef, useState } from "react";
import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
} from "@react-three/drei";
import { useSnapshot } from "valtio";
import gsap from "gsap";
import * as THREE from "three";

// Store
import { state } from "@/lib/store";
import { useThree } from "@react-three/fiber";

export default function Studio() {
	const { autoplayModel, camPosition } = useSnapshot(state);

	const cameraDefault = useRef();
	const cameraBack = useRef();
	const { camera, gl } = useThree(); // Access current camera and renderer
	const [rotation, setRotation] = useState(new THREE.Vector3(2, 0, 0));

	useEffect(() => {
		// Animate smooth transition of camera position and rotation
		let targetPosition = new THREE.Vector3();
		let targetRotation = new THREE.Euler();

		// Determine the target position and rotation based on camPosition
		if (camPosition === "back") {
			targetPosition.set(4, 4, -24); // Adjusted position for back camera
			targetRotation.set(0, Math.PI / 4, 0); // Adjusted rotation for the back camera
		} else {
			targetPosition.set(2, 2, 8); // Adjusted position for the default camera (moved it back)
			targetRotation.set(0, 0, 0); // Default rotation
		}

		// Animate the camera position and rotation smoothly using gsap
		gsap.to(camera.position, {
			duration: 1, // Transition duration (in seconds)
			x: targetPosition.x,
			y: targetPosition.y,
			z: targetPosition.z,
			ease: "power3.inOut", // Smooth easing
		});

		gsap.to(camera.rotation, {
			duration: 1,
			x: targetRotation.x,
			y: targetRotation.y,
			z: targetRotation.z,
			ease: "power3.inOut", // Smooth easing
		});

		// Update the projection matrix after the transition
		camera.updateProjectionMatrix();
	}, [camPosition, camera]); // Re-run when camPosition changes

	return (
		<>
			<color attach="background" args={["#1c1c1c"]} />
			<fog attach="fog" args={["#1c1c1c", 5, 20]} />
			<OrbitControls
				// ref={cameraDefault}
				minDistance={6}
				maxDistance={10}
				autoRotate={autoplayModel}
				autoRotateSpeed={-0.45}
				target={[0, 0.5, 0]}
				minPolarAngle={1.3}
				maxPolarAngle={Math.PI / 2}
				enablePan={false}
			/>

			{/* <PerspectiveCamera
				ref={cameraBack}
				makeDefault
				fov={38}
				near={0.1}
				far={1000}
				position={[1, 1, 1]}
				rotation={[0, 0, 0]}
				// position={cameraPositions.default} // Default camera position
			/>

			<PerspectiveCamera
				ref={cameraBack}
				fov={15}
				near={0.1}
				far={1000}
				position={[4, 4, -24]}
				// position={cameraPositions.default} // Default camera position
			/> */}

			<PerspectiveCamera
				ref={cameraDefault}
				fov={50} // Increased FOV to make the camera less zoomed-in
				near={0.1}
				far={1000}
				position={[2, 2, 8]} // Moved the camera back to give it more space
				rotation={[0, 0, 0]}
			/>

			{/* Back camera */}
			<PerspectiveCamera
				ref={cameraBack}
				fov={50} // Adjusted FOV for the back camera
				near={0.1}
				far={1000}
				position={[4, 4, -24]} // Back camera position
			/>

			<directionalLight
				position={[-2, 2, 1]}
				castShadow
				shadow-mapSize-width={256}
				intensity={4}
				shadow-bias={-0.0001}
			/>

			<Environment
				background={false} // ← makes it the scene background
				path="/cubemap/" // ← folder under public
				files={[
					"px.png",
					"nx.png",
					"py.png",
					"ny.png",
					"pz.png",
					"nz.png",
				]}
				blur={0} // optional
				resolution={1024} // optional
				environmentIntensity={1}
			/>
		</>
	);
}
