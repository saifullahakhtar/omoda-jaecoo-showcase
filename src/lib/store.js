import { proxy } from "valtio";

const state = proxy({
	colors: [
		// "#6C9CBC",
		// "#4c7180",
		// "#5f7a82",
		"#578592",

		"#757375",
		"#949ea7",
		"#c1c5c7",
		"#1c2124",
	],
	selectedColor: "#578592",
	animationNames: [],
	doorsOpen: false,
	trunkOpen: false,
	currentAnimation: null,
	autoplayModel: true,
	modelLights: false,
	camPosition: false,
	preLoading: 0,
	loadingProgress: 0,
	modelLoaded: false,
	orbitActive: false,
	isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
});

export { state };
