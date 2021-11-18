#ifdef GL_ES
precision mediump float;
#endif

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
 
// #pragma glslify: ink = require('./ink')
#pragma glslify: noise2 = require('glsl-noise/simplex/2d')
#pragma glslify: aastep = require('glsl-aastep')

varying vec2 vUv;
varying vec3 vViewPosition;

uniform float time;
uniform sampler2D tattooMap;
uniform sampler2D bgDiffuse;
uniform sampler2D bgNormals;
uniform sampler2D bgSpecular;

float absorb(float sdf, vec2 uv, float scale, float falloff) {
  float distort = sdf + noise2(uv * scale) * falloff;
  float strength = mix(0.35, 1.2, abs(sin(time / 150.)));
  return aastep(strength, distort);
}

float ink(float sdf, vec2 uv) {
  float alpha = 0.0;
  alpha += absorb(sdf, uv, 80.0, 0.02) * 0.1;
  alpha += absorb(sdf, uv, 50.0, 0.02) * 0.1;
  alpha += absorb(sdf, uv, 500.0, 0.05) * 0.2;
  alpha += absorb(sdf, uv, 1000.0, 0.05) * 0.2;
  alpha += absorb(sdf, uv, 3000.0, 0.1) * 0.2;
  alpha += absorb(sdf, uv, 1000.0, 0.3) * 0.15;
  return alpha;
}

//more splatter
float graffiti(float sdf, vec2 uv) {
  float alpha = 0.0;
  alpha += absorb(sdf, uv, 600.0, 0.1) * 0.2;
  alpha += absorb(sdf, uv, 300.0, 0.1) * 0.2;
  alpha += absorb(sdf, uv, 20.0, 0.05) * 0.2;
  alpha += absorb(sdf, uv, 400.0, 0.05) * 0.2;
  alpha += absorb(sdf, uv, 100.0, 0.2) * 0.2;
  return alpha;
}

float selectInk(int g, float sdf, vec2 uv) {
  if (g == 1) {
    return graffiti(sdf, uv);
  }
  else {
    return ink(sdf, uv);
  }
}

void main() {
    vec4 texColor = texture2D(tattooMap, vUv);
    float dist = texColor.a;
    float alpha = 0.;


    alpha = selectInk(1, dist, vUv);

    gl_FragColor.rgb = texColor.rgb;
    gl_FragColor.a = alpha;
}