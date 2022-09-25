uniform float time;

uniform vec2 mouse;
uniform sampler2D meta0;
uniform float delta;

#include <common>

float hash(float n) { return fract(sin(n) * 1e4); }

float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}


void main (void) {
  //
  vec2 uv = vec2(gl_FragCoord.x, gl_FragCoord.y) / resolution.xy;


  float damping = 0.98;

  vec4 nowPos = texture2D( texturePosition, uv ).xyzw;
  vec4 offsets = texture2D( textureOffset, uv ).xyzw;
  vec4 velocity = texture2D( textureVelocity, uv ).xyzw;

  float anchorHeight = 5.0;
  float yAnchor = anchorHeight;
  vec3 anchor = vec3( offsets.x, yAnchor, 0.0 );

  // Newton's law: F = M * A
  float mass = 24.0;
  vec3 acceleration = vec3(0.0, 0.0, 0.0);

  // 1. apply gravity's force:
  vec3 gravity = vec3(0.0, 2.0, 0.0);
  gravity /= mass;
  acceleration += gravity;


  // 2. apply the spring force
  float restLength = yAnchor - offsets.y;
  float springConstant = 0.2;

  // Vector pointing from anchor to point position
  vec3 springForce = vec3(nowPos.x - anchor.x, nowPos.y - anchor.y, nowPos.z - anchor.z);
  // length of the vector
  float distance = length( springForce );
  // stretch is the difference between the current distance and restLength
  float stretch =  distance - restLength;

  // Calculate springForce according to Hooke's Law
  springForce = normalize(springForce);
  springForce *= (springConstant * stretch);

  springForce /= mass;
  acceleration += springForce;

  velocity.rgb += acceleration;
  velocity.rgb *= damping;

  //
  vec3 newPosition = vec3(nowPos.x - velocity.x, nowPos.y - velocity.y, nowPos.z - velocity.z);
  // Write new position out
  gl_FragColor = vec4(velocity.x, velocity.y, velocity.z, 1.0);

}
