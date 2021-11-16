#ifdef GL_ES
precision mediump float;
#endif

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
 
#pragma glslify: aastep = require('glsl-aastep') 

// get our varyings
varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

// the uniform we declared inside our javascript
uniform float uTime;
varying vec2 vUv;
varying vec3 vViewPosition;

uniform sampler2D bgDiffuse;
uniform sampler2D bgNormals;
uniform sampler2D bgSpecular;

void main() {
    vec3 color = vec3(0.);

    color.r = 1.;

    gl_FragColor = vec4( color, 1.0 );
}