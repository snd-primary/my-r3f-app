#version 300 es

/*
	精度修飾子(precision)
	浮動小数点数(float) の計算精度を指定する
	フラグメントシェーダでは、通常`mediump` か `highp` を指定することが必須。
*/
precision mediump float;

/**
 入力(in)
 頂点シェーダの`out`変数から保管された値を受け取る
 変数名を型を頂点シェーダの`out`と一致させる必要がある
*/
in vec4 v_color;

/*
	出力(out)
	このシェーダーが最終的に出力する色データ
*/
out vec4 outColor;


void main() {
	outColor = v_color;
}