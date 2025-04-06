export const bloomShader = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uTexture;
  uniform vec2 uTexelSize;
  uniform float uStrength;

  void main() {
    vec4 sum = vec4(0.0);
    sum += texture2D(uTexture, vL) * 0.204164;
    sum += texture2D(uTexture, vR) * 0.204164;
    sum += texture2D(uTexture, vT) * 0.204164;
    sum += texture2D(uTexture, vB) * 0.204164;
    sum += texture2D(uTexture, vUv) * 0.183344;
    gl_FragColor = sum * uStrength;
  }
`;
