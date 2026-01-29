---
title: "React Hooks: From useState to Custom Hooks"
author: "Tech Writer"
pubDate: 2024-01-22
tags: ["react", "javascript", "hooks", "frontend", "web-development"]
description: "Master React Hooks and learn how to create your own custom hooks for reusable logic"
---

React Hooks have transformed how we write React components, allowing us to use state and other React features without writing class components. Let's explore the most important hooks and how to create your own.

## useState: Managing Component State

The `useState` hook is your gateway to adding state to functional components:

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## useEffect: Side Effects Made Easy

`useEffect` handles side effects like data fetching, subscriptions, and DOM manipulation:

```javascript
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]); // Re-run when userId changes
  
  return <div>{user?.name}</div>;
}
```

## useContext: Avoiding Prop Drilling

Share data across components without passing props through every level:

```javascript
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
```

## Creating Custom Hooks

Custom hooks let you extract component logic into reusable functions:

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('username', '');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

## Rules of Hooks

1. Only call hooks at the top level
2. Only call hooks from React functions
3. Custom hooks must start with "use"

Hooks have made React code more readable, testable, and maintainable. Start with the built-in hooks and gradually create custom ones as patterns emerge in your code.
