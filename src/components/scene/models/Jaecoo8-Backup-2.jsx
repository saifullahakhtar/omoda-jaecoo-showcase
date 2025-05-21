"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, SpotLight } from "@react-three/drei";
import * as THREE from "three";
import TransitionMaterial3 from "@/components/mesh-transition-material/MeshTransitionMaterial3";
import { useSnapshot } from "valtio";
import { state } from "@/lib/store";

export function Jaecoo8({ transitionColor, currentAnimation, ...props }) {
	const group = React.useRef();
	const { nodes, materials, animations } = useGLTF(
		"/optimized/Jaecoo8-Model-transformed.glb"
	);
	const { actions, mixer } = useAnimations(animations, group);

	const { doorsOpen, trunkOpen, modelLights, camPosition, autoplayModel } =
		useSnapshot(state);

	// 1) Clone once, and set up transparency on both reflector and head-glass
	useEffect(() => {
		if (!group.current) return;

		const lightNames = [
			// "JAECOO_J80007", // head-light glass
			"Head_Light", // head-light reflector
			// "Back_Light_Middle", // backlight 1
			// "Back_Light_Sides", // backlight 2
		];

		lightNames.forEach((n) => {
			const m = group.current.getObjectByName(n);
			if (!m) return;

			// clone the shared material
			m.material = m.material.clone();
			m.material.userData.isLightClone = true;

			// only on these two, enable transparency + additive glow
			if (n === "Head_Light") {
				m.material.transparent = true;
				m.material.depthWrite = false; // prevents z‐fighting with opaque geometry
				m.material.blending = THREE.AdditiveBlending;
				m.material.opacity = 0; // start fully off
			}
		});
	}, [nodes]);

	// 2) Toggle emissiveIntensity on all, and opacity on both reflector & head-glass
	useEffect(() => {
		if (!group.current) return;
		const intensityHead = modelLights ? 500 : 0;
		const intensityHeadGlass = modelLights ? 0.5 : 0;
		const intensityTail = modelLights ? 120 : 0;
		const alpha = modelLights ? 0.1 : 1;

		console.log("group.current", group.current);

		// helper to set emissive
		const setEmissive = (name, color, inten) => {
			const mesh = group.current.getObjectByName(name);
			if (!mesh?.material.userData.isLightClone) return;
			mesh.material.emissive.set(color);
			mesh.material.emissiveIntensity = inten;
		};

		// head glass + reflector
		// setEmissive("JAECOO_J80007", "#ffffff", intensityHeadGlass);
		setEmissive("Head_Light", "#ffffff", intensityHead);
		// backlights
		// setEmissive("Back_Light_Middle", "#ff4f2b", intensityTail);
		// setEmissive("Back_Light_Sides", "#ff4f2b", intensityTail);

		// now drive opacity on the two transparent clones
		["Head_Light"].forEach((n) => {
			const mesh = group.current.getObjectByName(n);
			if (mesh?.material.userData.isLightClone) {
				mesh.material.opacity = alpha;
			}
		});
	}, [modelLights]);

	// once actions object is ready, stash the clip names
	useEffect(() => {
		state.animationNames = Object.keys(actions);
	}, [actions]);

	// collect your door actions by name
	const doorActions = [
		actions["Door_1_GRPAction"],
		actions["Door_2_GRPAction"],
		actions["Door_3_GRPAction"],
		actions["Door_4_GRPAction"],
	].filter(Boolean); // filter out any that might be undefined

	const trunkActions = [
		actions["Trunk_GRP.001Action"], // Replace with the correct name of the trunk animation from the GLTF
	].filter(Boolean);

	// Doors
	useEffect(() => {
		if (!doorActions.length) return;
		const speed = 5.0;
		const direction = doorsOpen ? 1 : -1;
		const startTime = doorsOpen ? 0 : doorActions[0].getClip().duration;

		doorActions.forEach((action) => {
			action.reset();
			action.time = startTime;
			action.setLoop(THREE.LoopOnce, 1);
			action.clampWhenFinished = true;
			action.timeScale = speed * direction;
			action.play();
			action.onFinished = () => (action.paused = true);
		});
	}, [doorsOpen, actions]);

	// Trunk
	useEffect(() => {
		if (!trunkActions.length) return;
		const speed = 5.0;
		const direction = trunkOpen ? 1 : -1;
		const startTime = trunkOpen ? 0 : trunkActions[0].getClip().duration;

		trunkActions.forEach((action) => {
			action.reset();
			action.time = startTime;
			action.setLoop(THREE.LoopOnce, 1);
			action.clampWhenFinished = true;
			action.timeScale = speed * direction;
			action.play();
			action.onFinished = () => (action.paused = true);
		});
	}, [trunkOpen, actions]);

	// Spotlight
	const light = useRef();
	// useHelper(light, THREE.SpotLightHelper, "orange");

	const light2 = useRef();
	// useHelper(light2, THREE.SpotLightHelper, "orange");

	return (
		<>
			<group position={[0, 0, 0]}>
				<SpotLight
					ref={light}
					position={[0.7, 0.93, 1.9]} // Set starting position on the left side 1.85
					target-position={[0.7, 0.93, 1.9]}
					intensity={1}
					distance={15}
					angle={Math.PI / 10} // Adjust the angle (larger angle for a wider cone)
					penumbra={0}
					castShadow
					color={"#ffffff"}
					visible={modelLights}
					mapSize={[512, 512]}
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
					shadow-radius={8}
				/>

				<SpotLight
					ref={light2}
					position={[-0.7, 0.93, 1.9]} // Set starting position on the left side
					target-position={[-0.7, 0.93, 1.9]}
					intensity={1}
					distance={15}
					angle={Math.PI / 10} // Adjust the angle (larger angle for a wider cone)
					penumbra={0}
					castShadow
					color={"#ffffff"}
					visible={modelLights}
					mapSize={[512, 512]}
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
					shadow-radius={8}
				/>
			</group>

			<group ref={group} {...props} dispose={null} scale={1.2}>
				<group name="Scene">
					<group
						name="J8_GRP"
						rotation={[Math.PI / 2, 0, 0]}
						scale={0.4}
					>
						<group
							name="Door_1_GRP"
							position={[1.903, 1.964, -1.608]}
						>
							<mesh
								castShadow
								receiveShadow
								name="Door_Body_Left_Front"
								geometry={nodes.Door_Body_Left_Front.geometry}
								material={materials.PaletteMaterial001}
								position={[-4.763, -4.922, 4]}
							/>
							<group
								name="Door_Static_Left_Front"
								position={[-4.763, -4.922, 4]}
							>
								<mesh
									name="Mesh322"
									geometry={nodes.Mesh322.geometry}
									material={materials.PaletteMaterial003}
								/>
								<mesh
									name="Mesh322_1"
									geometry={nodes.Mesh322_1.geometry}
									material={materials.J8_Texture_5_SS}
								/>
								<mesh
									name="Mesh322_2"
									geometry={nodes.Mesh322_2.geometry}
									material={materials.PaletteMaterial004}
								/>
								<mesh
									name="Mesh322_3"
									geometry={nodes.Mesh322_3.geometry}
									material={materials.PaletteMaterial002}
								/>
							</group>
						</group>
						<group
							name="Door_2_GRP"
							position={[-1.899, 1.964, -1.608]}
						>
							<mesh
								castShadow
								receiveShadow
								name="Door_Body_Right_Front"
								geometry={nodes.Door_Body_Right_Front.geometry}
								material={materials.PaletteMaterial001}
								position={[4.763, -4.922, 4]}
							/>
							<group
								name="Door_Static_Right_Front"
								position={[4.763, -4.922, 4]}
							>
								<mesh
									name="Mesh344"
									geometry={nodes.Mesh344.geometry}
									material={materials.PaletteMaterial003}
								/>
								<mesh
									name="Mesh344_1"
									geometry={nodes.Mesh344_1.geometry}
									material={materials.PaletteMaterial004}
								/>
								<mesh
									name="Mesh344_2"
									geometry={nodes.Mesh344_2.geometry}
									material={materials.J8_Texture_5_SS}
								/>
								<mesh
									name="Mesh344_3"
									geometry={nodes.Mesh344_3.geometry}
									material={materials.PaletteMaterial002}
								/>
							</group>
						</group>
						<group
							name="Door_3_GRP"
							position={[1.886, -0.169, -1.608]}
						>
							<mesh
								castShadow
								receiveShadow
								name="Door_Body_Left_Back"
								geometry={nodes.Door_Body_Left_Back.geometry}
								material={materials.PaletteMaterial001}
								position={[-4.72, 0.424, 4]}
							/>
							<group
								name="Door_Static_Left_Back"
								position={[-4.72, 0.424, 4]}
							>
								<mesh
									name="Mesh361"
									geometry={nodes.Mesh361.geometry}
									material={materials.PaletteMaterial003}
								/>
								<mesh
									name="Mesh361_1"
									geometry={nodes.Mesh361_1.geometry}
									material={materials.PaletteMaterial004}
								/>
								<mesh
									name="Mesh361_2"
									geometry={nodes.Mesh361_2.geometry}
									material={materials.J8_Texture_5_SS}
								/>
								<mesh
									name="Mesh361_3"
									geometry={nodes.Mesh361_3.geometry}
									material={materials.PaletteMaterial002}
								/>
							</group>
						</group>
						<group
							name="Door_4_GRP"
							position={[-1.881, -0.169, -1.608]}
						>
							<mesh
								castShadow
								receiveShadow
								name="Door_Body_Right_Back"
								geometry={nodes.Door_Body_Right_Back.geometry}
								material={materials.PaletteMaterial001}
								position={[4.72, 0.424, 4]}
							/>
							<group
								name="Door_Static_Right_Back"
								position={[4.72, 0.424, 4]}
							>
								<mesh
									name="Mesh367"
									geometry={nodes.Mesh367.geometry}
									material={materials.PaletteMaterial004}
								/>
								<mesh
									name="Mesh367_1"
									geometry={nodes.Mesh367_1.geometry}
									material={materials.J8_Texture_5_SS}
								/>
								<mesh
									name="Mesh367_2"
									geometry={nodes.Mesh367_2.geometry}
									material={materials.PaletteMaterial003}
								/>
								<mesh
									name="Mesh367_3"
									geometry={nodes.Mesh367_3.geometry}
									material={materials.PaletteMaterial002}
								/>
							</group>
						</group>
						<group
							name="Trunk_GRP"
							position={[0.002, -3.385, -3.245]}
						>
							<mesh
								castShadow
								receiveShadow
								name="Back_Light_Middle"
								geometry={nodes.Back_Light_Middle.geometry}
								material={materials.PaletteMaterial002}
								position={[0, 3.385, 3.233]}
							/>
							<mesh
								castShadow
								receiveShadow
								name="Trunk_Body"
								geometry={nodes.Trunk_Body.geometry}
								material={materials.PaletteMaterial001}
								position={[0, 3.385, 3.233]}
							/>
							<group
								name="Trunk_Static"
								position={[0, 3.385, 3.233]}
							>
								<mesh
									name="Mesh379"
									geometry={nodes.Mesh379.geometry}
									material={materials["J8_Plate_SS.001"]}
								/>
								<mesh
									castShadow
									receiveShadow
									name="Mesh379_1"
									geometry={nodes.Mesh379_1.geometry}
									material={materials.PaletteMaterial003}
								/>
								<mesh
									name="Mesh379_2"
									geometry={nodes.Mesh379_2.geometry}
									material={materials.PaletteMaterial005}
								/>
								<mesh
									name="Mesh379_3"
									geometry={nodes.Mesh379_3.geometry}
									material={materials.J8_Reflector_1_SS}
								/>
								<mesh
									name="Mesh379_4"
									geometry={nodes.Mesh379_4.geometry}
									material={materials.PaletteMaterial004}
								/>
							</group>
						</group>
					</group>
					<mesh
						castShadow
						receiveShadow
						name="Back_Light_Sides"
						geometry={nodes.Back_Light_Sides.geometry}
						material={materials.PaletteMaterial002}
						position={[0.001, 0.005, 0]}
						rotation={[Math.PI / 2, 0, 0]}
						scale={0.16}
					/>
					<mesh
						castShadow
						receiveShadow
						name="Car_Body"
						geometry={nodes.Car_Body.geometry}
						material={materials.PaletteMaterial001}
						position={[0.001, 0.005, 0]}
						rotation={[Math.PI / 2, 0, 0]}
						scale={0.16}
					/>
					<group
						name="Car_Static"
						position={[0.001, 0.005, 0]}
						rotation={[Math.PI / 2, 0, 0]}
						scale={0.16}
					>
						<mesh
							castShadow
							receiveShadow
							name="Mesh318"
							geometry={nodes.Mesh318.geometry}
							material={materials.J8_Texture_1_SS}
						/>
						<mesh
							name="Mesh318_1"
							geometry={nodes.Mesh318_1.geometry}
							material={materials.PaletteMaterial005}
						/>
						<mesh
							castShadow
							receiveShadow
							name="Mesh318_2"
							geometry={nodes.Mesh318_2.geometry}
							material={materials.J8_Texture_2_SS}
						/>
						<mesh
							name="Mesh318_3"
							geometry={nodes.Mesh318_3.geometry}
							material={materials["J8_Plate_SS.001"]}
						/>
						<mesh
							name="Mesh318_4"
							geometry={nodes.Mesh318_4.geometry}
							material={materials.J8_Texture_4_SS}
						/>
						<mesh
							name="Mesh318_5"
							geometry={nodes.Mesh318_5.geometry}
							material={materials.J8_Black_4_SS}
						/>
						<mesh
							name="Mesh318_6"
							geometry={nodes.Mesh318_6.geometry}
							material={materials.J8_Texture_6_SS}
						/>
						<mesh
							name="Mesh318_7"
							geometry={nodes.Mesh318_7.geometry}
							material={materials.J8_Texture_3_SS}
						/>
						<mesh
							castShadow
							receiveShadow
							name="Mesh318_8"
							geometry={nodes.Mesh318_8.geometry}
							material={materials.PaletteMaterial003}
						/>
						<mesh
							name="Mesh318_9"
							geometry={nodes.Mesh318_9.geometry}
							material={materials.PaletteMaterial004}
						/>
						<mesh
							name="Mesh318_10"
							geometry={nodes.Mesh318_10.geometry}
							material={materials.PaletteMaterial006}
						/>
					</group>
					<mesh
						name="Rear_Lights"
						geometry={nodes.Rear_Lights.geometry}
						material={materials.J8_Reflector_1_SS}
						position={[0.001, 0.005, 0]}
						rotation={[Math.PI / 2, 0, 0]}
						scale={0.16}
					/>
					<mesh
						name="Wheel_1"
						geometry={nodes.Wheel_1.geometry}
						material={materials.PaletteMaterial007}
						rotation={[Math.PI / 2, 0, 0]}
						scale={0.4}
					/>
				</group>
			</group>
		</>
	);
}

useGLTF.preload("/optimized/Jaecoo8-Model-transformed.glb");
