import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import TransitionMaterial3 from "@/components/mesh-transition-material/MeshTransitionMaterial3";
import { useSnapshot } from "valtio";
import { state } from "@/lib/store";
import gsap from "gsap";

export function JaecooJ8Animated({
	transitionColor,
	currentAnimation,
	...props
}) {
	const group = React.useRef();
	const { nodes, materials, animations } = useGLTF("/J8_Model_Animated.glb");
	const { actions } = useAnimations(animations, group);
	const { doorsOpen, trunkOpen, modelLights, camPosition, autoplayModel } =
		useSnapshot(state);

	const glassMaterial = new THREE.MeshStandardMaterial({
		color: "#222222", // Set the base color to white or any desired color
		roughness: 0.3, // Low roughness for a shiny glass effect
		metalness: 0.1, // High metalness to simulate reflections
		transparent: true, // Enable transparency
		opacity: 0.5, // Set opacity (adjust as needed)
		transmission: 1.0, // Enables refraction for glass effect
		ior: 1.45, // Index of Refraction, typical for glass
		clearcoat: 1, // Optional: makes the material shinier, like polished glass
		clearcoatRoughness: 0.1, // Optional: adjust the shininess of the clear coat
		depthWrite: false, // Important for transparent objects to not write to depth buffer
		alphaTest: 0.1, // Helps with transparency sorting (try tweaking this value)
	});

	const rubberMaterial = new THREE.MeshStandardMaterial({
		color: "#111111", // Dark gray to resemble rubber
		roughness: 0.7, // High roughness for a rubber-like texture
		metalness: 0, // Rubber is non-metallic
		clearcoat: 0.1, // Optional: slight sheen to simulate rubber surface
		clearcoatRoughness: 0.3, // Low roughness for the clearcoat (subtle gloss)
	});

	useEffect(() => {
		const targetMesh1 = nodes["JAECOO_J80294"];
		const targetMesh2 = nodes["JAECOO_J80024"];

		console.log("modelLights", modelLights);

		// Apply emissive to targeted meshes
		if (targetMesh1 || targetMesh2) {
			targetMesh1.material.emissiveIntensity = modelLights ? 100 : 0;
			targetMesh1.material.emissive.set("#ff4f2b");
			targetMesh2.material.emissiveIntensity = modelLights ? 100 : 0;
			targetMesh2.material.emissive.set("#ff4f2b");
		}
	}, [nodes, modelLights]);

	// once actions object is ready, stash the clip names
	useEffect(() => {
		state.animationNames = Object.keys(actions);
	}, [actions]);

	// collect your door actions by name
	const doorActions = [
		actions["Door_GRP_1Action"],
		actions["Door_GRP_2Action"],
		actions["Door_GRP_3Action"],
		actions["Door_GRP_4Action"],
	].filter(Boolean); // filter out any that might be undefined

	const trunkActions = [
		actions["Trunk_GRPAction"], // Replace with the correct name of the trunk animation from the GLTF
	].filter(Boolean);

	useEffect(() => {
		if (doorActions.length === 0) return;

		// fade out any non–door animations (optional):
		Object.values(actions).forEach((a) =>
			doorActions.includes(a) ? null : a.fadeOut(0.2)
		);

		const speed = 5.0; // how fast you want it
		const direction = doorsOpen ? 1 : -1;
		const startTime = doorsOpen ? 0 : doorActions[0].getClip().duration;

		doorActions.forEach((action) => {
			action.reset();
			action.time = startTime; // start at 0 for opening; at end for closing
			action.setLoop(THREE.LoopOnce, 1); // play once
			action.clampWhenFinished = true; // hold at final frame
			action.timeScale = speed * direction; // positive = forward, negative = backward
			action.play();
			action.onFinished = () => (action.paused = true);
		});
	}, [doorsOpen, actions]);

	useEffect(() => {
		if (trunkActions.length === 0) return;

		// fade out any non–trunk animations (optional):
		Object.values(actions).forEach((a) =>
			trunkActions.includes(a) ? null : a.fadeOut(0.2)
		);

		const speed = 5.0; // adjust speed for trunk animation
		const direction = trunkOpen ? 1 : -1;
		const startTime = trunkOpen ? 0 : trunkActions[0].getClip().duration;

		trunkActions.forEach((action) => {
			action.reset();
			action.time = startTime; // start at 0 for opening; at end for closing
			action.setLoop(THREE.LoopOnce, 1); // play once
			action.clampWhenFinished = true; // hold at final frame
			action.timeScale = speed * direction; // positive = forward, negative = backward
			action.play();
			action.onFinished = () => (action.paused = true);
		});
	}, [trunkOpen, actions]);

	// ---------------------------------------------------------
	// #########################################################
	// #########################################################
	// #########################################################
	const [isRotating, setIsRotating] = useState(false);
	const carModel = useRef();

	useEffect(() => {
		if (camPosition === "back") {
			if (isRotating) return;
			setIsRotating(true);

			// console.log("carModel", carModel);

			state.autoplayModel = false;

			// GSAP animation to rotate the model on the Y-axis
			gsap.to(carModel.current.rotation, {
				z: 2, // Rotate 360 degrees (2*PI)
				duration: 1, // Duration of one full rotation in seconds
				ease: "none", // No easing for constant speed
			});
		}
	}, [camPosition]);

	// const [hovered, setHovered] = useState(false);
	// const [tooltipVisible, setTooltipVisible] = useState(false);
	// const tooltipRef = useRef();
	// const bulletRef = useRef();

	// // FLOATING ANIMATION: simple sine bob
	// useFrame((state) => {
	// 	if (bulletRef.current) {
	// 		const t = state.clock.getElapsedTime();
	// 		const baseY = 1; // same as initial Y
	// 		const amplitude = 0.05; // up/down distance
	// 		const speed = 2; // cycles/sec
	// 		bulletRef.current.position.y =
	// 			baseY + Math.sin(t * speed) * amplitude;
	// 	}
	// });

	// useEffect(() => {
	// 	if (tooltipVisible && tooltipRef.current) {
	// 		gsap.fromTo(
	// 			tooltipRef.current,
	// 			{ autoAlpha: 0, scale: 0 },
	// 			{ autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" }
	// 		);
	// 	}
	// }, [tooltipVisible]);
	// ---------------------------------------------------------
	// #########################################################
	// #########################################################
	// #########################################################
	// ---------------------------------------------------------

	return (
		<group ref={group} {...props} dispose={null}>
			<group name="Scene">
				{/* —– sphere bullet with hover tooltip —– */}
				{/* <mesh
					ref={bulletRef}
					position={[0.7, 0, 1.9]} // adjust to wherever you want it
					onClick={(e) => {
						e.stopPropagation();
						setTooltipVisible(true);
					}}
					onPointerEnter={() => {
						setHovered(true);
					}}
					onPointerLeave={() => {
						setHovered(false);
					}}
				>
					<sphereGeometry args={[0.04, 16, 16]} />
					<meshStandardMaterial
						color={hovered ? "#ff4f2b" : "#ffffff"}
						transparent
						opacity={0.6} // semi-transparent
						metalness={0.9} // very4etallic
						roughness={0.1} // lo1ughness → glossy
						clearcoat={1} // extra0.9shine
						clearcoatRoughness={0.1}
					/>
				</mesh> */}

				<group
					ref={carModel}
					name="Jaecoo_J8_GRP"
					rotation={[Math.PI / 2, 0, 0]}
					scale={0.45}
				>
					<group name="Door_GRP">
						<group name="Door_GRP_1" position={[1.9, 1.96, -1.64]}>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80253"
								geometry={nodes.JAECOO_J80253.geometry}
								material={materials.J8_Interior_SS}
								position={[-1.9, -1.96, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80256"
								geometry={nodes.JAECOO_J80256.geometry}
								material={materials.J8_Mirror_SS}
								position={[-1.9, -1.96, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80257"
								geometry={nodes.JAECOO_J80257.geometry}
								material={materials.J8_Ext_Black_SS}
								position={[-1.9, -1.96, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80262"
								geometry={nodes.JAECOO_J80262.geometry}
								// material={materials.J8_Glass_SS}
								material={glassMaterial}
								position={[-1.9, -1.96, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80263"
								geometry={nodes.JAECOO_J80263.geometry}
								material={materials.J8_Body_SS}
								position={[-1.9, -1.96, 1.64]}
							>
								<TransitionMaterial3
									roughness={0.38}
									metalness={1}
									clearcoat={0.9}
									clearcoatRoughness={0.1}
									transitionTime={0.4}
									transitionColor={transitionColor}
								/>
							</mesh>
						</group>
						<group name="Door_GRP_2" position={[-1.9, 1.96, -1.64]}>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80227"
								geometry={nodes.JAECOO_J80227.geometry}
								material={materials.J8_Body_SS}
								position={[1.9, -1.96, 1.64]}
							>
								<TransitionMaterial3
									roughness={0.38}
									metalness={1}
									clearcoat={0.9}
									clearcoatRoughness={0.1}
									transitionTime={0.4}
									transitionColor={transitionColor}
								/>
							</mesh>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80230"
								geometry={nodes.JAECOO_J80230.geometry}
								material={materials.J8_Mirror_SS}
								position={[1.9, -1.96, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80231"
								geometry={nodes.JAECOO_J80231.geometry}
								// material={materials.J8_Glass_SS}
								material={glassMaterial}
								position={[1.9, -1.96, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80236"
								geometry={nodes.JAECOO_J80236.geometry}
								material={materials.J8_Ext_Black_SS}
								position={[1.9, -1.96, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80239"
								geometry={nodes.JAECOO_J80239.geometry}
								material={materials.J8_Interior_SS}
								position={[1.9, -1.96, 1.64]}
							/>
						</group>
						<group
							name="Door_GRP_3"
							position={[1.87, -0.17, -1.64]}
						>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80270"
								geometry={nodes.JAECOO_J80270.geometry}
								material={materials.J8_Ext_Black_SS}
								position={[-1.87, 0.17, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80271"
								geometry={nodes.JAECOO_J80271.geometry}
								material={materials.J8_Body_SS}
								position={[-1.87, 0.17, 1.64]}
							>
								<TransitionMaterial3
									roughness={0.38}
									metalness={1}
									clearcoat={0.9}
									clearcoatRoughness={0.1}
									transitionTime={0.4}
									transitionColor={transitionColor}
								/>
							</mesh>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80273"
								geometry={nodes.JAECOO_J80273.geometry}
								// material={materials.J8_Glass_SS}
								material={glassMaterial}
								position={[-1.87, 0.17, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80277"
								geometry={nodes.JAECOO_J80277.geometry}
								material={materials.J8_Interior_SS}
								position={[-1.87, 0.17, 1.64]}
							/>
						</group>
						<group
							name="Door_GRP_4"
							position={[-1.87, -0.17, -1.64]}
						>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80242"
								geometry={nodes.JAECOO_J80242.geometry}
								material={materials.J8_Interior_SS}
								position={[1.87, 0.17, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80246"
								geometry={nodes.JAECOO_J80246.geometry}
								// material={materials.J8_Glass_SS}
								material={glassMaterial}
								position={[1.87, 0.17, 1.64]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80247"
								geometry={nodes.JAECOO_J80247.geometry}
								material={materials.J8_Body_SS}
								position={[1.87, 0.17, 1.64]}
							>
								<TransitionMaterial3
									roughness={0.38}
									metalness={1}
									clearcoat={0.9}
									clearcoatRoughness={0.1}
									transitionTime={0.4}
									transitionColor={transitionColor}
								/>
							</mesh>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80251"
								geometry={nodes.JAECOO_J80251.geometry}
								material={materials.J8_Ext_Black_SS}
								position={[1.87, 0.17, 1.64]}
							/>
						</group>
						<group name="Trunk_GRP" position={[0, -3.38, -3.24]}>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80288"
								geometry={nodes.JAECOO_J80288.geometry}
								material={materials.J8_Red_Reflector_SS}
								position={[0, 3.38, 3.24]}
							/>
							<group
								name="JAECOO_J80291"
								position={[0, 3.38, 3.24]}
							>
								<mesh
									castShadow
									receiveShadow
									name="Mesh195"
									geometry={nodes.Mesh195.geometry}
									material={materials.J8_Body_SS}
								>
									<TransitionMaterial3
										roughness={0.38}
										metalness={1}
										clearcoat={0.9}
										clearcoatRoughness={0.1}
										transitionTime={0.4}
										transitionColor={transitionColor}
									/>
								</mesh>
								<mesh
									castShadow
									receiveShadow
									name="Mesh195_1"
									geometry={nodes.Mesh195_1.geometry}
									material={materials.J8_Body_Black_SS}
								/>
							</group>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80293"
								geometry={nodes.JAECOO_J80293.geometry}
								// material={materials.J8_Glass_SS}
								material={glassMaterial}
								position={[0, 3.38, 3.24]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80294"
								geometry={nodes.JAECOO_J80294.geometry}
								material={materials.J8_Red_Light_SS}
								position={[0, 3.38, 3.24]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80301"
								geometry={nodes.JAECOO_J80301.geometry}
								material={materials.J8_Interior_SS}
								position={[0, 3.38, 3.24]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80307"
								geometry={nodes.JAECOO_J80307.geometry}
								material={materials.J8_Logo_Red_SS}
								position={[0, 3.38, 3.24]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80308"
								geometry={nodes.JAECOO_J80308.geometry}
								material={materials.J8_Ext_Black_SS}
								position={[0, 3.38, 3.24]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80309"
								geometry={nodes.JAECOO_J80309.geometry}
								material={materials.J8_Plate_SS}
								position={[0, 3.38, 3.24]}
							/>
						</group>
					</group>
					<group name="Rest_GRP">
						<group name="JAECOO_J80008">
							<mesh
								castShadow
								receiveShadow
								name="Mesh159"
								geometry={nodes.Mesh159.geometry}
								material={materials.J8_White_Light_SS}
							/>
							<mesh
								castShadow
								receiveShadow
								name="Mesh159_1"
								geometry={nodes.Mesh159_1.geometry}
								material={materials.J8_Red_Reflector_SS}
							/>
						</group>
						<mesh
							castShadow
							receiveShadow
							name="JAECOO_J80009"
							geometry={nodes.JAECOO_J80009.geometry}
							material={materials.J8_Headlight_Chrome_SS}
						/>
						<mesh
							castShadow
							receiveShadow
							name="JAECOO_J80012"
							geometry={nodes.JAECOO_J80012.geometry}
							material={materials.J8_Base_SS}
						/>
						<mesh
							castShadow
							receiveShadow
							name="JAECOO_J80022"
							geometry={nodes.JAECOO_J80022.geometry}
							// material={materials.J8_Glass_SS}
							material={glassMaterial}
						/>
						<mesh
							castShadow
							receiveShadow
							name="JAECOO_J80024"
							geometry={nodes.JAECOO_J80024.geometry}
							material={materials.J8_Red_Light_SS}
						/>
						<group name="JAECOO_J80029">
							<mesh
								castShadow
								receiveShadow
								name="Mesh169"
								geometry={nodes.Mesh169.geometry}
								material={materials.J8_Body_SS}
							>
								<TransitionMaterial3
									roughness={0.38}
									metalness={1}
									clearcoat={0.9}
									clearcoatRoughness={0.1}
									transitionTime={0.4}
									transitionColor={transitionColor}
								/>
							</mesh>
							<mesh
								castShadow
								receiveShadow
								name="Mesh169_1"
								geometry={nodes.Mesh169_1.geometry}
								material={materials.J8_Body_Black_SS}
							/>
						</group>
						<mesh
							castShadow
							receiveShadow
							name="JAECOO_J80043"
							geometry={nodes.JAECOO_J80043.geometry}
							material={materials.J8_Plate_SS}
						/>
						<mesh
							castShadow
							receiveShadow
							name="JAECOO_J80071"
							geometry={nodes.JAECOO_J80071.geometry}
							material={materials.J8_Chrome_SS}
						/>
						<mesh
							castShadow
							receiveShadow
							name="JAECOO_J80223"
							geometry={nodes.JAECOO_J80223.geometry}
							material={materials.J8_Mirror_SS}
						/>
						<mesh
							castShadow
							receiveShadow
							name="JAECOO_J80345"
							geometry={nodes.JAECOO_J80345.geometry}
							material={materials.J8_Interior_SS}
						/>
						<mesh
							castShadow
							receiveShadow
							name="JAECOO_J80351"
							geometry={nodes.JAECOO_J80351.geometry}
							material={materials.J8_Ext_Black_SS}
						/>
					</group>
					<group name="Wheel_GRP">
						<group
							name="Wheel_GRP_1"
							position={[1.636, 2.954, -0.774]}
						>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80314"
								geometry={nodes.JAECOO_J80314.geometry}
								material={materials.J8_Brake_SS}
								position={[-1.636, -2.954, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80315"
								geometry={nodes.JAECOO_J80315.geometry}
								material={materials.J8_Chrome_SS}
								position={[-1.636, -2.954, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80316"
								geometry={nodes.JAECOO_J80316.geometry}
								material={materials.J8_Ext_Black_SS}
								position={[-1.636, -2.954, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80318"
								geometry={nodes.JAECOO_J80318.geometry}
								// material={materials.J8_Wheel_SS}
								material={rubberMaterial}
								position={[-1.636, -2.954, 0.774]}
							/>
						</group>
						<group
							name="Wheel_GRP_2"
							position={[-1.636, 2.954, -0.774]}
						>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80327"
								geometry={nodes.JAECOO_J80327.geometry}
								material={materials.J8_Brake_SS}
								position={[1.636, -2.954, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80329"
								geometry={nodes.JAECOO_J80329.geometry}
								// material={materials.J8_Wheel_SS}
								material={rubberMaterial}
								position={[1.636, -2.954, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80331"
								geometry={nodes.JAECOO_J80331.geometry}
								material={materials.J8_Ext_Black_SS}
								position={[1.636, -2.954, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80332"
								geometry={nodes.JAECOO_J80332.geometry}
								material={materials.J8_Chrome_SS}
								position={[1.636, -2.954, 0.774]}
							/>
						</group>
						<group
							name="Wheel_GRP_3"
							position={[1.636, -2.631, -0.774]}
						>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80321"
								geometry={nodes.JAECOO_J80321.geometry}
								material={materials.J8_Brake_SS}
								position={[-1.636, 2.631, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80322"
								geometry={nodes.JAECOO_J80322.geometry}
								// material={materials.J8_Wheel_SS}
								material={rubberMaterial}
								position={[-1.636, 2.631, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80323"
								geometry={nodes.JAECOO_J80323.geometry}
								material={materials.J8_Chrome_SS}
								position={[-1.636, 2.631, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80324"
								geometry={nodes.JAECOO_J80324.geometry}
								material={materials.J8_Ext_Black_SS}
								position={[-1.636, 2.631, 0.774]}
							/>
						</group>
						<group
							name="Wheel_GRP_4"
							position={[-1.636, -2.631, -0.774]}
						>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80334"
								geometry={nodes.JAECOO_J80334.geometry}
								material={materials.J8_Brake_SS}
								position={[1.636, 2.631, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80336"
								geometry={nodes.JAECOO_J80336.geometry}
								// material={materials.J8_Wheel_SS}
								material={rubberMaterial}
								position={[1.636, 2.631, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80338"
								geometry={nodes.JAECOO_J80338.geometry}
								material={materials.J8_Ext_Black_SS}
								position={[1.636, 2.631, 0.774]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="JAECOO_J80339"
								geometry={nodes.JAECOO_J80339.geometry}
								material={materials.J8_Chrome_SS}
								position={[1.636, 2.631, 0.774]}
							/>
						</group>
					</group>
				</group>
				<group name="Lights_Target" position={[0, 1, 0]} />
			</group>
		</group>
	);
}

useGLTF.preload("/J8_Model_Animated.glb");
