import { OrbitControls } from "@react-three/drei";
import { extend, Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

import vertexShader from "./shaders/shader.vert?raw";
import fragmentShader from "./shaders/shader.frag?raw";

const CustomShaderMaterial = shaderMaterial(
	{
		time: { value: 0.0 },
		baseColor: { value: new THREE.Color(0xffa500) },
	},
	vertexShader,
	fragmentShader
);

extend({ CustomShaderMaterial });

// 型定義 (TypeScriptでpropsなどを安全に扱うため)
type CustomShaderMaterialImpl = {
	time: number;
	baseColor: THREE.Color;
} & THREE.ShaderMaterial;

export const ShaderMesh = () => {
	const materialRef = useRef<CustomShaderMaterialImpl>(null!);

	// useFrameを使って毎フレーム実行する処理
	useFrame((state) => {
		// 経過時間をuniform変数 'time' に渡す
		if (materialRef.current) {
			materialRef.current.time = state.clock.getElapsedTime();
		}
	});

	return (
		<mesh>
			<boxGeometry args={[2, 2, 2]} />
			{/* extendしたマテリアルをJSXタグとして使用 */}
			<customShaderMaterial ref={materialRef} glslVersion={THREE.GLSL3} />
		</mesh>
	);
};

/* const AnimatedMesh: React.FC = () => {
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame(({ clock }) => {
		if (meshRef.current) {
			meshRef.current.position.x = Math.sin(clock.getElapsedTime()) * 2;
		}
	});

	return (
		<mesh ref={meshRef}>
			<cylinderGeometry args={[1, 1, 2, 32]} />
			<meshStandardMaterial color="orange" />
		</mesh>
	);
}; */

const App: React.FC = () => {
	return (
		<Canvas camera={{ position: [5, 5, 5] }}>
			<ambientLight intensity={0.5} />
			<directionalLight position={[2, 5, 3]} intensity={1} />
			<OrbitControls />
			<axesHelper args={[5]} />
			<ShaderMesh />
			{/* <AnimatedMesh /> */}
		</Canvas>
	);
};

export default App;
