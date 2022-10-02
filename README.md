AnimatePresence은 React 트리에서 제거되는 시점을 감지하여 작동한다.


```tsx
const MyComponent = ({isVisible}) =>(
    <AnimatePresence>
    {
        isVisible && (
            <motion.div
                key = "modal"
                initial = {{ opacity:0 }}
                animate = {{ opacity:1 }}
                exit = {{ opacity:0 }}
            />
        )
    }
    </AnimatePresence>
)

```