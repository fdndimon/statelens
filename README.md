# 🔍 StateLens

StateLens is a lightweight, zero-dependency JavaScript utility to visualize your application state in real-time. It's designed for quick debugging during development when heavy-duty tools like Redux DevTools are overkill.

## ✨ Features
- **Zero Configuration**: Just pass your object and go.
- **Deep Tracking**: Uses JS Proxy API to observe nested object changes.
- **Visual Feedback**: Highlights state updates in the UI.
- **Isolated Styles**: Uses Shadow DOM to prevent CSS leaking into your project.

## 🚀 Quick Start

1. Include the script:
```html
<script src="statelens.js"></script>

2. Initialize with your state:
const myStore = new StateLens({
  user: { name: 'Alex', score: 10 },
  isLoading: false
});

// Any change to myStore.state will automatically update the UI!
myStore.state.user.score = 11;

🛠 Tech Stack
* JavaScript (ES6+)
* Proxy API for reactivity
* Shadow DOM for UI isolation
