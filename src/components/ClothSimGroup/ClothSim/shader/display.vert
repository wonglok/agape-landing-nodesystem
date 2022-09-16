uniform sampler2D pos0;
void main (void) {
  //

  vec4 pos0data = texture2D(pos0, uv);

  gl_Position = vec4(pos0data.rgb, 1.0);
  //
  gl_PointSize = 1.0;
}
