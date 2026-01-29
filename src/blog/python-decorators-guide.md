---
title: "Python Decorators: A Complete Guide"
author: "Tech Writer"
pubDate: 2024-01-18
tags: ["python", "decorators", "advanced", "functions"]
description: "Learn how to use and create Python decorators to enhance your code functionality"
---

Decorators are one of Python's most powerful features, allowing you to modify or enhance functions and classes without changing their source code. They're widely used in popular frameworks like Flask and Django.

## What Are Decorators?

A decorator is a function that takes another function as an argument and extends its behavior without explicitly modifying it. Think of it as a wrapper around your function.

## Basic Decorator Example

```python
def my_decorator(func):
    def wrapper():
        print("Something before the function")
        func()
        print("Something after the function")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
```

## Decorators with Arguments

You can create decorators that accept arguments by adding another layer of nesting:

```python
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello {name}!")
```

## Real-World Use Cases

Decorators are perfect for:
- Logging and debugging
- Access control and authentication
- Caching/memoization
- Timing function execution
- Input validation

## The @property Decorator

Python's built-in `@property` decorator is particularly useful for creating managed attributes:

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32
```

Mastering decorators will significantly improve your Python code's elegance and reusability.
