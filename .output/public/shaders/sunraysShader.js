export const sunraysShader = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uTexelSize;
  uniform float uWeight;

  #define ITERATIONS 16

  void main() {
    float Density = 0.3;
    float Decay = 0.95;
    float Exposure = 0.7;
    float Weight = 6.0;
    float Clamp = 1.0;

    vec2 coord = vUv;
    vec2 dir = vUv - 0.5;
    dir *= 1.0 / float(ITERATIONS) * Density;
    float illuminationDecay = 1.0;

    float color = texture2D(uTexture, vUv).a;

    for (int i = 0; i < ITERATIONS; i++) {
      coord -= dir;
      float col = texture2D(uTexture, coord).a;
      color += col * illuminationDecay * Weight;
      illuminationDecay *= Decay;
    }

    color *= Exposure;
    color = min(color, Clamp);
    gl_FragColor = vec4(color * uWeight);
  }
`;
