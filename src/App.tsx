import { useRef, useLayoutEffect, type FC } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

// GSAPとScrollTriggerプラグインをインポート
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAPにScrollTriggerプラグインを登録
gsap.registerPlugin(ScrollTrigger);

const Scene: FC = () => {
	// 回転させたいオブジェクト（円筒）への参照を作成
	const meshRef = useRef<THREE.Mesh>(null!);

	// useLayoutEffectを使ってアニメーションを設定
	useLayoutEffect(() => {
		// GSAPのタイムラインを作成
		const tl = gsap.timeline({
			// ScrollTriggerの設定
			scrollTrigger: {
				trigger: ".scroll-container", // スクロールのトリガーとなる要素
				start: "top top", // トリガーの上端が、画面の上端に来たら開始
				end: "bottom bottom", // トリガーの下端が、画面の下端に来たら終了
				scrub: true, // スクロールとアニメーションを滑らかに同期させる
			},
		});

		// アニメーションを定義：円筒のY軸周りの回転
		tl.to(meshRef.current.rotation, {
			y: Math.PI * 2, // 1回転
			x: Math.PI * 2, // さらにもう1軸回転させると複雑な動きになる
			duration: 1, // scrub:trueの場合、durationは全体の進行度に対する比率になる
		});

		// コンポーネントがアンマウントされる際にScrollTriggerをクリーンアップ
		return () => {
			tl.kill();
		};
	}, []); // 空の依存配列で、初回レンダリング後に一度だけ実行

	// ライトやヘルパーのロジックは簡略化のため一旦コメントアウトします
	// const keyLightRef = useRef<THREE.DirectionalLight>(null!);
	// useHelper(keyLightRef, THREE.DirectionalLightHelper, 1, 'red');

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight
				// ref={keyLightRef}
				position={[4, 4, 4]}
				intensity={3.0}
			/>

			{/* 回転させるオブジェクトにrefを渡す */}
			<mesh ref={meshRef} position={[0, 0, 0]}>
				<cylinderGeometry args={[1, 1, 2, 32]} />
				<meshStandardMaterial color="#7B68EE" metalness={0.8} roughness={0.1} />
			</mesh>
		</>
	);
};

const App: FC = () => {
	return (
		// CSSで設定したクラス名を適用
		<div className="canvas-container">
			<Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
				<Scene />
			</Canvas>
		</div>
	);
};

// HTML部分をレンダリングするために、Appの外にコンテンツを追加
// 実際にはindex.tsxやmain.tsxでこの構造をレンダリングします
const RootApp: FC = () => {
	return (
		<>
			<App />
			<div className="scroll-container">asd;faj</div>
		</>
	);
};

export default RootApp;
