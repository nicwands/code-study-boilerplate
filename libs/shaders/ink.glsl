#pragma glslify: absorb = require('./absorb')

//writing on paper
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

#pragma glslify: export(ink)