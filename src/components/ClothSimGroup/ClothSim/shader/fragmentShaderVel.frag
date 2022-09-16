uniform float time;
void main (void) {
  //

  //
  vec2 uv = gl_FragCoord.xy / resolution;

  vec4 velData = texture2D(textureVelocity, uv);
  vec4 posData = texture2D(texturePosition, uv);

  velData.x = sin(time * 5.0 + velData.x) * 0.001;
  velData.y = sin(time * 5.0 + velData.y) * 0.001;
  //
  gl_FragColor = vec4(velData.x, velData.y, velData.z, 1.0);
  //
}
