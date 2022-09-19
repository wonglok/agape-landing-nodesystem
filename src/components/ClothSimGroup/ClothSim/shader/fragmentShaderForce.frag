uniform float time;
uniform float delta;
uniform sampler2D meta0;
uniform vec2 mouse;


mat3 rotateQ(vec3 axis, float rad) {
    float hr = rad / 2.0;
    float s = sin( hr );
    vec4 q = vec4(axis * s, cos( hr ));
    vec3 q2 = q.xyz + q.xyz;
    vec3 qq2 = q.xyz * q2;
    vec2 qx = q.xx * q2.yz;
    float qy = q.y * q2.z;
    vec3 qw = q.w * q2.xyz;

    return mat3(
        1.0 - (qq2.y + qq2.z),  qx.x - qw.z,            qx.y + qw.y,
        qx.x + qw.z,            1.0 - (qq2.x + qq2.z),  qy - qw.x,
        qx.y - qw.y,            qy + qw.x,              1.0 - (qq2.x + qq2.y)
    );
}


mat3 rotateX(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        1.0, 0.0, 0.0,
        0.0, c, s,
        0.0, -s, c
    );
}

mat3 rotateY(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
    );
}

mat3 rotateZ(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat3(
        c, s, 0.0,
        -s, c, 0.0,
        0.0, 0.0, 1.0
    );
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


void main (void) {

  vec2 uv = gl_FragCoord.xy / resolution;

  vec4 forceData = texture2D(textureForce, uv);
  vec4 velData = texture2D(textureVelocity, uv);
  vec4 posData = texture2D(texturePosition, uv);
  vec4 metaData = texture2D(meta0, uv);

  float ks = 0.001;
  float kd = 0.001;
  vec3 p1 = vec3(0.0);
  vec3 p2 = vec3(0.0);
  float L0 = 0.001;
  vec3 v1 = vec3(0.0);
  vec3 v2 = vec3(0.0);

  if (forceData.w == 0.0) {
    gl_FragColor = vec4(forceData.x, forceData.y, forceData.z, 1.0);
    return;
  }

  for (float y = -2.0; y <= 2.0; y++) {
    for (float x = -2.0; x <= 2.0; x++) {
      if (x == 0.0 && y == 0.0) {
        continue;
      }
      //
      if (gl_FragCoord.x + x >= resolution.x) {
        continue;
      }
      if (gl_FragCoord.y + y >= resolution.y) {
        continue;
      }
      if (gl_FragCoord.x + x <= 0.0) {
        continue;
      }
      if (gl_FragCoord.y + y <= 0.0) {
        continue;
      }

      //
      float xx = x;
      float yy = y;

      p1 = posData.rgb;
      p2 = texture2D(texturePosition, vec2(gl_FragCoord.x + xx, gl_FragCoord.y + yy) / resolution.xy).rgb;

      v1 = velData.rgb;
      v2 = texture2D(textureVelocity, vec2(gl_FragCoord.x + xx, gl_FragCoord.y + yy) / resolution.xy).rgb;

      vec3 f1 = -1.0 * (ks * (abs(p1 - p2) - L0) + kd * ((v1 - v2) * (p1 - p2)) / abs(p1 - p2)) * (p1 - p2) / abs(p1 - p2);

      f1.x = clamp(f1.x, (-0.005), (0.005));
      f1.y = clamp(f1.y, (-0.005), (0.005));
      f1.z = clamp(f1.z, (-0.005), (0.005));

      // f1 *= length(p1 - p2);

      forceData.xyz += f1;
    }
  }

  //
  if (forceData.w == 0.0) {
    forceData.x = (uv.x * 2.0 - 1.0) * 0.0;
    forceData.y = (uv.y * 2.0 - 1.0) * 0.0;
    forceData.z = 0.0;
    forceData.w = 1.0;
  }


  gl_FragColor = vec4(forceData.x, forceData.y, forceData.z, forceData.w);
}

//


