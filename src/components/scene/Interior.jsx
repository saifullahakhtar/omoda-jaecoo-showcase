"use client";

import React from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

// Import plugins
// import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
// import { CompassPlugin } from "@photo-sphere-viewer/compass-plugin";

// Import plugins stylesheets
// import "@photo-sphere-viewer/markers-plugin/index.css";
// import "@photo-sphere-viewer/compass-plugin/index.css";

export default function Interior() {
	const imgSrc = "/j8-interior-dark.jpg";
	// const plugins = [
	// 	[
	// 		MarkersPlugin,
	// 		{
	// 			markers: [
	// 				{
	// 					id: "image",
	// 					position: { yaw: "0.33deg", pitch: "0.1deg" },
	// 					image: "vercel.svg",
	// 					anchor: "bottom center",
	// 					size: { width: 128, height: 128 },
	// 					tooltip: "Marker Tooltip Test",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	[
	// 		CompassPlugin,
	// 		{
	// 			hotspots: [
	// 				{ yaw: "0deg" },
	// 				{ yaw: "90deg" },
	// 				{ yaw: "180deg" },
	// 				{ yaw: "270deg" },
	// 			],
	// 		},
	// 	],
	// ];

	return (
		<ReactPhotoSphereViewer
			src={imgSrc}
			height={"100vh"}
			width={"100%"}
			// plugins={plugins}
			defaultLat={Math.PI / 4} // 45° in radians
			defaultLong={Math.PI / 4} // 90° in radians
		/>
	);
}
