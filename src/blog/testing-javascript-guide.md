---
title: "Testing JavaScript Applications: A Practical Guide"
author: "Tech Writer"
pubDate: 2024-02-05
tags: ["testing", "javascript", "jest", "quality-assurance", "web-development"]
description: "Learn how to write effective tests for JavaScript applications using modern testing frameworks"
---

Testing is not just about finding bugs—it's about building confidence in your code. Well-tested applications are easier to refactor, maintain, and scale. Let's explore practical testing strategies for JavaScript applications.

## Types of Tests

Understanding the testing pyramid:

1. **Unit Tests**: Test individual functions/components (70%)
2. **Integration Tests**: Test component interactions (20%)
3. **End-to-End Tests**: Test complete user flows (10%)

## Setting Up Jest

Jest is the most popular JavaScript testing framework:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

```javascript
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Writing Your First Unit Test

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

// math.test.js
import { add, divide } from './math';

describe('Math functions', () => {
  test('adds two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test('divides two numbers correctly', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('throws error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });
});
```

## Testing React Components

```javascript
// Button.jsx
export function Button({ onClick, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText('Click')).toBeDisabled();
  });
});
```

## Mocking Dependencies

```javascript
// userService.js
export async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// userService.test.js
import { fetchUser } from './userService';

global.fetch = jest.fn();

describe('fetchUser', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetches user data successfully', async () => {
    const mockUser = { id: 1, name: 'John' };
    fetch.mockResolvedValueOnce({
      json: async () => mockUser
    });

    const user = await fetchUser(1);
    
    expect(fetch).toHaveBeenCalledWith('/api/users/1');
    expect(user).toEqual(mockUser);
  });

  test('handles fetch errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    await expect(fetchUser(1)).rejects.toThrow('Network error');
  });
});
```

## Testing Async Code

```javascript
describe('Async operations', () => {
  test('async/await syntax', async () => {
    const data = await fetchData();
    expect(data).toBe('success');
  });

  test('resolves promise', () => {
    return expect(fetchData()).resolves.toBe('success');
  });

  test('rejects promise', () => {
    return expect(fetchError()).rejects.toThrow();
  });
});
```

## Best Practices

1. **Write descriptive test names**: Test names should describe what's being tested
2. **Follow AAA pattern**: Arrange, Act, Assert
3. **One assertion per test**: Keeps tests focused and easy to debug
4. **Don't test implementation details**: Test behavior, not internals
5. **Use test coverage wisely**: 100% coverage ≠ bug-free code

## Test Coverage

```bash
npm run test:coverage
```

Aim for:
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

But remember: coverage is a tool, not a goal.

## Common Matchers

```javascript
expect(value).toBe(5);                    // Exact equality
expect(value).toEqual({ name: 'John' }); // Deep equality
expect(value).toBeTruthy();              // Truthy value
expect(value).toBeNull();                // Null value
expect(value).toContain('text');         // Array/string contains
expect(array).toHaveLength(3);           // Array length
expect(fn).toHaveBeenCalled();           // Function called
```

Start with critical paths, then expand coverage. Testing may seem slow initially, but it pays dividends as your codebase grows.
