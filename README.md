# @pinkney/react-3d-card

> 🃏 Ultra-smooth, 60 FPS hardware-accelerated 3D tilt perspective & dynamic spotlight glare card for React.  
> 极速 60 FPS 硬件加速、带有反光光斑跟随与视差物理倾斜的 React 3D 卡片组件与 Hook。

[![npm version](https://img.shields.io/npm/v/@pinkney/react-3d-card.svg?style=flat-square)](https://www.npmjs.com/package/@pinkney/react-3d-card)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

---

## ✨ Features (核心特性)

- ⚡ **60 FPS Hardware Accelerated (硬件加速)**: 利用 `requestAnimationFrame` 驱动局部 CSS 变量与矩阵变换，杜绝密集 `mousemove` 导致的重排重绘 (Reflow/Repaint)。
- 🔦 **Dynamic Spotlight Glare (动态反光聚光斑)**: 模拟 Apple / Linear 风格的玻璃质感高光反光跟随。
- 👁️ **Viewport Culling (视口可见性剪裁)**: 内部 Hook 自动跳过当前视口外不可见的卡片计算，长列表页面零掉帧。
- 📦 **Component & Hook Dual Form (组件与 Hook 双形态)**:
  - `<Card3D />`: 单卡片开箱即用，零配置即可获得极致手感；
  - `use3DCard()`: 容器级批量卡片代理 Hook，一次性托管上百个网格卡片。
- 🌌 **Next.js & SSR Ready**: 内置 `"use client"` 指令，原生支持 Next.js App Router、Vite、Remix。

---

## 📦 Installation (安装)

```bash
npm install @pinkney/react-3d-card
# or
pnpm add @pinkney/react-3d-card
# or
yarn add @pinkney/react-3d-card
```

---

## 🚀 Quick Start (快速上手)

### 1. Basic `<Card3D />` Component

```tsx
import React from 'react';
import { Card3D } from '@pinkney/react-3d-card';

export function FeatureCard() {
  return (
    <Card3D
      maxTilt={9}
      glare
      glareColor="rgba(6, 182, 212, 0.18)"
      style={{
        width: 320,
        padding: 24,
        borderRadius: 16,
        background: '#09090b',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
      }}
    >
      <h3>AI Agent Orchestration</h3>
      <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 8 }}>
        Ultra-low latency streaming response with 4-byte binary protocols.
      </p>
    </Card3D>
  );
}
```

### 2. Batch Cards via `use3DCard` Hook (批量托管)

```tsx
import React from 'react';
import { use3DCard } from '@pinkney/react-3d-card';

export function CardGrid() {
  // 绑定在父容器上，所有带 [data-3d-card] 的子元素都会获得 3D 悬浮效果
  const containerRef = use3DCard<HTMLDivElement>({ maxTilt: 6 });

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-4">
      <div data-3d-card className="p-6 bg-zinc-900 rounded-xl">Card 1</div>
      <div data-3d-card className="p-6 bg-zinc-900 rounded-xl">Card 2</div>
      <div data-3d-card className="p-6 bg-zinc-900 rounded-xl">Card 3</div>
    </div>
  );
}
```

---

## 🛠️ API Reference

### `<Card3D />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `tilt` | `boolean` | `true` | 是否开启物理透视倾斜 |
| `maxTilt` | `number` | `7` | 最大倾斜角度 (度数) |
| `glare` | `boolean` | `true` | 是否开启聚光跟随高光层 |
| `glareColor` | `string` | `"rgba(255, 255, 255, 0.12)"` | 光斑渐变色 |
| `perspective` | `number` | `1000` | 3D 透视深度 (px) |
| `resetSpeed` | `number` | `300` | 鼠标离开恢复平放动画时长 (ms) |

---

## 📄 License

MIT © [Pinkney Jiang](https://github.com/pinkney)
