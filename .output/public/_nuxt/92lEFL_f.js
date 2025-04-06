import xe from"./D7JvydTn.js";import{r as k,a as Te,o as Re,e as Ee,v as Se,x as ye,A as De,y as _e,J as Ae}from"./OqDIy3Ss.js";import"./RDW3_yZM.js";import"./DlAUqK2U.js";const Fe=128,be=1440,Ue=3.5,we=2,Pe=.1,Le=20,Be=3,Ce=.2,$=6e3,ze=10,Xe={__name:"Mobile",setup(Ge){const f=k(null),K=k(0);let z=null,e=null,x=null,m,l,G,M,y,O=Date.now(),C=0,B,b,T,v,U,w,R,_,A,d,g=null;const{$fluid:P}=Te();function q(r){console.log("Attempting to get WebGL context...");const i={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let t=r.getContext("webgl2",i);const o=!!t;console.log("WebGL2 supported:",o),o||(console.log("Falling back to WebGL1..."),t=r.getContext("webgl",i)||r.getContext("experimental-webgl",i));let n,u;o?(t.getExtension("EXT_color_buffer_float"),u=t.getExtension("OES_texture_float_linear")):(n=t.getExtension("OES_texture_half_float"),u=t.getExtension("OES_texture_half_float_linear")),t.clearColor(0,0,0,1);const a=o?t.HALF_FLOAT:n&&n.HALF_FLOAT_OES;let s,c,h;return o?(s=D(t,t.RGBA16F,t.RGBA,a),c=D(t,t.RG16F,t.RG,a),h=D(t,t.R16F,t.RED,a)):(s=D(t,t.RGBA,t.RGBA,a),c=D(t,t.RGBA,t.RGBA,a),h=D(t,t.RGBA,t.RGBA,a)),{gl:t,ext:{formatRGBA:s,formatRG:c,formatR:h,halfFloatTexType:a,supportLinearFiltering:u}}}function D(r,i,t,o){if(!J(r,i,t,o))switch(i){case r.R16F:return D(r,r.RG16F,r.RG,o);case r.RG16F:return D(r,r.RGBA16F,r.RGBA,o);default:return null}return{internalFormat:i,format:t}}function J(r,i,t,o){const n=r.createTexture();r.bindTexture(r.TEXTURE_2D,n),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,r.NEAREST),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),r.texImage2D(r.TEXTURE_2D,0,i,4,4,0,t,o,null);const u=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,u),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,n,0),r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE}function j(){let r=V(Fe),i=V(be);const t=x.halfFloatTexType,o=x.formatRGBA,n=x.formatRG,u=x.formatR,a=x.supportLinearFiltering?e.LINEAR:e.NEAREST;e.disable(e.BLEND),m?m=X(m,i.width,i.height,o.internalFormat,o.format,t,a):m=N(i.width,i.height,o.internalFormat,o.format,t,a),l?l=X(l,r.width,r.height,n.internalFormat,n.format,t,a):l=N(r.width,r.height,n.internalFormat,n.format,t,a),G=L(r.width,r.height,u.internalFormat,u.format,t,e.NEAREST),M=L(r.width,r.height,u.internalFormat,u.format,t,e.NEAREST),y=N(r.width,r.height,u.internalFormat,u.format,t,e.NEAREST)}function L(r,i,t,o,n,u){e.activeTexture(e.TEXTURE0);let a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,t,r,i,0,o,n,null);let s=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),e.viewport(0,0,r,i),e.clear(e.COLOR_BUFFER_BIT);let c=1/r,h=1/i;return{texture:a,fbo:s,width:r,height:i,texelSizeX:c,texelSizeY:h,attach(S){return e.activeTexture(e.TEXTURE0+S),e.bindTexture(e.TEXTURE_2D,a),S}}}function N(r,i,t,o,n,u){let a=L(r,i,t,o,n,u),s=L(r,i,t,o,n,u);return{width:r,height:i,texelSizeX:a.texelSizeX,texelSizeY:a.texelSizeY,get read(){return a},set read(c){a=c},get write(){return s},set write(c){s=c},swap(){let c=a;a=s,s=c}}}function Q(r,i,t,o,n,u,a){let s=L(i,t,o,n,u,a);return B.bind(),e.uniform1i(B.uniforms.uTexture,r.attach(0)),g(s),s}function X(r,i,t,o,n,u,a){return r.width===i&&r.height===t||(r.read=Q(r.read,i,t,o,n,u,a),r.write=L(i,t,o,n,u,a),r.width=i,r.height=t,r.texelSizeX=1/i,r.texelSizeY=1/t),r}function V(r){let i=e.drawingBufferWidth/e.drawingBufferHeight;i<1&&(i=1/i);const t=Math.round(r),o=Math.round(r*i);return e.drawingBufferWidth>e.drawingBufferHeight?{width:o,height:t}:{width:t,height:o}}function Z(r){C+=r*ze,C>=1&&(C=te(C,0,1),P.pointers.forEach(i=>{i.color=ee()}))}function ee(){let r=re(Math.random(),1,1);return r.r*=.15,r.g*=.15,r.b*=.15,r}function re(r,i,t){let o,n,u,a,s,c,h,S;switch(a=Math.floor(r*6),s=r*6-a,c=t*(1-i),h=t*(1-s*i),S=t*(1-(1-s)*i),a%6){case 0:o=t,n=S,u=c;break;case 1:o=h,n=t,u=c;break;case 2:o=c,n=t,u=S;break;case 3:o=c,n=h,u=t;break;case 4:o=S,n=c,u=t;break;case 5:o=t,n=c,u=h;break}return{r:o,g:n,b:u}}function te(r,i,t){const o=t-i;return(r-i)%o+i}function ie(){let r=Date.now(),i=(r-O)/1e3;return i=Math.min(i,.016666),O=r,i}function oe(r){let i=r.deltaX*$,t=r.deltaY*$;ne(r.texcoordX,r.texcoordY,i,t,r.color)}function ne(r,i,t,o,n){T.bind(),e.uniform1i(T.uniforms.uTarget,l.read.attach(0)),e.uniform1f(T.uniforms.aspectRatio,f.value.width/f.value.height),e.uniform2f(T.uniforms.point,r,i),e.uniform3f(T.uniforms.color,t,o,0),e.uniform1f(T.uniforms.radius,ae(Ce/100)),g(l.write),l.swap(),e.uniform1i(T.uniforms.uTarget,m.read.attach(0)),e.uniform3f(T.uniforms.color,n.r,n.g,n.b),g(m.write),m.swap()}function ae(r){let i=f.value.width/f.value.height;return i>1&&(r*=i),r}function le(){P.pointers.forEach(r=>{r.moved&&(r.moved=!1,oe(r))})}function ue(r){if(!e){console.error("WebGL context not available");return}if(e.disable(e.BLEND),!w||!w.program){console.error("Curl program not initialized");return}if(w.bind(),e.uniform2f(w.uniforms.texelSize,l.texelSizeX,l.texelSizeY),e.uniform1i(w.uniforms.uVelocity,l.read.attach(0)),g(M),!R||!R.program){console.error("Vorticity program not initialized");return}if(R.bind(),e.uniform2f(R.uniforms.texelSize,l.texelSizeX,l.texelSizeY),e.uniform1i(R.uniforms.uVelocity,l.read.attach(0)),e.uniform1i(R.uniforms.uCurl,M.attach(1)),e.uniform1f(R.uniforms.curl,Be),e.uniform1f(R.uniforms.dt,r),g(l.write),l.swap(),!U||!U.program){console.error("Divergence program not initialized");return}if(U.bind(),e.uniform2f(U.uniforms.texelSize,l.texelSizeX,l.texelSizeY),e.uniform1i(U.uniforms.uVelocity,l.read.attach(0)),g(G),!b||!b.program){console.error("Clear program not initialized");return}if(b.bind(),e.uniform1i(b.uniforms.uTexture,y.read.attach(0)),e.uniform1f(b.uniforms.value,Pe),g(y.write),y.swap(),!_||!_.program){console.error("Pressure program not initialized");return}_.bind(),e.uniform2f(_.uniforms.texelSize,l.texelSizeX,l.texelSizeY),e.uniform1i(_.uniforms.uDivergence,G.attach(0));for(let t=0;t<Le;t++)e.uniform1i(_.uniforms.uPressure,y.read.attach(1)),g(y.write),y.swap();if(!A||!A.program){console.error("Gradient subtract program not initialized");return}if(A.bind(),e.uniform2f(A.uniforms.texelSize,l.texelSizeX,l.texelSizeY),e.uniform1i(A.uniforms.uPressure,y.read.attach(0)),e.uniform1i(A.uniforms.uVelocity,l.read.attach(1)),g(l.write),l.swap(),!v||!v.program){console.error("Advection program not initialized");return}v.bind(),e.uniform2f(v.uniforms.texelSize,l.texelSizeX,l.texelSizeY),x.supportLinearFiltering||e.uniform2f(v.uniforms.dyeTexelSize,l.texelSizeX,l.texelSizeY);let i=l.read.attach(0);e.uniform1i(v.uniforms.uVelocity,i),e.uniform1i(v.uniforms.uSource,i),e.uniform1f(v.uniforms.dt,r),e.uniform1f(v.uniforms.dissipation,we),g(l.write),l.swap(),x.supportLinearFiltering||e.uniform2f(v.uniforms.dyeTexelSize,m.texelSizeX,m.texelSizeY),e.uniform1i(v.uniforms.uVelocity,l.read.attach(0)),e.uniform1i(v.uniforms.uSource,m.read.attach(1)),e.uniform1f(v.uniforms.dissipation,Ue),g(m.write),m.swap()}function ce(r){if(!e){console.error("WebGL context not available");return}e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.enable(e.BLEND),se(r)}function se(r){if(!d||!d.activeProgram){console.error("Display material not initialized");return}let i=e.drawingBufferWidth,t=e.drawingBufferHeight;d.bind(),e.uniform2f(d.uniforms.texelSize,1/i,1/t),e.uniform1i(d.uniforms.uTexture,m.read.attach(0)),g(r)}function p(r,i,t){i=fe(i,t);const o=e.createShader(r);if(e.shaderSource(o,i),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS)){const n=e.getShaderInfoLog(o);return console.error(`Shader compilation error: ${n}`),console.error("Shader source:",i),e.deleteShader(o),null}return o}function fe(r,i){if(!i)return r;let t="";return i.forEach(o=>{t+="#define "+o+`
`}),t+r}function H(r,i){if(!r||!i)return console.error("Missing vertex or fragment shader"),null;let t=e.createProgram();if(e.attachShader(t,r),e.attachShader(t,i),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){const o=e.getProgramInfoLog(t);return console.error(`Program linking error: ${o}`),e.deleteProgram(t),null}if(e.validateProgram(t),!e.getProgramParameter(t,e.VALIDATE_STATUS)){const o=e.getProgramInfoLog(t);return console.error(`Program validation error: ${o}`),e.deleteProgram(t),null}return t}function W(r){let i=[],t=e.getProgramParameter(r,e.ACTIVE_UNIFORMS);for(let o=0;o<t;o++){let n=e.getActiveUniform(r,o).name;i[n]=e.getUniformLocation(r,n)}return i}class E{constructor(i,t){if(!i||!t){console.error("Missing vertex or fragment shader in Program constructor");return}if(this.uniforms={},this.program=H(i,t),!this.program){console.error("Failed to create program");return}this.uniforms=W(this.program)}bind(){if(!this.program){console.error("Cannot bind invalid program");return}e.useProgram(this.program)}}class ve{constructor(i,t){this.vertexShader=i,this.fragmentShaderSource=t,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(i){let t=0;for(let n=0;n<i.length;n++)t+=me(i[n]);let o=this.programs[t];if(o==null){console.log("Compiling fragment shader with keywords:",i);let n=p(e.FRAGMENT_SHADER,this.fragmentShaderSource,i);if(!n){console.error("Failed to compile fragment shader");return}if(console.log("Creating program with vertex and fragment shaders"),o=H(this.vertexShader,n),!o){console.error("Failed to create program");return}this.programs[t]=o}o!==this.activeProgram&&(this.uniforms=W(o),this.activeProgram=o,console.log("Material program set with uniforms:",this.uniforms))}bind(){if(!this.activeProgram){console.error("Cannot bind material: no active program");return}e.useProgram(this.activeProgram)}}function me(r){if(r.length===0)return 0;let i=0;for(let t=0;t<r.length;t++)i=(i<<5)-i+r.charCodeAt(t),i|=0;return i}return Re(()=>{if(console.log("Component mounted"),console.log("Canvas element:",f.value),!f.value){console.error("Canvas reference is null");return}P.resetPointers();const r=window.devicePixelRatio||1;console.log("Device Pixel Ratio:",r),f.value.width=window.innerWidth*r,f.value.height=window.innerHeight*r,f.value.style.width=`${window.innerWidth}px`,f.value.style.height=`${window.innerHeight}px`,console.log("Canvas dimensions:",{width:f.value.width,height:f.value.height,styleWidth:f.value.style.width,styleHeight:f.value.style.height});const{gl:i,ext:t}=q(f.value);if(e=i,x=t,!e){console.error("WebGL not supported");return}g=(e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),e.STATIC_DRAW),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(0),(F,pe=!1)=>{F==null?(e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.bindFramebuffer(e.FRAMEBUFFER,null)):(e.viewport(0,0,F.width,F.height),e.bindFramebuffer(e.FRAMEBUFFER,F.fbo)),pe&&(e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT)),e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0)});const o=p(e.VERTEX_SHADER,`
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `);if(!o){console.error("Failed to compile base vertex shader");return}const n=p(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `),u=p(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `),a=p(e.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
    }
  `),s=p(e.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
      vec2 st = uv / tsize - 0.5;
      vec2 iuv = floor(st);
      vec2 fuv = fract(st);

      vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
      vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
      vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
      vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

      return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
      #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
      #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
      #endif
      float decay = 1.0 + dissipation * dt;
      gl_FragColor = result / decay;
    }
  `,x.supportLinearFiltering?null:["MANUAL_FILTERING"]),c=p(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;

      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }

      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
  `),h=p(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      float vorticity = R - L - T + B;
      gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
  `),S=p(e.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;

      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;

      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity += force * dt;
      velocity = min(max(velocity, -1000.0), 1000.0);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `),de=p(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float C = texture2D(uPressure, vUv).x;
      float divergence = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + B + T - divergence) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
  `),ge=p(e.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity.xy -= vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `);B=new E(o,n),b=new E(o,u),T=new E(o,a),v=new E(o,s),U=new E(o,c),w=new E(o,h),R=new E(o,S),_=new E(o,de),A=new E(o,ge);const he=`
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
      color = max(color, vec3(0));
      return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
      vec3 c = texture2D(uTexture, vUv).rgb;
      #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
      #endif

      float a = max(c.r, max(c.g, c.b));
      gl_FragColor = vec4(c, a);
    }
  `;console.log("Creating display material..."),d=new ve(o,he),console.log("Display material created:",d);const I=[];I.push("SHADING"),console.log("Setting display material keywords:",I),d.setKeywords(I),console.log("Display material after setting keywords:",{activeProgram:d.activeProgram,uniforms:d.uniforms,programs:d.programs}),console.log("Initializing framebuffers..."),j(),console.log("Framebuffers initialized");function Y(){if(!e){console.error("WebGL context not available");return}if(!B||!B.program){console.error("Copy program not initialized");return}if(!d){console.error("Display material not created");return}if(!d.activeProgram){console.error("Display material active program not set");return}z=requestAnimationFrame(Y),K.value++;const F=ie();Z(F),le(),ue(F),ce(null)}console.log("Starting animation loop..."),Y(),P.setupEventListeners(f.value)}),Ee(()=>{console.log("Component unmounting"),z&&(cancelAnimationFrame(z),console.log("Animation frame cancelled")),P.removeEventListeners(),P.resetPointers()}),(r,i)=>{const t=xe;return ye(),Se("div",Ae({class:"fixed top-0 left-0 w-screen h-screen bg-black overflow-hidden"},r.$attrs),[De(t),_e("canvas",{ref_key:"canvas",ref:f,id:"fluid",class:"absolute top-0 left-0 w-screen h-screen overflow-hidden",style:{"z-index":"1"}},null,512)],16)}}};export{Xe as default};
