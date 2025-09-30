# PipeView

A Tampermonkey userscript that enhances GitLab group pages by adding a modal window to view and monitor pipelines across all projects within a group.

[![Install GitlabPipeView](https://img.shields.io/badge/Install-GitlabPipeView-brightgreen)](https://github.com/Amir0715/GitlabPipeView/releases/latest/download/gitlab-pipeview.user.js)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Amir0715/GitlabPipeView)
![GitHub Releases](https://img.shields.io/github/downloads/Amir0715/GitlabPipeView/latest/total)

## Overview
GitlabPipeView provides a comprehensive overview of pipeline statuses across all projects in a GitLab group. It automatically discovers all projects (including nested subgroups) and displays their latest pipelines in a unified interface with real-time updates.

![PipeView dashboard](/imgs/example.png)

## Features
- 🔍 Automatic Project Discovery - Recursively finds all projects within a group and its subgroups
- 📊 Unified Pipeline Dashboard - View all pipelines from multiple projects in one place
- 🔄 Auto-Refresh - Automatic pipeline status updates every 30 seconds
- ⚡ Real-time Status - Live pipeline status with visual indicators
- 📱 GitLab-native UI - Seamlessly integrates with GitLab's design system

## Installation
### Prerequisites
- Tampermonkey browser extension
- GitLab instance access (GitLab.com or self-hosted)

### Steps
1. [Install Tampermonkey](https://www.tampermonkey.net/index.php)
2. Click the installation [link](https://github.com/Amir0715/GitlabPipeView/releases/latest/download/gitlab-pipeview.user.js)
3. Tampermonkey will open and show the script preview - click "Install"
4. Navigate to any GitLab group page to see the new "Pipelines" button


## Usage

Accessing the Feature:
- Navigate to any GitLab group page
- Look for the new "Pipelines" button in the group actions area
- Click to open the pipelines modal

Using the Modal:
- View all pipelines from all projects in the group
- Use the auto-refresh toggle to enable/disable automatic updates
- Click on any pipeline to navigate to its detailed view
- Use cancel buttons to stop running pipelines (if permitted)

Auto-Refresh:
- Enabled by default when modal is open
- Updates every 30 seconds
- Toggle with the refresh/pause icon in the actions column

## Technical Details

Built With
- Svelte 5 - Reactive UI framework
- TypeScript - Type-safe development
- Tampermonkey API - Browser extension integration
- GitLab API - Pipeline and project data

## Development
This project uses [TamperBuilder](https://github.com/vivelarepublique/TamperBuilder) - a fantastic toolkit for building Tampermonkey scripts with Svelte.

### Building from Source

```
# Clone the repository
git clone git@github.com:Amir0715/GitlabPipeView.git
cd GitlabPipeView

# Install dependencies
npm install

# Build user script
npm run build

# install user-script `/release/gitlab-pipeview.user.js` in Tampermonkey
```