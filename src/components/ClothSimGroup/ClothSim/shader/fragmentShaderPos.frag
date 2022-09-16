
uniform float time;



void main (void) {
  //
  vec2 uv = gl_FragCoord.xy / resolution;

  vec4 velVarData = texture2D(textureVelocity, uv);
  vec4 velPosData = texture2D(texturePosition, uv);

  velPosData.rgb += velVarData.rgb;

  gl_FragColor = vec4(velPosData.x, velPosData.y, velPosData.z, 1.0);
  //
}
