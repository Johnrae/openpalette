import React, { CSSProperties } from "react";
import * as twgl from "twgl.js";

function initialize(
  canvas: HTMLCanvasElement,
  vertexShaderSource: string,
  fragmentShaderSource: string
) {
  const context = canvas.getContext("webgl");

  if (!context) {
    return () => {};
  }

  const gl = context;

  const programInfo = twgl.createProgramInfo(gl, [
    vertexShaderSource,
    fragmentShaderSource,
  ]);

  const arrays = {
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  };

  const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

  let canceled = false;

  // let renderCount = 10
  // let totalTime = 10 * 17
  // let renderStride = 1
  // let lostTime = 0
  // let prevTime = null

  function render(time: number) {
    if (canceled) return;

    // Dynamic perf adjustment

    // if (prevTime !== null) {
    //   renderCount += 1
    //   const delta = time - prevTime
    //   totalTime += Math.min(delta, 1000)
    //   lostTime += Math.max(delta - 1000, 0)

    //   let avg = totalTime / renderCount

    //   renderStride = Math.max(Math.min(Math.floor(avg / 16), 15), 1)
    // }

    // prevTime = time

    // if (renderCount % renderStride > 0) {
    //   requestAnimationFrame(render)
    //   return
    // }

    // Render

    const width = 500;
    const height = 500;
    // const width = canvas.clientWidth;
    // const height = canvas.clientHeight;

    if (canvas.width != width) {
      canvas.width = width;
    }

    if (canvas.height != height) {
      canvas.height = height;
    }

    gl.viewport(0, 0, width, height);

    const uniforms = {
      // iTime: ((time - lostTime) / renderStride) * 0.001,
      iTime: time * 0.001,
      iResolution: [width, height],
      iMouse: [1.2, 1.2],
    };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  return () => {
    canceled = true;
  };
}

export default class ShaderRenderer extends React.Component<{
  vertexShader: string;
  fragmentShader: string;
  style: CSSProperties;
}> {
  running = false;
  vertexShader: string | null = null;
  fragmentShader: string | null = null;
  stop: (() => void) | null = null;
  canvas: HTMLCanvasElement | null = null;

  setup() {
    const { vertexShader, fragmentShader } = this.props;

    if (!vertexShader || !fragmentShader || !this.canvas) {
      return;
    }

    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.running = true;
    this.stop = initialize(this.canvas, vertexShader, fragmentShader);
  }

  teardown() {
    if (!this.running) return;

    this.running = false;
    this.stop?.();
    // delete this.fragmentShader;
    // delete this.vertexShader;
  }

  componentDidMount() {
    this.setup();
  }

  componentDidUpdate() {
    const { vertexShader, fragmentShader } = this.props;

    // If the shaders didn't change, return
    if (
      vertexShader === this.vertexShader &&
      fragmentShader === this.fragmentShader
    ) {
      return;
    }

    this.teardown();
    this.setup();
  }

  componentWillUnmount() {
    this.stop?.();
  }

  render() {
    const { style } = this.props;

    return (
      <canvas
        style={style}
        ref={(ref) => {
          this.canvas = ref;
        }}
      />
    );
  }
}
