import * as React from 'react';
import React__default from 'react';

interface Card3DProps extends React__default.HTMLAttributes<HTMLDivElement> {
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
    innerRef?: React__default.Ref<HTMLDivElement>;
    children?: React__default.ReactNode;
}
interface Use3DCardOptions {
    tilt?: boolean;
    maxTilt?: number;
    perspective?: number;
    resetSpeed?: number;
    onHoverSound?: () => void;
}

/**
 * 🃏 Card3D
 * 60 FPS Hardware-accelerated 3D tilt perspective & dynamic spotlight glare card.
 */
declare const Card3D: React__default.ForwardRefExoticComponent<Card3DProps & React__default.RefAttributes<HTMLDivElement>>;

/**
 * 🔮 use3DCard
 * Batch container hook that calculates 3D tilt & spotlight glare with viewport culling.
 */
declare function use3DCard<T extends HTMLElement = HTMLDivElement>(options?: Use3DCardOptions, deps?: unknown[]): React.RefObject<T>;

export { Card3D, type Card3DProps, type Use3DCardOptions, Card3D as default, use3DCard };
