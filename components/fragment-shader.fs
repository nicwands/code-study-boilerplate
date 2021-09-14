uniform sampler2D noise;
uniform sampler2D image;

float ramp(float y, float start, float end) {
  float inside = step(start, y) - step(end, y);
  float fact = (y - start) / (end - start) * inside;
  return (1.0 - fact) * inside;
}

// Return 0 or 1, like flicking a light switch.
// see https://www.desmos.com/calculator/pyxpllulmh
// a = amplitude of superimposed wave: higher = shorter state change durations, but mainly used as flavor
// b = timescale: higher = longer state durations
// c = preferred state: -1 always returns 1, 1 always returns 0. 
// <0 prefers returning 1, >0 prefers returning 0, 0 is an even split
float onOff(float a, float b, float c, float t) {
  return step(c, sin(t + a * cos(t * b)));
}

vec2 coverScreen(vec2 fragCoord, vec2 resolution, float aspect) {
  vec2 uv = 0.5 * (2.0 * fragCoord - resolution);
  if(resolution.x / resolution.y > aspect) {
    uv = 0.5 - uv / vec2(resolution.x, -resolution.x / aspect);
  } else {
    uv = 0.5 - uv / vec2(resolution.y * aspect, -resolution.y);
  }
  return uv;
}

vec2 screenDistort(vec2 uv) {
  uv -= vec2(0.5, 0.5);
  uv = uv * 1.2 * (1.0 / 1.2 + 2.0 * uv.x * uv.x * uv.y * uv.y);
  uv += vec2(0.5, 0.5);
  return uv;
}

vec2 scanWarp(vec2 uv, float t) {
  //float window = 1.0 / (1.0 + 20.0 * (uv.y - mod(t / 4.0, 1.0)) * (uv.y - mod(t / 4.0, 1.0)));
  float effectStrength = 2.0;

  float horizontalWobbleFrequency = 5.0;
  // lower = more amplitude
  float inverseHorizontalWobbleAmplitude = 150.0;
  uv.x +=
    // horizontal wobble amount
  sin(uv.y * horizontalWobbleFrequency + t) / inverseHorizontalWobbleAmplitude
    // whether the horizontal wobble will be applied
  * onOff(4.0, 4.0, 0.3, t) 
    // ???
  * (1.0 + cos(t * 80.0)) 
    //
  * effectStrength;
  float vShift = 0.;//0.4 * onOff(2.0, 3.0, 0.9, t) * (sin(t) * sin(t * 20.0) + (0.5 + 0.1 * sin(t * 200.0) * cos(t)));
  uv.y = mod(uv.y + vShift, 1.0);
  return uv;
}

float vignette(vec2 uv, float t) {
  float vigAmt = 3.0 + 0.3 * sin(t + 5.0 * cos(t * 5.0));
  return (1.0 - vigAmt * (uv.y - 0.5) * (uv.y - 0.5)) * (1.0 - vigAmt * (uv.x - 0.5) * (uv.x - 0.5));
}

float crtLines(vec2 uv, float t) {
  float contrast = 0.2;
  float lineCount = 100.;
  return (((1. / contrast) + fract(uv.y * lineCount + t)) * contrast);
}

float getNoise(vec2 p, float t) {
  float s = texture2D(noise, vec2(1.0, 2.0 * cos(t)) * t * 8.0 + p * 1.0).x;
  s *= s;
  return s;
}

float getStripes(vec2 uv, float t) {
  float noi = getNoise(uv * vec2(0.5, 1.0) + vec2(1.0, 3.0), t);
  return ramp(mod(uv.y * 4.0 + t / 2.0 + sin(t + sin(t * 0.63)), 1.0), 0.5, 0.6) * noi;
}

void main() {
  // stretch image to full area
  float aspect = u_resolution.x / u_resolution.y;
  vec2 uv = coverScreen(gl_FragCoord.xy, u_resolution, aspect);

  // `uv` coordinates distort the space of the image
  // (like taking a cloth the image is printed on and folding/twisting/etc)
  // uv = screenDistort(uv);
  uv = scanWarp(uv, u_time);
  vec4 vid_out = texture2D(image, uv);

  // editing .rgb changes the color of the image -
  // static lines, noise, vignette effect, etc
  // vid_out.rgb += getStripes(uv, u_time);
  // vid_out.rgb += getNoise(uv * 3.0, u_time) / 3.0;
  vid_out.rgb *= vignette(uv, u_time);
  vid_out.rgb *= crtLines(uv, u_time);
  // vid_out.rgb = vec3(onOff(4.0, 4.0, -1.6, u_time));

  gl_FragColor = vid_out;
}