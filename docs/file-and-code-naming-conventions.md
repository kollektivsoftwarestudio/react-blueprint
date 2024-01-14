# File and Code Naming Conventions

The manner in which we name our files impacts the readability, maintainability, and collaborative efficiency of our projects. Adhering to a consistent naming convention is not merely a best practice; it is a fundamental aspect of efficient project management that can make onboarding for new team members easier and remove any bikeshedding.

## TL;DR

> We recommend adopting kebab-case for file naming across our projects. This approach guarantees compatibility across different operating systems, enhances readability, and is in alignment with web standards, thereby making it a suitable choice for a wide array of projects.

**For code naming conventions:**

- Use **PascalCase** for **types**, **classes**, and **Components**.
- Prefix hooks with **use** , render props with **render**, HOCs with **with**, and event handlers with **handle**.
- Apply **camelCase** to all other function names, property names, and local variables.
- use **UPPER_SNAKE_CASE** for any static constants.

**Avoid abbreviations, use whole words that are easily understandable where possible.**

Extra reading: [naming-cheatsheet](https://github.com/kettanaito/naming-cheatsheet)

## Popular File Name Conventions

### TL;DR

> We recommend **kebab-case** for all files.

### PascalCase for Components

**PascalCase** is an appropriate naming conventions for React components for a couple of reasons:

- Components used to be defined as classes, and it is a standard practice to use **PascalCase** for class names.
- Components are **PascalCases** within JSX
- Visual seperation of Components and other types of files within the project structure

This convention is usually paired with **camelCase** for all other elements, aligning with established JavaScript conventions.

```lua
src/
|-- components/
|   |-- common/
|   |   |-- Header/
|   |   |   |-- Header.jsx
|   |   |   |-- header.css
|   |   |   |-- index.js
|   |   |-- Footer/
|   |       |-- Footer.jsx
|   |       |-- footer.css
|   |       |-- index.js
|
|-- layout/
|   |-- MainLayout/
|       |-- MainLayout.jsx
|       |-- mainLayout.css
|       |-- index.js
|
|-- hooks/
|   |-- useCustomHook/
|       |-- useCustomHook.js
|       |-- index.js
|
|-- services/
|   |-- apiClient.js
|   |-- apiTypes.js
```

### camelCase everything

**camelCase** is the established standard for naming variables and functions in JavaScript. Using this convention for file names as well creates a sense of consistency throughout the project.

```lua
src/
|-- components/
|   |-- common/
|   |   |-- header/
|   |   |   |-- header.jsx
|   |   |   |-- header.css
|   |   |   |-- index.js
|   |   |-- footer/
|   |       |-- footer.jsx
|   |       |-- footer.css
|   |       |-- index.js
|
|-- layout/
|   |-- mainLayout/
|       |-- mainLayout.jsx
|       |-- mainLayout.css
|       |-- index.js
|
|-- hooks/
|   |-- useCustomHook/
|       |-- useCustomHook.js
|       |-- index.js
|
|-- services/
|   |-- apiClient.js
|   |-- apiTypes.js
```

### kebab-case everything

**kebab-case** is more aligned with web standards - URL and file naming conventions on the web usually favor lower case and dashes. kebab-case is also the only option in our list that is all lowercase, removing any multi-platform development case sensitivity issues. While developers are used to different casing, kebab-case is also the fastest to read.

kebab-case aligns closely with established web standards, where URL and file naming conventions typically favor lowercase letters separated by dashes. kebab-case is the only convention in our list that uses lowercase exclusively, thereby eliminating case sensitivity issues in multi-platform development environments. Although developers might be accustomed to various casing conventions, kebab-case has been shown to offer superior readability speed.

```lua
src/
|-- components/
|   |-- common/
|   |   |-- header/
|   |   |   |-- header.jsx
|   |   |   |-- header.css
|   |   |   |-- index.js
|   |   |-- footer/
|   |       |-- footer.jsx
|   |       |-- footer.css
|   |       |-- index.js
|
|-- layout/
|   |-- main-layout/
|       |-- main-layout.jsx
|       |-- main-layout.css
|       |-- index.js
|
|-- hooks/
|   |-- use-custom-hook/
|       |-- use-custom-hook.js
|       |-- index.js
|
|-- services/
|   |-- api-client.js
|   |-- api-types.js
```

### File Name Convention Summary

**PascalCase** seems an intuitive good choice, but it presents two issues:

1. **Inconsistency Across File Types**: PascalCase is commonly reserved for React components, leading to inconsistency in the naming convention across different types of files within the same project. For instance, utility files, hooks, collection folders, and services are named using different conventions like camelCase or kebab-case. This inconsistency requires developers to remember and apply different naming rules for different file types, making the codebase less approachable, particularly for new team members or contributors.
2. **Case Sensitivity Issues with Version Control Systems**: PascalCase can be problematic in environments where case sensitivity is an issue, particularly with version control systems like Git. For example, renaming a file from **`MyComponent.js`** to **`myComponent.js`** may not be recognized as a change on case-insensitive file systems (common in Windows). This can lead to challenges in tracking changes, merging code, and maintaining consistency across different development environments.

Both **camelCase** and **kebab-case** effectively address the first issue, simplifying the file naming process by eliminating the need for varied conventions. However, camelCase shares the same case sensitivity drawback as PascalCase. Because the arguments between kebab-case and camelCase are relatively slim, we believe each team may exercise discretion in their own choice. To avoid excessive bikeshedding on this topic, **we recommend kebab-case by default.**

## Code Naming Conventions

### Components (Functional)

**File Name:** `user-profile.tsx`
**Convention**: `PascalCase` for component names

```tsx
import React from "react";

interface UserProfileProps {
  userName: string;
  email: string;
}

export const UserProfile = ({ userName, email }: UserProfileProps) => {
  return (
    <div>
      <h1>{userName}</h1>
      <p>{email}</p>
    </div>
  );
};
```

### Higher-Order Components (HOCs)

**File Name:** `with-user-authentication.tsx`
**Convention**: Prefix with `with` and use `camelCase`

```tsx
import React from "react";

export const withUserAuthentication = (
  WrappedComponent: React.ComponentType<any>
) => {
  return (props: any) => {
    // Authentication logic here
    return <WrappedComponent {...props} />;
  };
};
```

### Hooks

**File Name:** `use-fetch.ts`
**Convention**: Use `camelCase` and start with `use`

```tsx
import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
};
```

### Context

**FileName:** `user-context.tsx`

**Convention**: Use `PascalCase` for context objects and provider components.

```tsx
import React, { createContext, useState } from "react";

interface UserContextProps {
  children: React.ReactNode;
}

export const UserContext = createContext({
  /* default context value */
});

export const UserProvider = ({ children }: UserContextProps) => {
  const userValue = {
    /* User data and logic here */
  };

  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
};
```

### Shared Types and Interfaces

**Convention**: Use `PascalCase`. While common in other languages such as C#, we do **not** recommend prefacing interfaces with an `I`. (Hungarian Notation) Not only is it in line with Typescripts own [coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines), it also makes refactoring easier in TypeScript where switching between types and interfaces can be more common.

```tsx
export type Account = {
  id: number;
  name: string;
};

export interface User {
  id: number;
  name: string;
  email: string;
}
```

### Enums

**Convention**: Use `PascalCase` for the enum, and `PascalCase` for its members.

```tsx
// As TypeScript enum
export enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

// Using `as const`
const Color = {
  Red = "red",
  Green = "green",
  Blue = "blue",
} as const;

type Color = keyof typeof Color;
```

Some thoughts on using TypeScript enums: [Matt Pocock - Enums considered harmful](https://www.youtube.com/watch?v=jjMbPt_H3RQ)

### Constants

**Convention**: Use `UPPER_SNAKE_CASE` for true constants, `camelCase` for non-static values

```tsx
export const DEFAULT_PAGE_SIZE = 10;
export const API_ENDPOINT = "https://api.example.com";

export const initialState = { loading: false, data: null };
```

### Utility Functions and Files

**File Name**: `format-date.ts`

**Convention**: Use `camelCase`

```tsx
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};
```

### Event Handlers

**Convention:** use `camelCase`, starting with `handle`

```tsx
import React from 'react';

export const Button = () => {
  const **handleClick** = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked');
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

### Custom Render Props

**Convention**: Use `camelCase` and prefix with `render`

```tsx
import React from "react";

interface HeaderFooterProps {
  title: string;
  subtitle?: string;
}

interface LayoutRendererProps {
  renderHeader: (props: HeaderFooterProps) => React.ReactNode;
  renderFooter: (props: HeaderFooterProps) => React.ReactNode;
}

export const LayoutRenderer = ({
  renderHeader,
  renderFooter,
}: LayoutRendererProps) => {
  const headerProps = { title: "Page Title", subtitle: "Page Subtitle" };
  const footerProps = { title: "Footer Title" };

  return (
    <div>
      <header>{renderHeader(headerProps)}</header>
      {/* Content and other elements can be added here */}
      <footer>{renderFooter(footerProps)}</footer>
    </div>
  );
};
```
