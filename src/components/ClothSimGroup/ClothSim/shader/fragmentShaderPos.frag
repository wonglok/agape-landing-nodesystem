
uniform float time;

uniform vec2 mouse;
uniform sampler2D meta0;


void main (void) {
  //
  vec2 uv = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;

  vec4 metaData = texture2D(meta0, uv);
  vec4 velData = texture2D(textureVelocity, uv);
  vec4 posData = texture2D(texturePosition, uv);

  posData.rgb += velData.rgb;

  gl_FragColor = vec4(posData.x, posData.y, posData.z, 1.0);
  //
}
