## 难点
### 1. 如何实现点击sorting tab之后，点击屏幕任意地方可以hide
      - 使用useRef hook：
          - useRef is like a “box” that can hold a mutable value in its .current property.
          - similar to useState but will not cause re-rendering 
             (ex: calculate how many times a div has been rendered, will not cause infinite loop as useState)
          - most people use it is to reference an element inside the html
      ...