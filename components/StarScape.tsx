import React, { CSSProperties, ReactNode, useMemo } from "react";

import ShaderRenderer from "./ShaderRenderer";

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface RgbaColor extends RgbColor {
  a: number;
}

export const hexToRgba = (hex: string, alpha = 1): RgbaColor => {
  if (hex[0] === "#") hex = hex.substr(1);

  if (hex.length < 6) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: alpha,
    };
  }

  return {
    r: parseInt(hex.substr(0, 2), 16) / 255,
    g: parseInt(hex.substr(2, 2), 16) / 255,
    b: parseInt(hex.substr(4, 2), 16) / 255,
    a: alpha,
  };
};

const styles = {
  container: {
    position: "relative",
    width: 500,
    height: 500,
  } as CSSProperties,
  shader: {
    width: 500,
    height: 500,
    borderBottom: "2px solid rgba(245,245,255,0.06)",
  } as CSSProperties,
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  } as CSSProperties,
};

const fragmentShader1 = (colors: RgbaColor[]) => {
  const [color1, color2, color3, color4, color5] = colors;

  return `
precision highp float;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

vec3 pal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
return a + b * cos(6.28318 * (c * t + d));
}

void main() {
vec3 color1 = vec3(${color1.r}, ${color1.g}, ${color1.b});
vec3 color2 = vec3(${color2.r}, ${color2.g}, ${color2.b});
vec3 color3 = vec3(${color3.r}, ${color3.g}, ${color3.b});
vec3 color4 = vec3(${color4.r}, ${color4.g}, ${color4.b});
vec3 color5 = vec3(${color5.r}, ${color5.g}, ${color5.b});

vec2 uv = (gl_FragCoord.xy / iResolution.xy / 3.0 - 0.5);
vec3 col = pal(uv.x / uv.y * iTime / 2.0, color1, color2, color3, color4);

gl_FragColor = vec4(col, 1.0);
}
`;
};

const fragmentShader2 = (colors: RgbaColor[]) => {
  const [color1, color2, color3, color4, color5] = colors;

  return `
  precision highp float;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

void main() {
vec3 color1 = vec3(${color1.r}, ${color1.g}, ${color1.b});
vec3 color2 = vec3(${color2.r}, ${color2.g}, ${color2.b});
vec3 color3 = vec3(${color3.r}, ${color3.g}, ${color3.b});
vec3 color4 = vec3(${color4.r}, ${color4.g}, ${color4.b});
vec3 color5 = vec3(${color5.r}, ${color5.g}, ${color5.b});

vec2 uv = (gl_FragCoord.xy / iResolution.xy - 0.5);
float x = floor(uv.x * 8.0) / 8.0;
float y = floor(uv.y * 8.0) / 8.0;
float t = sin(iTime);

gl_FragColor = vec4(mix(color1, color2, (t + x + y) / 2.0), 1.0);
}
`;
};

export default function Starscape({
  colors,
  children,
  index,
}: {
  children?: ReactNode;
  colors: string[];
  index: number;
}) {
  const parsed = useMemo(() => colors.map(hexToRgba), [colors]);

  return (
    <div style={styles.container}>
      <ShaderRenderer
        vertexShader={vertexShader}
        fragmentShader={(index === 1 ? fragmentShader1 : fragmentShader2)(
          parsed
        )}
        style={styles.shader}
      />
      <div style={styles.overlay}>{children}</div>
    </div>
  );
}

const vertexShader = `
attribute vec4 position;
attribute vec4 color;
void main() {
  gl_Position = position;
}
`;

//     const { children, colors } = this.props;

//     const fragmentShader = `
//     bool mode;

//     vec3 fcos(vec3 x) {
//       if (mode) return cos(x);
//     }

//     vec3 getColor( in float t )
//     {
//         vec3 col = vec3(0.4,0.4,0.4);
//         col += 0.12*fcos(6.28318*t*  1.0+vec3(0.0,0.8,1.1));
//         col += 0.11*fcos(6.28318*t*  3.1+vec3(0.3,0.4,0.1));
//         col += 0.10*fcos(6.28318*t*  5.1+vec3(0.1,0.7,1.1));
//         col += 0.09*fcos(6.28318*t*  9.1+vec3(0.2,0.8,1.4));
//         col += 0.08*fcos(6.28318*t* 17.1+vec3(0.2,0.6,0.7));
//         col += 0.07*fcos(6.28318*t* 31.1+vec3(0.1,0.6,0.7));
//         col += 0.06*fcos(6.28318*t* 65.1+vec3(0.0,0.5,0.8));
//         col += 0.06*fcos(6.28318*t*115.1+vec3(0.1,0.4,0.7));
//         col += 0.09*fcos(6.28318*t*265.1+vec3(1.1,1.4,2.7));
//         return col;
//     }

