import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import TransitionMaterial3 from "@/components/mesh-transition-material/MeshTransitionMaterial3";
import { state } from "@/lib/store";

export function JaecooJ8({ transitionColor, currentAnimation, ...props }) {
	const group = React.useRef();
	const { nodes, materials, animations } = useGLTF(
		"/jaecoo-j8-transformed.glb"
	);
	const { actions } = useAnimations(animations, group);

	// —— global material tweaks ——
	// make the BordeauxRed paint perfectly glossy & transitionable
	materials["Carpaint Metallic 001 BordeauxRed 25cm"].roughness = 0;
	// tail-light glow
	materials["Retroreflector 02"].emissiveIntensity = 400;
	materials["Retroreflector 02"].emissive.set("#ff4f2b");
	// headlight glow
	materials["RS Incandescent"].emissiveIntensity = 20;
	materials["RS Incandescent"].emissive.set("#ffbd9b");

	// once actions object is ready, stash the clip names
	useEffect(() => {
		console.log(Object.keys(actions));

		state.animationNames = Object.keys(actions);
	}, [actions]);

	// 2) Whenever the `currentAnimation` prop changes, fade-out all and fade-in the new one
	useEffect(() => {
		if (currentAnimation && actions[currentAnimation]) {
			// fade out everything
			Object.values(actions).forEach((a) => a.fadeOut(0.2));
			// fade in & play the chosen clip
			actions[currentAnimation].reset().fadeIn(0.2).play();
		}
	}, [actions, currentAnimation]);

	return (
		<group
			ref={group}
			{...props}
			dispose={null}
			scale={0.035}
			position={[0, 0.35, 0]}
		>
			<group name="Scene">
				<group name="JAECOO_J8" scale={0.224}>
					<group
						name="BACK"
						position={[-0.566, 115.885, -177.641]}
						rotation={[0, 1.571, 0]}
					>
						<mesh
							name="JAECOO_J80282"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80282.geometry}
							material={materials[" Glass black"]}
							position={[23.726, -11.719, -0.027]}
						/>
						<mesh
							name="JAECOO_J80283"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80283.geometry}
							position={[61.831, -59.542, 0.001]}
						>
							<TransitionMaterial3
								roughness={0.25}
								metalness={0.25}
								clearcoat={1}
								clearcoatRoughness={0.05}
								transitionTime={0.4}
								transitionColor={transitionColor}
							/>
						</mesh>
						<mesh
							name="JAECOO_J80287"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80287.geometry}
							material={materials["Plastic Pattern"]}
							position={[40.436, -46.382, 0.008]}
						/>
						<mesh
							name="JAECOO_J80288"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80288.geometry}
							material={materials["Retroreflector 02"]}
							position={[48.244, -31.89, 0.016]}
						/>
						<mesh
							name="JAECOO_J80289"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80289.geometry}
							material={materials["Metal Screw Silver"]}
							position={[64.725, -55.763, 0.017]}
						/>
						<mesh
							name="JAECOO_J80293"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80293.geometry}
							material={materials["D Glass"]}
							position={[63.691, -49.145, 0]}
						/>
						<mesh
							name="JAECOO_J80299"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80299.geometry}
							material={materials["Metal Screw Silver"]}
							position={[66.15, -49.271, -1.186]}
							rotation={[-Math.PI / 2, 0.207, -Math.PI / 2]}
							scale={0.886}
						/>
						<mesh
							name="JAECOO_J80302"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80302.geometry}
							material={materials["Plastic Pattern"]}
							position={[56.235, -32.436, -0.342]}
							rotation={[-Math.PI / 2, -0.101, -Math.PI / 2]}
						/>
						<mesh
							name="JAECOO_J80309"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80309.geometry}
							material={materials["RS Standard.1"]}
							position={[66.134, -69.168, -0.042]}
						/>
					</group>

					<group
						name="Door-L-0"
						position={[94.793, 30.139, 90.259]}
						rotation={[0, 1.571, 0]}
					>
						<mesh
							name="JAECOO_J80252"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80252.geometry}
							material={materials["Metal Screw Silver"]}
							position={[13.693, 25.115, -1.538]}
						/>
						<mesh
							name="JAECOO_J80253"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80253.geometry}
							material={materials["Plastic Pattern"]}
							position={[39.245, 33.533, -20.634]}
							rotation={[3.006, 0.09, -2.658]}
						/>
						<mesh
							name="JAECOO_J80255"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80255.geometry}
							material={materials[" Glass black"]}
							position={[27.259, 51.854, -0.126]}
						/>
						<mesh
							name="JAECOO_J80256"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80256.geometry}
							material={materials["RS Standard.2"]}
							position={[34.556, 49.541, 0.68]}
						/>
						<mesh
							name="JAECOO_J80257"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80257.geometry}
							position={[24.046, 44.03, 0.761]}
						>
							<TransitionMaterial3
								roughness={0.25}
								metalness={0.25}
								clearcoat={1}
								clearcoatRoughness={0.05}
								transitionTime={0.4}
								transitionColor={transitionColor}
							/>
						</mesh>
						<mesh
							name="JAECOO_J80258"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80258.geometry}
							material={materials["Plastic Pattern"]}
							position={[45.022, 32.739, -20.29]}
						/>
					</group>

					<group
						name="Door-L-02"
						position={[92.923, 31.654, -16.652]}
						rotation={[0, 1.571, 0]}
					>
						<mesh
							name="JAECOO_J80268"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80268.geometry}
							material={materials["Plastic Pattern"]}
							position={[40.133, 32.939, -19.845]}
							rotation={[2.794, 0.04, -3.115]}
						/>
						<mesh
							name="JAECOO_J80270"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80270.geometry}
							material={materials[" Glass black"]}
							position={[51.365, 37.333, -14.578]}
						/>
						<mesh
							name="JAECOO_J80271"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80271.geometry}
							position={[51.416, 2.972, -9.856]}
						>
							<TransitionMaterial3
								roughness={0.25}
								metalness={0.25}
								clearcoat={1}
								clearcoatRoughness={0.05}
								transitionTime={0.4}
								transitionColor={transitionColor}
							/>
						</mesh>
						<mesh
							name="JAECOO_J80277"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80277.geometry}
							material={materials["Plastic Pattern"]}
							position={[27.641, 33.665, -20.221]}
							rotation={[2.935, 0.015, -3.125]}
						/>
					</group>

					<group
						name="Door-R-1"
						position={[-81.652, 47.229, -17.221]}
						rotation={[0, 1.571, 0]}
					>
						<mesh
							name="JAECOO_J80241"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80241.geometry}
							material={materials["Plastic Pattern"]}
							position={[50.63, 12.708, 6.096]}
						/>
						<mesh
							name="JAECOO_J80244"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80244.geometry}
							material={materials["Plastic Pattern"]}
							position={[27.071, 18.089, 7.819]}
							rotation={[-2.935, -0.015, 0.016]}
							scale={-1}
						/>
						<mesh
							name="JAECOO_J80246"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80246.geometry}
							material={materials[" Glass black"]}
							position={[50.783, 42.364, 6.442]}
						/>
						<mesh
							name="JAECOO_J80247"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80247.geometry}
							position={[48.575, -12.181, -10.646]}
						>
							<TransitionMaterial3
								roughness={0.25}
								metalness={0.25}
								clearcoat={1}
								clearcoatRoughness={0.05}
								transitionTime={0.4}
								transitionColor={transitionColor}
							/>
						</mesh>
					</group>

					<group
						name="Door-R-T-0"
						position={[-95.822, 30.139, 90.266]}
						rotation={[0, 1.571, 0]}
					>
						<mesh
							name="JAECOO_J80226"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80226.geometry}
							material={materials[" Glass black"]}
							position={[56.435, 34.056, 9.144]}
						/>
						<mesh
							name="JAECOO_J80227"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80227.geometry}
							position={[58.607, -1.882, 11.617]}
						>
							<TransitionMaterial3
								roughness={0.25}
								metalness={0.25}
								clearcoat={1}
								clearcoatRoughness={0.05}
								transitionTime={0.4}
								transitionColor={transitionColor}
							/>
						</mesh>
						<mesh
							name="JAECOO_J80230"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80230.geometry}
							material={materials["RS Standard.2"]}
							position={[34.577, 49.546, -0.803]}
						/>
						<mesh
							name="JAECOO_J80232"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80232.geometry}
							material={materials["Plastic Pattern"]}
							position={[55.741, 5.338, 20.739]}
						/>
						<mesh
							name="JAECOO_J80233"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80233.geometry}
							material={materials["Metal Screw Silver"]}
							position={[13.701, 25.115, 1.435]}
						/>
						<mesh
							name="JAECOO_J80238"
							castShadow
							receiveShadow
							geometry={nodes.JAECOO_J80238.geometry}
							material={materials["Plastic Pattern"]}
							position={[36.731, 30.658, 20.34]}
							rotation={[-3.06, -0.078, 0.006]}
							scale={-1}
						/>
					</group>
				</group>

				{/* standalone meshes */}
				<mesh
					name="JAECOO_J80017"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80017.geometry}
					material={materials["Plastic Pattern"]}
					position={[0.121, 9.901, -6.421]}
					rotation={[0, Math.PI / 2, 0]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80050"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80050.geometry}
					material={materials["Plastic Pattern"]}
					position={[12.989, 10.932, 13.529]}
					rotation={[2.967, -0.024, 3.137]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80001"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80001.geometry}
					material={materials[" Glass black"]}
					position={[-0.127, 20.331, 17.11]}
					rotation={[0, Math.PI / 2, 0]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80002"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80002.geometry}
					position={[-0.127, 25.54, -22.751]}
					rotation={[0, Math.PI / 2, 0]}
					scale={0.224}
				>
					<TransitionMaterial3
						roughness={0.25}
						metalness={0.25}
						clearcoat={1}
						clearcoatRoughness={0.05}
						transitionTime={0.4}
						transitionColor={transitionColor}
					/>
				</mesh>
				<mesh
					name="JAECOO_J80007"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80007.geometry}
					material={materials["D Glass"]}
					position={[-0.127, 11.702, 44.893]}
					rotation={[0, Math.PI / 2, 0]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80008001"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80008001.geometry}
					material={materials["RS Incandescent"]}
					position={[14.519, 10.962, 44.603]}
					rotation={[0, Math.PI / 2, 0]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80008027"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80008027.geometry}
					material={materials["Retroreflector 02"]}
					position={[15.785, 4.708, -53.186]}
					rotation={[0, Math.PI / 2, 0]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80009"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80009.geometry}
					material={materials["Metal Screw Silver"]}
					position={[-0.127, 10.816, 43.241]}
					rotation={[0, Math.PI / 2, 0]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80013"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80013.geometry}
					material={nodes.JAECOO_J80013.material}
					position={[-0.127, 14.081, -48.528]}
					rotation={[0, Math.PI / 2, 0]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80043"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80043.geometry}
					material={materials["RS Standard.1"]}
					position={[-0.149, 1.534, 52.048]}
					rotation={[0, Math.PI / 2, 0]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80305"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80305.geometry}
					material={materials["Metal Screw Silver"]}
					position={[13.703, 8.09, -53.534]}
					rotation={[-2.783, 0.229, 3.057]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80313"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80313.geometry}
					material={materials["Steel Dark 02"]}
					position={[18.933, -0.967, 34.294]}
					rotation={[-Math.PI / 2, 0, 0]}
					scale={0.224}
				/>
				<mesh
					name="JAECOO_J80318"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80318.geometry}
					material={materials["D Rubber"]}
					position={[18.252, -1.784, 31.337]}
					rotation={[-Math.PI / 2, 0, -Math.PI]}
					scale={[-0.195, 0.224, 0.224]}
				/>
				<mesh
					name="JAECOO_J80319"
					castShadow
					receiveShadow
					geometry={nodes.JAECOO_J80319.geometry}
					material={materials["RS Standard"]}
					position={[18.958, -1.784, -31.402]}
					rotation={[-Math.PI / 2, 0, 0]}
					scale={0.224}
				/>
			</group>
		</group>
	);
}

useGLTF.preload("/jaecoo-j8-transformed.glb");
