import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

export const AlgorithmBlockMaterial = shaderMaterial(
  {
    uTime: 0,
    uBlockScale: 0.85,
    uInset: 0.15,
    uShape: 1,
    color: new THREE.Color('#2fadaa'),
  },
  // Vertex Shader
  `
  uniform float uTime;
  uniform float uBlockScale;
  varying vec3 vNormal;
  varying vec3 vPosition;
  #define PI 3.141592653589793

  void main() {
    vPosition = position;
    vNormal = normal;
    vec4 modelPosition = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
  }
  `,
  // Fragment Shader
  `
  uniform vec3 color;
  uniform float uTime;
  uniform float uBlockScale;
  uniform float uInset;
  uniform int uShape;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  float sdTriangle(vec2 p) {
    float r = 0.3;
    float k = sqrt(3.0);
    p.x = clamp(p.x, -k * r, k * r);
    p.y = abs(p.y) - r;
    p = vec2(p.x - k * abs(p.y) + r, -abs(p.x) + k * p.y - r * (k - 1.0));
    if (p.y < 0.0)
      p = vec2(p.x, max(p.y, -r - p.y - k * abs(p.x - (-r) / 2.0)));
    return length(p) * sign(p.x);
  }

  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }

  float sdHexagon(vec2 p, float r) {
    vec2 q = abs(p);
    return max(q.x - r * 0.866, max(q.x * 0.5 + q.y * 0.866 - r * 0.866, q.y - r * 0.5));
  }

  float getShape(vec2 uv, int shape) {
    if (shape == 0) return sdTriangle(uv);
    else if (shape == 1) return sdRoundedBox(uv, vec2(0.28), 0.08);
    else if (shape == 2) return sdHexagon(uv, 0.32);
    else if (shape == 3) return sdRoundedBox(uv, vec2(0.22, 0.32), 0.06);
    else if (shape == 4) return sdCircle(uv, 0.28);
    else if (shape == 5) return sdRoundedBox(uv, vec2(0.32, 0.22), 0.06);
    else return sdCircle(uv, 0.28);
  }

  void main() {
    vec3 baseColor = color;
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
    baseColor += fresnel * 0.3;
    vec2 localUV = fract(vPosition.xy * uBlockScale) - 0.5;
    float shapeDist = getShape(localUV, uShape);
    float insetDist = sdRoundedBox(localUV, vec2(0.5 - uInset), 0.05);
    if (shapeDist < 0.0) baseColor *= 0.7;
    if (insetDist > 0.0) baseColor *= 0.85;
    gl_FragColor = vec4(baseColor, 1.0);
    #include <colorspace_fragment>
  }
  `
);

extend({ AlgorithmBlockMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    algorithmBlockMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial>;
      uTime?: number;
      uBlockScale?: number;
      uInset?: number;
      uShape?: number;
      color?: THREE.Color;
    };
  }
}