//     vec2 deform( in vec2 p )
//     {
//         // deform 1
//         p *= 0.25;
//         p = 0.5*p/dot(p,p);
//         p.x += iTime*0.1;

//         // deform 2
//         p += 0.2*cos( 1.5*p.yx + 0.03*1.0*iTime + vec2(0.1,1.1) );
//         p += 0.2*cos( 2.4*p.yx + 0.03*1.6*iTime + vec2(4.5,2.6) );
//         p += 0.2*cos( 3.3*p.yx + 0.03*1.2*iTime + vec2(3.2,3.4) );
//         p += 0.2*cos( 4.2*p.yx + 0.03*1.7*iTime + vec2(1.8,5.2) );
//         p += 0.2*cos( 9.1*p.yx + 0.03*1.1*iTime + vec2(6.3,3.9) );

//         return p;
//     }

//     void mainImage(out vec4 fragColor, in vec2 fragCoord )
//     {
//         // coordiantes
//       vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;
//         vec2 w = p;

//         // separation
//         float th = (iMouse.z>0.001) ? (2.0*iMouse.x-iResolution.x)/iResolution.y : 1.8*sin(iTime);
//         mode = (w.x-th<0.0);

//         // deformation
//         p = deform( p );

//         // base color pattern
//         vec3 col = getColor( 0.5*length(p) );

//         // lighting
//         col *= 1.4 - 0.14/length(w);

//         // separation
//         col *= smoothstep(0.005,0.010,abs(w.x-th));

//         // palette
//         if( w.y<-0.9 ) col = getColor( fragCoord.x/iResolution.x );

//         // output
//         fragColor = vec4( col, 1.0 );
//     }
// `;
//     const fragmentShader = `
// // Star Nest by Pablo RomÃ¡n Andrioli
// // This content is under the MIT License.
// #define iterations 17
// #define formuparam 0.71
// #define volsteps 3
// #define stepsize 0.1
// #define zoom   0.800
// #define tile   0.850
// #define speed  0.0001
// #define brightness 0.0005
// #define darkmatter 0.300
// #define distfading 0.730
// #define saturation 0.850
// precision highp float; // mediump doesn't work on iOS
// uniform vec2 iResolution;
// uniform vec2 iMouse;
// uniform float iTime;
// void main() {
// 	// Get coords and direction
//   vec2 uv = gl_FragCoord.xy / iResolution.xy - 0.5;
//   uv.y *= iResolution.y / iResolution.x;
//   vec3 dir = vec3(uv * zoom, 1.0);
//   float time = iTime * speed + 2.25;
// 	// Mouse rotation
// 	float a1 = 0.5 + iMouse.x / iResolution.x * 2.0;
// 	float a2 = 0.8 + iMouse.y / iResolution.y * 2.0;
// 	mat2 rot1=mat2(cos(a1),sin(a1),-sin(a1),cos(a1));
// 	mat2 rot2=mat2(cos(a2),sin(a2),-sin(a2),cos(a2));
// 	dir.xz *= rot1;
// 	dir.xy *= rot2;
// 	vec3 from = vec3(1., .5, 0.5);
// 	from += vec3(time*2., time, -2.);
// 	from.xz *= rot1;
// 	from.xy *= rot2;
// 	// Volumetric rendering
// 	float s = 0.1;
// 	vec3 v = vec3(0.0);
// 	for (int r = 0; r < volsteps; r++) {
// 		vec3 p = from + s * dir * .5;
//     p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold
//     float pa,a=pa=0.;
// 		for (int i = 0; i < iterations; i++) {
// 			p = abs(p) / dot(p, p) - formuparam; // the magic formula
// 			a += abs(length(p) - pa); // absolute sum of average change
// 			pa = length(p);
// 		}
// 		a *= (a * a * a) / 2.0; // Add contrast
// 		v += vec3(s*s*s*s, s*s, s) * a * brightness; // Coloring based on distance
// 		s += stepsize;
// 	}
//   v = mix(vec3(length(v)), v, saturation); // Color adjust
//   v = mix(min(v * 0.01, 1.0), vec3(0.0), 0.4); // Dim the background
//   gl_FragColor = vec4(v, 1.0);
// }
// `;
