import { useRef } from "react";
import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
} from "@react-three/drei";
import { useSnapshot } from "valtio";

// Store
import { state } from "@/lib/store";

export default function Studio() {
	const { autoplayModel } = useSnapshot(state);

	const cameraRef = useRef();
	const controlsRef = useRef();

	return (
		<>
			<color attach="background" args={["#1c1c1c"]} />
			<fog attach="fog" args={["#1c1c1c", 5, 20]} />
			<OrbitControls
				makeDefault
				ref={controlsRef}
				minDistance={6}
				maxDistance={10}
				autoRotate={autoplayModel}
				autoRotateSpeed={-0.45}
				target={[0, 0.5, 0]}
				minPolarAngle={1.3}
				maxPolarAngle={Math.PI / 2}
				enablePan={false}
			/>

			<PerspectiveCamera
				ref={cameraRef}
				makeDefault
				fov={38}
				near={0.1}
				far={1000}
				position={[1, 1, 1]}
				rotation={[0, 0, 0]}
			/>

			<directionalLight
				position={[-2, 2, 1]}
				castShadow
				shadow-mapSize-width={256}
				intensity={5}
				shadow-bias={-0.0001}
			/>

			<Environment
				background={false} // ← makes it the scene background
				path="/cubemap/" // ← folder under public
				// path="/environmentMaps/5/" // ← folder under public
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
				environmentIntensity={0.8}
			/>
		</>
	);
}
