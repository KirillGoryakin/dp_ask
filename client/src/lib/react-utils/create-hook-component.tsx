'use client';

export function createHookComponent(useCustomHook: () => void) {
  const Component = () => {
    useCustomHook();
    return null;
  };
  Component.displayName = `hookComponent(${useCustomHook.name})`;
  return Component;
}
