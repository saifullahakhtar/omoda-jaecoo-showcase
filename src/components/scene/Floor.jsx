import { Circle, MeshReflectorMaterial } from "@react-three/drei";
export default function Floor() {
	return (
		<Circle
			args={[1, 16]}
			receiveShadow
			scale={100}
			rotation-x={-Math.PI / 2}
			position-y={0}
		>
			<MeshReflectorMaterial
				color={"gray"}
				envMapIntensity={0}
				blur={[512, 512]}
				mixBlur={1}
				mixStrength={3}
				mixContrast={1}
				resolution={1024}
				mirror={1}
				depthScale={1}
				minDepthThreshold={0.8}
				maxDepthThreshold={1}
				depthToBlurRatioBias={0.45}
				roughness={1}
			/>
		</Circle>
	);
}
