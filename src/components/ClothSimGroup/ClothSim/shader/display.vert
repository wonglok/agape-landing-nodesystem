uniform sampler2D pos0;
attribute vec4 meta0;
uniform float time;

void main (void) {
  //
  vec4 pos0data = texture2D(pos0, meta0.xy);

  gl_Position = vec4(pos0data.xyz, 1.0);

  gl_PointSize = 1.5;
}

//
//
