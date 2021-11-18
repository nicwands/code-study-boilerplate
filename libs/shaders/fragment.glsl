#ifdef GL_ES
precision mediump float;
#endif

#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif
 
#pragma glslify: ink = require('./ink')
#pragma glslify: noise2 = require('glsl-noise/simplex/2d')
#pragma glslify: aastep = require('glsl-aastep')

// the uniform we declared inside our javascript
varying vec2 vUv;
varying vec3 vViewPosition;

uniform sampler2D tattooMap;
uniform sampler2D bgDiffuse;
uniform sampler2D bgNormals;
uniform sampler2D bgSpecular;

void main() {
    vec4 texColor = texture2D(tattooMap, vUv);

    if (texColor.a == 0.) {
        texColor.a = 1.;
    }

    gl_FragColor = texColor;
    
    float dist = texColor.a;
    float alpha = 0.;


    // alpha = ink(1, dist, vUv);

    // gl_FragColor = vec4( color, 1.0 );

    // gl_FragColor.rgb = texColor.rgb;
    // gl_FragColor.a = dist;
}