import React from 'react';

export interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否开启 3D 物理倾斜透视 (默认: true) */
  tilt?: boolean;
  /** 最大倾斜角度 (度数，默认: 7) */
  maxTilt?: number;
  /** 是否开启鼠标光斑跟随高光 (默认: true) */
  glare?: boolean;
  /** 聚光反光颜色 (默认: "rgba(255, 255, 255, 0.12)") */
  glareColor?: string;
  /** 透视视距深度 (默认: 1000) */
  perspective?: number;
  /** 鼠标移出时恢复平放的过渡时间 (ms, 默认: 300) */
  resetSpeed?: number;
  /** 自定义容器 Ref */
  innerRef?: React.Ref<HTMLDivElement>;
  children?: React.ReactNode;
}

export interface Use3DCardOptions {
  tilt?: boolean;
  maxTilt?: number;
  perspective?: number;
  resetSpeed?: number;
  onHoverSound?: () => void;
}
