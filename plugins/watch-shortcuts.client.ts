type ShortcutHandler = () => void;

const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    target.isContentEditable ||
    target.getAttribute("role") === "textbox"
  );
};

export default defineNuxtPlugin(() => {
  const copyListeners = new Set<ShortcutHandler>();

  const onCopyShortcut = (handler: ShortcutHandler) => {
    copyListeners.add(handler);
    return () => copyListeners.delete(handler);
  };

  if (process.client) {
    window.addEventListener("keydown", (event) => {
      if (
        event.key?.toLowerCase() !== "c" ||
        event.metaKey ||
        event.ctrlKey ||
        isTypingTarget(event.target)
      ) {
        return;
      }

      copyListeners.forEach((listener) => listener());
    });
  }

  return {
    provide: {
      watchShortcuts: {
        onCopyShortcut,
      },
    },
  };
});
