/** @format */

"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
	OrbitControls,
	Environment,
	Float,
	Html,
	useTexture,
} from "@react-three/drei";

type Property3DViewerProps = {
	modelUrl?: string;
	className?: string;
};

function Property3DImage() {
	// Load a cool image from the images folder
	const texture = useTexture("/images/unsplash-9991f1c4c750.jpg");

	return (
		<Float
			speed={0.8}
			rotationIntensity={0.2}
			floatIntensity={0.4}>
			<mesh
				position={[0, 0, 0]}
				rotation={[0, 0, 0]}
				castShadow
				receiveShadow>
				<boxGeometry args={[4.8, 3.6, 0.2]} />
				<meshStandardMaterial
					map={texture}
					metalness={0.3}
					roughness={0.4}
				/>
			</mesh>
		</Float>
	);
}

function BackgroundPlane() {
	// load hero.avif from public folder
	const texture = useTexture("/hero.avif");

	return (
		<mesh
			position={[0, 0, -6]}
			rotation={[0, 0, 0]}>
			<planeGeometry args={[24, 14]} />
			<meshBasicMaterial
				map={texture}
				toneMapped={false}
				transparent
				opacity={0.9}
			/>
		</mesh>
	);
}

export function Property3DViewer({ className }: Property3DViewerProps) {
	return (
		<div className={className}>
			<Canvas
				shadows
				camera={{ position: [4, 3, 6], fov: 45 }}>
				<color
					attach="background"
					args={["#f9fafb"]}
				/>
				<fog
					attach="fog"
					args={["#e5e7eb", 12, 28]}
				/>

				{/* Lights */}
				<ambientLight intensity={0.3} />
				<directionalLight
					intensity={1.2}
					position={[5, 8, 5]}
					castShadow
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
				/>
				<spotLight
					intensity={0.7}
					position={[-6, 8, -4]}
					angle={0.5}
					penumbra={0.4}
					color="#22d3ee"
				/>

				<Suspense
					fallback={
						<Html center>
							<div className="px-3 py-1.5 rounded-full bg-slate-900/80 text-[11px] text-slate-200 border border-slate-700/60">
								Loading 3D scene…
							</div>
						</Html>
					}>
					{/* Cool Real Estate Image rendered as 3D */}
					<Property3DImage />
					<Environment preset="city" />
				</Suspense>

				<OrbitControls
					enablePan={false}
					maxPolarAngle={Math.PI / 2.1}
					minDistance={5}
					maxDistance={12}
				/>
			</Canvas>
		</div>
	);
}
