uniform sampler2D tOffsets;
uniform float uTime;

varying vec2 vUv;

float hash(float n) { return fract(sin(n) * 1e4); }

float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  float damping = 0.98;

  vec4 nowPos = texture2D( tPositions, uv ).xyzw;
  vec4 offsets = texture2D( tOffsets, uv ).xyzw;
  vec2 velocity = vec2(nowPos.z, nowPos.w);

  float anchorHeight = 100.0;
  float yAnchor = anchorHeight;
  vec2 anchor = vec2( -(uTime * 50.0) + offsets.x, yAnchor + 0.0 * (noise(uTime) * 30.0) );

  // Newton's law: F = M * A
  float mass = 24.0;
  vec2 acceleration = vec2(0.0, 0.0);

  // 1. apply gravity's force:
  vec2 gravity = vec2(0.0, 2.0);
  gravity /= mass;
  acceleration += gravity;


  // 2. apply the spring force
  float restLength = yAnchor - offsets.y;
  float springConstant = 0.2;

  // Vector pointing from anchor to point position
  vec2 springForce = vec2(nowPos.x - anchor.x, nowPos.y - anchor.y);
  // length of the vector
  float distance = length( springForce );
  // stretch is the difference between the current distance and restLength
  float stretch =  distance - restLength;

  // Calculate springForce according to Hooke's Law
  springForce = normalize(springForce);
  springForce *= (springConstant * stretch);

  springForce /= mass;
  acceleration += springForce;

  velocity += acceleration;
  velocity *= damping;

  //
  vec2 newPosition = vec2(nowPos.x - velocity.x, nowPos.y - velocity.y);
  // Write new position out
  gl_FragColor = vec4(newPosition.x, newPosition.y, velocity.x, velocity.y);
}
