---
name: react-bits
description: Find, install and adapt React Bits components and visual effects in React projects. Use when a task requests React Bits, animated text, backgrounds or interactions from its catalog.
---

# React Bits for Orbit

This is an Orbit-authored integration skill, not an official React Bits skill or a copy of React Bits Pro.

Read the target project, existing components and styling configuration before selecting an effect. Keep the established visual direction; do not add effects unrelated to the requested surface.

Use the [official catalog](https://reactbits.dev) to verify a component's exact name, props, dependencies and available variants. Do not invent registry names. The [installation guide](https://reactbits.dev/get-started/installation) documents the shadcn-compatible registry, for example:

```sh
npx shadcn@latest add @react-bits/SplitText-TS-TW
```

Choose TS versus JS and Tailwind versus CSS to match the project. This command is an example, not a required install for every request. Inspect registry code and dependencies before running an installer that changes project files. Reuse an existing installation instead of adding another variant. If copying manually, include the dependencies and styles documented for that exact component, with its applicable attribution/license.

Components install as editable source. Adapt their props and styles in the existing component tree; avoid unnecessary wrappers. For server-rendered React projects, isolate browser APIs and interactive effects at the appropriate client boundary. Clean up listeners, animation frames and WebGL resources when applicable.

Provide reduced-motion behavior, preserve readable content without animation, and keep keyboard/focus behavior intact. Avoid expensive decorative effects on every repeated item. Verify the actual rendered result on desktop/mobile, including overflow, reduced motion and the interaction requested. Run project type/build checks appropriate to the change; say when visual or performance checks could not run.

React Bits Pro is separate. Do not fetch or redistribute premium source or assume a subscription is available. Use the free catalog unless the user provides authorized access and requests Pro.
