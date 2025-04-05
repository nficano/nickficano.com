export const displayShader = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uBloom;
  uniform float uDithering;
  uniform vec3 uColor;
  uniform vec2 uTexelSize;

  #define SCALE 3.0
  #define MAGIC_GRID_SIZE 64.0

  float random(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec4 color = texture2D(uTexture, vUv);
    vec3 bloom = color.rgb * uBloom;
    vec3 finalColor = color.rgb + bloom;

    if (uDithering > 0.0) {
      vec2 gridPos = floor(gl_FragCoord.xy / MAGIC_GRID_SIZE);
      float noise = random(gridPos) * 0.1;
      finalColor += noise;
    }

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
