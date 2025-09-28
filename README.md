# Description
This plugin enables, disables or reloads any installed [Obsidian](https://github.com/obsidianmd)'s plugin via the command palette. It can also disable all plugins and remember which ones were active to re-enable them with the another command later.

It works on computer and mobile and it's useful to enable and disable rarely used plugins, but also for debuggin other plugins by using `Disable ALL plugins (remembering active ones)` and `Re-enable remembered plugins` commands
# Installation
## Manual
1. Go to the [latest release page](https://github.com/ALE-ARME/Plugins-Toggler/releases/latest)
2. Download `main.js` and `manifest.js`
3. Go to `YourVaultName/.obsidian/plugins`
4. Create a folder named `plugins-toggler`
5. Put `main.js` and `manifest.js` in the `plugins-toggler` folder
6. Go to `Obsidian's Community Plugins` tab in Obsidian's settings and reload the plugins list
7. Enable the plugin
## From Community Plugins Tab
It's not available there currently, but i've submitted it
# Configuration
In the settings if you toggle off the only option present, when you'll use the command to disable all the plugins, Plugins Toggler will not be disabled.

A `data.json` file will be created containing the values of the above choice
# Usage
1.  Open the command palette (Ctrl/Cmd + P)
2.  Search for `Plugins Toggler` to see all the available commands
3.  Select the desired command to toggle the state of a plugin
## Other commands
- `Disable ALL plugins (remembering active ones)`: it disables all the plugins (except `Plugins Toggler` if you have toggled off the only setting) and saves in the `data.json` the ones which where active
    - This command adds to the `data.json` all the IDs of the plugins you had enabled so it remembers them
    - When this command is used, the list of currently active plugins is saved. If you use this command again, the previously saved list will be overwritten with the new set of active plugins 
- `Re-enable remembered plugins`: it re-enables the plugin which you had enabled before runnign the `Disable ALL plugins (remembering active ones)` command so you don't have to waste time remembering which ones were active
# Uninstallation
1. Disable the plugin
2. Go to `YourVaultName/.obsidian/plugins`
3. Delete the folder `plugins-toggler`
# Disclaimer
- This plugin was made by `gemini-2.5-flash` and `gemini-2.5-pro` through [gemini-cli](https://github.com/google-gemini/gemini-cli)
- If you face any problem open an issue (i don't guarantee i'll be able to fix it, but atleast other people can see what issues the plugin has before installing it)
# My other plugin
- [Hey, Wake Up!](https://github.com/ALE-ARME/Hey-Wake-Up)
