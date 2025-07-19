import { Plugin } from 'obsidian';
interface PluginsTogglerSettings {
    lastActivePlugins: string[];
    disableSelf: boolean;
}
export default class PluginsToggler extends Plugin {
    settings: PluginsTogglerSettings;
    onload(): Promise<void>;
    registerPluginCommands(): void;
    addGlobalCommands(): void;
    onunload(): void;
    loadSettings(): Promise<void>;
    saveSettings(): Promise<void>;
}
export {};
