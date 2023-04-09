import { Toast, popToRoot, showToast } from "@raycast/api";
import { isValidShortcut, Shortcut, formatHotkey, ShortcutDefault } from "./utils";
import { $_hotkey_getShortcuts, $_hotkey_initializeState, $_hotkey_setShortcuts } from "./assets/mixins";
import { useEffect } from "react";
import { ShortcutForm } from "./components/shortcut-form";

export default function Command() {
  async function saveShortcut(shortcut: Shortcut, source: string) {
    // const shortcut: Shortcut = { uuid, command, when, hotkey };
    if (!isValidShortcut(shortcut)) {
      return;
    }

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Saving Shortcut",
    });

    const shortcuts = await $_hotkey_getShortcuts(source);
    formatHotkey(shortcut.hotkey);
    shortcuts.push(shortcut);
    await $_hotkey_setShortcuts(source, shortcuts);

    toast.style = Toast.Style.Success;
    toast.title = "Shortcut Saved";
    popToRoot();
  }

  useEffect(() => {
    const init = async () => {
      await $_hotkey_initializeState();
    };

    init();
  }, []);

  return (
    <ShortcutForm navigationTitle="New Shortcut" shortcut={ShortcutDefault()} saveShortcut={saveShortcut} source="" />
  );
}
