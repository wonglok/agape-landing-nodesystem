
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
  vec4 posData = texture2D(texturePosition, uv);


  vec3 diff = posData.rgb - vec3(mouse.xy, 0.0);
  float dist = length(diff) * length(diff);
  vec3 normal = normalize(diff);

  posData.rgb += velData.rgb * delta * 1.0;
  if (dist <= 0.01) {
   posData.rgb = vec3(
    rand(uv + 0.1) * 2.0 - 1.0,
    rand(uv + 0.2) * 2.0 - 1.0,
    rand(uv + 0.3) * 2.0 - 1.0
   );
  }



  gl_FragColor = vec4(posData.x, posData.y, posData.z, 1.0);
  //
}
