#version 300 es

/*
*入力(in)
JS側からバッファオブジェクトを通じて受け取る頂点ごとのデータ
*/
in vec3 a_position;
in vec4 a_color;


/*
	JS側からすべての頂点で共通して使用するデータ
	モデル・ビュー・プロジェクション行列などが代表例

	これが座標変換行列
*/
uniform mat4 u_mvpMatrix;


/*
 出力(out)
 フラグメントシェーダにわたすデータ
 このデータはラスタライズ中に補間される
*/
out vec4 v_color;

void main() {
	//座標変換行列を適用し、最終的な頂点位置を gl_Position に設定する（必須）
	gl_Position = u_mvpMatrix * vec4(a_position, 1.0);	
	v_color = a_color;
}