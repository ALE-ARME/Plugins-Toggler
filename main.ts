import { App, Plugin, PluginManifest, PluginSettingTab, Setting, Notice } from 'obsidian';

interface PluginsTogglerSettings {
    lastActivePlugins: string[];
    disableSelf: boolean;
}

const DEFAULT_SETTINGS: PluginsTogglerSettings = {
    lastActivePlugins: [],
    disableSelf: true,
}

export default class PluginsToggler extends Plugin {
    settings!: PluginsTogglerSettings;

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new PluginsTogglerSettingTab(this.app, this));

        // Using onLayoutReady ensures that all plugins are loaded and their manifests are available.
        this.app.workspace.onLayoutReady(() => {
            this.registerPluginCommands();
        });
    }

    registerPluginCommands() {
        this.addGlobalCommands();

        // @ts-ignore
        const manifests = this.app.plugins.manifests;

        for (const pluginId in manifests) {
            // Don't add commands for this plugin itself.
            if (pluginId === this.manifest.id) {
                continue;
            }

            const manifest = manifests[pluginId];
            const pluginName = manifest.name;

            // ADD ENABLE COMMAND
            this.addCommand({
                id: `enable-${pluginId}`,
                name: `Enable: ${pluginName}`,
                callback: async () => {
                    // @ts-ignore
                    await this.app.plugins.enablePlugin(pluginId);
                    new Notice(`Plugin enabled: ${pluginName}`);
                }
            });

            // ADD DISABLE COMMAND
            this.addCommand({
                id: `disable-${pluginId}`,
                name: `Disable: ${pluginName}`,
                callback: async () => {
                    // @ts-ignore
                    await this.app.plugins.disablePlugin(pluginId);
                    new Notice(`Plugin disabled: ${pluginName}`);
                }
            });

            // ADD RELOAD COMMAND
            this.addCommand({
                id: `reload-${pluginId}`,
                name: `Reload: ${pluginName}`,
                callback: async () => {
                    // @ts-ignore
                    await this.app.plugins.disablePlugin(pluginId);
                    // @ts-ignore
                    await this.app.plugins.enablePlugin(pluginId);
                    new Notice(`Plugin reloaded: ${pluginName}`);
                }
            });
        }
    }

    addGlobalCommands() {
        this.addCommand({
            id: 'disable-all-remember',
            name: 'Disable ALL plugins (remembering active ones)',
            callback: async () => {
                // @ts-ignore
                const enabledPlugins = Object.keys(this.app.plugins.plugins);
                this.settings.lastActivePlugins = enabledPlugins.filter(p => p !== this.manifest.id);
                await this.saveSettings();

                for (const pluginId of enabledPlugins) {
                    if (pluginId === this.manifest.id && !this.settings.disableSelf) {
                        continue;
                    }
                    // @ts-ignore
                    await this.app.plugins.disablePlugin(pluginId);
                }
            }
        });

        this.addCommand({
            id: 'reenable-remembered',
            name: 'Re-enable remembered plugins',
            callback: async () => {
                const pluginsToEnable = [...this.settings.lastActivePlugins];
                this.settings.lastActivePlugins = [];
                await this.saveSettings();

                for (const pluginId of pluginsToEnable) {
                    // @ts-ignore
                    await this.app.plugins.enablePlugin(pluginId);
                }
            }
        });
    }

    onunload() {
        // Obsidian automatically unregisters all commands on unload.
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class PluginsTogglerSettingTab extends PluginSettingTab {
    plugin: PluginsToggler;

    constructor(app: App, plugin: PluginsToggler) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName('Disable self with ALL commands')
            .setDesc('If enabled, this plugin will also be disabled when using \'Disable ALL plugins\' commands.')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.disableSelf)
                .onChange(async (value) => {
                    this.plugin.settings.disableSelf = value;
                    await this.plugin.saveSettings();
                }));
    }
}