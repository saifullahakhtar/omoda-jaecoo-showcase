"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Lottie from "react-lottie-player";
import { useProgress } from "@react-three/drei";

import loadingLottieJson from "@/components/lottie/loading-progress.json";

const SceneNoSSR = dynamic(() => import("@/components/scene/Scene"), {
	ssr: false,
	loading: () => null,
});

import lottieJson from "@/components/lottie/rotate.json";

const Home = () => {
	const [isLandscape, setIsLandscape] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { progress } = useProgress();

	const checkOrientation = () => {
		if (window.innerWidth > window.innerHeight) {
			setIsLandscape(true);
		} else {
			setIsLandscape(false);
		}
	};

	useEffect(() => {
		// Check orientation when the component mounts
		if (typeof window !== "undefined") {
			checkOrientation();
			window.addEventListener("resize", checkOrientation);

			// Cleanup the event listener when the component unmounts
			return () => {
				window.removeEventListener("resize", checkOrientation);
			};
		}
	}, []);

	useEffect(() => {
		if (progress === 100) {
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	}, [progress]);

	return (
		<main className="h-screen w-screen">
			{!isLandscape ? (
				<div className="grid place-content-center p-8 h-screen w-screen">
					<Lottie
						loop
						animationData={lottieJson}
						play
						style={{ width: 200, height: 200 }}
					/>
				</div>
			) : (
				<>
					{isLoading && (
						<div className="fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center bg-black">
							<div className="text-center">
								<Lottie
									loop
									animationData={loadingLottieJson}
									play
									style={{ width: 150, height: 150 }}
								/>
							</div>
							<p className="fixed bottom-5 lg:bottom-8 right-5 lg:right-8 text-xl lg:text-4xl uppercase font-normal italic text-white z-50">
								{Math.round(progress)}%
							</p>
						</div>
					)}
					<SceneNoSSR />
				</>
			)}
		</main>
	);
};

export default Home;
