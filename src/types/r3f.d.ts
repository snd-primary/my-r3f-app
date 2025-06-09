// src/types/r3f.d.ts

import type { MaterialNode } from "@react-three/fiber";
import type * as THREE from "three";

// 以前のコードで定義したカスタムマテリアルの型
// 必要であれば、実際のファイルからインポートしてください
// import type { CustomShaderMaterialImpl } from '../components/ShaderMesh';
type CustomShaderMaterialImpl = {
	time?: number; // JSXのpropsとして渡すためオプショナルにしておくと便利
	baseColor?: THREE.Color;
} & THREE.ShaderMaterial;

// @react-three/fiber モジュールの型定義を拡張
declare module "@react-three/fiber" {
	interface ThreeElements {
		// ここに 'customShaderMaterial' を追加する
		customShaderMaterial: MaterialNode<
			CustomShaderMaterialImpl,
			typeof THREE.ShaderMaterial
		>;
	}
}
