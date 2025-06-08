import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css";

function App() {
	return (
		<>
			<Canvas camera={{ position: [3, 3, 3] }}>
				{/* アンビエントライト */}
				<ambientLight intensity={0.5} />

				{/* 平行光源 */}
				<directionalLight position={[3, 5, 2]} />

				{/* マウスで操作可能なカメラコントロール */}
				<OrbitControls />

				{/* 箱のメッシュ */}
				<Box>
					<meshStandardMaterial color="hotpink" />
				</Box>
			</Canvas>
		</>
	);
}

export default App;
