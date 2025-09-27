<script lang="ts">
    import GlButton from "./components/GLButton.svelte";
    import GlModal from "./components/GLModal.svelte";

    import { onMount } from "svelte";
    import GlPipelines from "./components/GLPipelines.svelte";
    let showBtns = $state(false);
    let showPiplinesModal = $state(false);
    let projects = $state([]);

    onMount(async () => {
        console.log("Приложение замунтилось");
        let sidebarHeader = document.querySelector(
            "#super-sidebar-context-header",
        );
        if (sidebarHeader?.textContent.trim().toLowerCase() === "group") {
            showBtns = true;
            projects = await getRecursiveProjects(location.pathname);
            console.log('Все проекты собранные рекурсивно:', projects);
        }
    });

    async function getRecursiveProjects(group_path: string): Promise<any> {
        let totalProjects = [];
        let childrenUrl = `${location.origin}/groups${group_path}/-/children.json?sort=latest_activity_desc`;

        let response = await fetch(childrenUrl);
        let childrens = await response.json();
        let childrenProjectPromises = [];
        
        for (const children of childrens) {
            if (children.type === 'group') {
                childrenProjectPromises.push(getRecursiveProjects(children.relative_path));
            }
            if (children.type === 'project') {
                totalProjects.push(children);
            }
        }

        let childrenProjects = await Promise.all(childrenProjectPromises);
        totalProjects.push(...childrenProjects.flatMap(x => x));

        return totalProjects;
    }
</script>

{#if showBtns}
    <GlButton
        title="Piplines"
        onclick={() => (showPiplinesModal = !showPiplinesModal)}
        targetElement="div[data-testid='group-buttons']"
    />
{/if}

<GlModal title='Group piplines' isShow={showPiplinesModal} onClose={() => (showPiplinesModal = false)}>
    <GlPipelines projects={projects}/>
</GlModal>