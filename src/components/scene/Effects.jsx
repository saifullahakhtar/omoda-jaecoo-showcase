import {
	Bloom,
	DepthOfField,
	EffectComposer,
	HueSaturation,
	SMAA,
	Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Effects() {
	return (
		<EffectComposer>
			<SMAA />
			<Bloom
				mipmapBlur
				luminanceThreshold={0.9}
				levels={9}
				intensity={0.15}
				radius={0.9}
				luminanceSmoothing={0}
			/>
			{/* <HueSaturation
				blendFunction={BlendFunction.COLOR_DODGE} // blend mode
				hue={0} // hue in radians
				saturation={0} // saturation in radians
			/>
			<DepthOfField
				focusDistance={0} // where to focus
				focalLength={0.02} // focal length
				bokehScale={2} // bokeh size
			/> */}
			<Bloom
				mipmapBlur
				radius={0.5}
				luminanceThreshold={0.3}
				levels={4}
				intensity={0.2}
			/>
			<Vignette offset={0.5} darkness={0.4} />
		</EffectComposer>
	);
}
