#ifdef GL_ES
precision highp float;
#endif

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
 
#pragma glslify: ink = require('./ink')
#pragma glslify: noise2 = require('glsl-noise/simplex/2d')
#pragma glslify: aastep = require('glsl-aastep')

varying vec2 vUv;
varying vec3 vViewPosition;

uniform float time;
uniform sampler2D tattooMap;
uniform sampler2D bgDiffuse;
uniform sampler2D bgNormals;
uniform sampler2D bgSpecular;

float median(float r, float g, float b) {
    return max(min(r, g), min(max(r, g), b));
}

void main() {
    vec4 texColor = texture2D(tattooMap, vUv);
    float dist = median(texColor.r, texColor.g, texColor.b);
    float alpha = 0.;

    float strength = mix(0.4, 1.1, abs(sin(time / 150.)));
    alpha = mix(0., 1., ink(dist * strength, vUv));

    gl_FragColor.rgb = vec3(0.);
    gl_FragColor.a = alpha;
}