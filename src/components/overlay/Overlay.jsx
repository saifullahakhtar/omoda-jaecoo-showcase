"use client";

import { useRef } from "react";
import Image from "next/image";

import { state } from "@/lib/store";
import { useSnapshot } from "valtio";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./style.css";

export default function Overlay() {
	const snap = useSnapshot(state);
	const {
		colors,
		selectedColor,
		doorsOpen,
		trunkOpen,
		modelLights,
		autoplayModel,
		orbitActive,
	} = snap;

	const overlay = useRef();

	const toggleDoors = () => {
		state.doorsOpen = !doorsOpen;
	};

	const toggleTrunk = () => {
		state.trunkOpen = !trunkOpen;
	};

	const toggleModelLights = () => {
		state.modelLights = !modelLights;
	};

	const toggleRotation = () => {
		state.autoplayModel = !autoplayModel;
	};

	const toggleCamera = () => {
		state.camPosition = "back";
	};

	useGSAP(
		() => {
			if (orbitActive) {
				gsap.timeline()
					.to(
						"#header",
						{
							translateY: "-180%",
							opacity: 0,
							duration: 0.5,
						},
						"hide"
					)
					.to(
						"#sidebar",
						{
							translateX: "100%",
							opacity: 0,
							duration: 0.5,
						},
						"hide"
					)
					.to(
						"#navbar",
						{
							translateY: "180%",
							opacity: 0,
							duration: 0.5,
						},
						"hide"
					);
			} else {
				gsap.timeline()
					.to(
						"#header",
						{
							translateY: "0%",
							opacity: 1,
							duration: 0.5,
						},
						"show"
					)
					.to(
						"#sidebar",
						{
							translateX: "0%",
							opacity: 1,
							duration: 0.5,
						},
						"show"
					)
					.to(
						"#navbar",
						{
							translateY: "0%",
							opacity: 1,
							duration: 0.5,
						},
						"show"
					);
			}
		},
		{ scope: overlay, dependencies: [orbitActive] }
	);

	return (
		<div className="overlay-wrapper" ref={overlay}>
			<header
				id="header"
				className="fixed top-3 lg:top-8 left-0 px-10 grid grid-cols-3 content-center w-screen"
			>
				<div className="flex items-center">
					<Image
						src={"/oj-logo.webp"}
						width={400}
						height={100}
						alt=""
						className="w-6/12"
					/>
				</div>

				<div className="w-fit button-default backdrop-blur-sm backdrop-brightness-110 rounded-full p-1 mx-auto pointer-events-auto">
					<button className="bg-white text-black rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer">
						Exterior
					</button>
					<button className="text-white px-3 text-xs font-medium cursor-not-allowed">
						Interior
					</button>
				</div>

				<button className="flex items-center justify-end text-xs space-x-2 pointer-events-auto">
					<a
						href="https://icon-ad.com"
						target="_blank"
						className="translate-y-0.5 uppercase flex items-center space-x-1.5 no-underline"
					>
						<span>Powered by</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 27 7.71"
							className="h-2.5 w-fit fill-white translate-y-[-1px]"
						>
							<g>
								<path d="M1.83 7.71H0V0h1.83ZM6.5 5.84a2 2 0 0 1 0-4 2 2 0 0 1 1.73 1h1.95a3.86 3.86 0 1 0 0 1.86H8.23A2 2 0 0 1 6.5 5.84M27 3.73a3.74 3.74 0 0 0-7.47 0v4h1.83V3.77a1.91 1.91 0 1 1 3.81 0v3.94H27Zm-10.2.13a2 2 0 1 0-2 2 2 2 0 0 0 2-2m1.84.06A3.85 3.85 0 1 1 14.79 0a3.85 3.85 0 0 1 3.85 3.92"></path>
							</g>
						</svg>
					</a>
					<span className="text-base translate-y-[2px] opacity-50">
						©
					</span>
				</button>
			</header>

			<nav
				id="navbar"
				className="flex justify-center items-center space-x-8 w-full fixed bottom-3 lg:bottom-8 left-0 px-10"
			>
				<div className="flex items-center space-x-2 w-fit">
					<button
						onClick={toggleModelLights}
						className={` cursor-pointer button-default backdrop-blur-sm backdrop-brightness-110 text-black px-4 py-3 z-10 rounded-sm shadow-lg hover:shadow-xl border hover:border-white/40 pointer-events-auto flex items-center space-x-4 ${
							modelLights
								? "border-white/40"
								: "border-transparent"
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="#ffffff"
							className="size-4 lg:size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
							/>
						</svg>
					</button>

					<button
						onClick={toggleRotation}
						className={`cursor-pointer button-default backdrop-blur-sm backdrop-brightness-110 text-black px-4 py-3 z-10 rounded-sm shadow-lg hover:shadow-xl border hover:border-white/40 pointer-events-auto flex items-center space-x-4 ${
							autoplayModel
								? "border-white/40"
								: "border-transparent"
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="#ffffff"
							className="size-4 lg:size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</button>
				</div>

				<ul className="flex items-center justify-center w-fit">
					{colors.map((color) => (
						<li
							key={color}
							style={{
								"--color": color,
							}}
							className={
								selectedColor === color ? "selected" : ""
							}
							onClick={() => (state.selectedColor = color)}
						></li>
					))}
				</ul>

				<div className="flex items-center space-x-2 w-fit">
					<button
						onClick={toggleDoors}
						className={` cursor-pointer button-default backdrop-blur-sm backdrop-brightness-110 text-black px-4 py-3 z-10 rounded-sm shadow-lg hover:shadow-xl border hover:border-white/40 pointer-events-auto flex items-center space-x-4 ${
							doorsOpen ? "border-white/40" : "border-transparent"
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							version="1.0"
							viewBox="0 0 100 100"
							id="Cardoor"
							className="size-4 lg:size-6"
						>
							<path
								d="M48.477 16.667c-5.501 0-13.014 3.346-16.692 7.435L12.937 45.045c-2.454 2.725-3.6 7.826-2.545 11.342l6.168 20.56c1.052 3.512 4.916 6.387 8.584 6.387h58.189A6.665 6.665 0 0 0 90 76.667v-60H48.477zM83.333 60H70v-6.667h13.333V60zm0-13.334H20.444l16.295-18.104c2.422-2.689 8.125-5.229 11.738-5.229h34.856v23.333z"
								fill="#ffffff"
								className="color000000 svgShape"
							></path>
						</svg>
					</button>

					<button
						onClick={toggleTrunk}
						className={`cursor-pointer button-default backdrop-blur-sm backdrop-brightness-110 text-black px-4 py-3 z-10 rounded-sm shadow-lg hover:shadow-xl border hover:border-white/40 pointer-events-auto flex items-center space-x-4 ${
							trunkOpen ? "border-white/40" : "border-transparent"
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							enableBackground="new 0 0 24 24"
							viewBox="0 0 24 24"
							id="baggage"
							className="size-4 lg:size-6"
						>
							<path
								fill="#ffffff"
								id="Layer_2"
								d="M21.22,6.02l-9-2C12.15,4.01,12.07,4,12,4H3v2h8.53l0.83,1H11c-0.2,0-0.39,0.06-0.55,0.17L7.7,9H3v8h2.03
								c0.03,0.36,0.11,0.69,0.23,0.99C5.88,19.79,7.58,21,9.5,21s3.62-1.21,4.22-2.97c0.13-0.33,0.21-0.67,0.25-1.03H15
								c0.16,0,0.31-0.04,0.45-0.11l2-1C17.79,15.72,18,15.38,18,15v-4c0-0.23-0.08-0.46-0.23-0.64l-3.12-3.74l6.13,1.36
								C20.86,7.99,20.93,8,21,8c0.46,0,0.87-0.32,0.98-0.78C22.1,6.68,21.76,6.14,21.22,6.02z M11.84,17.34C11.5,18.33,10.56,19,9.5,19
								s-2-0.67-2.36-1.69C7.05,17.06,7,16.79,7,16.5C7,15.12,8.12,14,9.5,14s2.5,1.12,2.5,2.5C12,16.79,11.95,17.06,11.84,17.34z"
							></path>
						</svg>
					</button>
				</div>
			</nav>

			<div
				id="sidebar"
				className="fixed top-0 right-0 w-2/12 h-screen grid justify-end content-center px-10 z-50 gap-2 lg:gap-4 bg-transparent"
			>
				<button className="pointer-events-auto bg-black/20 backdrop-blur-lg backdrop-brightness-110 rounded-md py-3 px-2 cursor-not-allowed group scale-90">
					<Image
						src={"/j7-view.webp"}
						width={100}
						height={80}
						className="grayscale opacity-50"
						alt=""
					/>
					<p className="text-white text-[10px] uppercase mt-1 h-0 group-hover:h-[12px] ease-in-out duration-500 overflow-hidden text-center">
						Jaecoo J7
					</p>
				</button>
				<button className="pointer-events-auto button-default backdrop-blur-sm backdrop-brightness-110 rounded-md py-3 px-2 cursor-pointer group">
					<Image
						src={"/j8-view.webp"}
						width={100}
						height={80}
						alt=""
					/>
					<p className="text-white text-[10px] uppercase mt-1 h-0 group-hover:h-[12px] ease-in-out duration-500 overflow-hidden text-center">
						Jaecoo J8
					</p>
				</button>
				<button className="pointer-events-auto bg-black/20 backdrop-blur-lg backdrop-brightness-110 rounded-md py-3 px-2 cursor-not-allowed group scale-90">
					<Image
						src={"/c5-view.webp"}
						width={100}
						height={80}
						className="grayscale"
						alt=""
					/>
					<p className="text-white text-[10px] uppercase mt-1 h-0 group-hover:h-[12px] ease-in-out duration-500 overflow-hidden text-center">
						C5
					</p>
				</button>
			</div>

			<div className="fixed top-0 left-0 w-screen bg-gradient-to-b from-black/30 to-transparent z-0 h-20"></div>
			<div className="fixed bottom-0 left-0 w-screen bg-gradient-to-b from-transparent to-black/30 z-0 h-20"></div>
		</div>
	);
}
