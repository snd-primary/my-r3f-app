/// <reference types="vite/client" />

// ↓↓↓ この部分を追記 ↓↓↓
declare module "*.vert?raw" {
	const content: string;
	export default content;
}

declare module "*.frag?raw" {
	const content: string;
	export default content;
}
// ↑↑↑ ここまで追記 ↑↑↑
