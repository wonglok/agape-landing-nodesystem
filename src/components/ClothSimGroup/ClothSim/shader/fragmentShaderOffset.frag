uniform float time;

uniform vec2 mouse;
uniform sampler2D meta0;
uniform float delta;

#include <common>

void main (void) {
  //
  vec2 uv = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;

  vec4 metaData = texture2D(meta0, uv);
  vec4 velData = texture2D(textureVelocity, uv);
  vec4 offsetPosData = texture2D(textureOffset, uv);

  float mass = 1.0;

  if (offsetPosData.w == 0.0) {
    offsetPosData.x = (uv.x * 2.0 - 1.0) * 100.0;
    offsetPosData.y = (uv.y * 2.0 - 1.0) * 100.0;
    offsetPosData.z = 0.0;
    offsetPosData.w = 1.0;
  }




  // offsetPosData.rgb = offsetPosData.rgb + velData.rgb * delta;

  //
  // if (metaData.z > 0.0) {
  //   offsetPosData.y = 0.0;
  // }

  gl_FragColor = vec4(offsetPosData.x, offsetPosData.y, offsetPosData.z, offsetPosData.w);
}

/*

  float ks = 1.0;
  float kd = 1.0;
  vec3 p1 = vec3(0.0);
  vec3 p2 = vec3(0.0);
  float L0 = 0.5;
  vec3 v1 = vec3(0.0);
  vec3 v2 = vec3(0.0);

  vec3 f1 = -(ks * (abs(p1 - p2) - L0) + kd * ((v1 - v2) * (p1 - p2)) / abs(p1 - p2)) * (p1 - p2) / abs(p1 - p2);
  vec3 f2 = -f1;

  //

  //

  // vec3 motion = pos + vel * delta;
  // vec3 velocity = vel + (gravity + force / mass) * delta;

*/
