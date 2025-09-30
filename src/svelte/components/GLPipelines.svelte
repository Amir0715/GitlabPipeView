<script lang="ts">
    import "../../declaration/gitlab.d.ts";
    import { onMount } from "svelte";
    import GLPipelineRow from "./GLPipelineRow.svelte";
    import GLIcon from "./GLIcon.svelte";

    let { projects } = $props();
    let pipelines: Gitlab.Pipeline[] = $state([]);
    let isLoading = $state(false);
    let error = $state<string | null>(null);

    let autoRefresh = $state<boolean>(false);
    let lastRefresh = $state<Date | null>(null);
    const REFRESH_INTERVAL_MS = 30000;
    let refreshTimer: number | null = null;
    let isEffectRunning = false;

    // Один главный эффект для управления авто-обновлением
    $effect(() => {
        if (isEffectRunning) return;
        isEffectRunning = true;

        // Очищаем предыдущий таймер
        if (!autoRefresh && refreshTimer) {
            window.clearInterval(refreshTimer);
            refreshTimer = null;
            console.log("Авто-обновление отключено (эффект)");
        }

        // Если авто-обновление включено и есть проекты - настраиваем таймер
        if (refreshTimer === null && autoRefresh) {
            refreshTimer = window.setInterval(() => {
                console.log("Авто-обновление пайплайнов...");
                loadPipelinesFromAllProjects();
            }, REFRESH_INTERVAL_MS);
            
            console.log(`Авто-обновление включено (интервал: ${REFRESH_INTERVAL_MS}ms)`);
        }

        isEffectRunning = false;

        // Функция очистки при изменении зависимостей или размонтировании
        return () => {
            if (refreshTimer) {
                window.clearInterval(refreshTimer);
                refreshTimer = null;
                console.log("Авто-обновление отключено (cleanup)");
            }
        };
    });

    // Загрузка при монтировании (если projects уже есть)
    onMount(() => {
        if (projects && projects.length > 0) {
            loadPipelinesFromAllProjects();
        }

        // Очистка при размонтировании компонента
        return () => {
            if (refreshTimer) {
                window.clearInterval(refreshTimer);
                refreshTimer = null;
            }
        };
    });

    async function loadPipelinesFromAllProjects() {
        if (isLoading) return; // Предотвращаем параллельные запросы
        if (projects === null || projects.length === 0) return;

        isLoading = true;
        error = null;

        try {
            let promises: Promise<Gitlab.Pipeline[]>[] = [];
            for (const project of projects) {
                promises.push(fetchPipelines(project.relative_path));
            }

            let pipelinesArrays = await Promise.all(promises);
            console.log(pipelinesArrays);
            pipelines = pipelinesArrays
                .flatMap((x) => x)
                .sort(
                    (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime(),
                );
            lastRefresh = new Date();
            console.log("Загруженые пайплайны: ", pipelines);
        } catch (err) {
            error = err instanceof Error ? err.message : "Неизвестная ошибка";
            console.error("Ошибка загрузки пайплайнов:", err);
        } finally {
            isLoading = false;
        }
    }

    async function fetchPipelines(
        projectRelativePath: string,
    ): Promise<Gitlab.Pipeline[]> {
        const response = await fetch(`${projectRelativePath}/-/pipelines.json`);
        if (!response.ok) {
            console.error("Error while trying fetch pipline", response.statusText)
            return [];
        }

        console.log("Response:", response);

        const pipelinesResponse: Gitlab.Pipelines = await response.json();
        return pipelinesResponse.pipelines;
    }

    // Функция для ручного обновления
    function refreshPipelines() {
        loadPipelinesFromAllProjects();
    }

    // Включение/выключение авто-обновления
    function toggleAutoRefresh() {
        autoRefresh = !autoRefresh;
        console.log("(toggleAutoRefresh) autoRefresh:", autoRefresh);
    }

    // Форматирование интервала для отображения
    function formatInterval(ms: number): string {
        const seconds = ms / 1000;
        return `${seconds}s`;
    }
</script>

<div style="max-height: calc(100vh - 14rem);">
    {#if projects.length === 0}
        <div class="empty-state">
            <span>Current group is empty</span>
        </div>
    {:else if isLoading && pipelines.length === 0}
        <div class="loading-state">
            <span>Loading...</span>
        </div>
    {:else if error}
        <div class="error-state">
            <span>Error: {error}</span>
            <button onclick={refreshPipelines} class="btn btn-default">Retry</button>
        </div>
    {:else if pipelines.length === 0}
        <div class="empty-state">
            <span>Empty</span>
        </div>
    {:else}
    <div class="ci-table">
        <table class="b-table b-table-fixed b-table-stacked-lg gl-table table">
            <colgroup>
                <col class="gl-w-6/20" />
                <col class="gl-w-3/20" />
                <col class="gl-w-6/20" />
                <col class="gl-w-3/20" />
                <col class="gl-w-5/20" />
                <col class="gl-w-4/20" />
            </colgroup>
            <thead>
                <tr>
                    <th>
                        <div>Project</div>
                    </th>
                    <th>
                        <div>Status</div>
                    </th>
                    <th>
                        <div>Pipeline</div>
                    </th>
                    <th>
                        <div>Created by</div>
                    </th>
                    <th>
                        <div>Stages</div>
                    </th>
                    <th>
                        <div class="d-inline-flex gl-gap-x-5">
                            <span class="gl-block">Actions</span>
                            <button class="btn btn-default btn-default-tertiary btn-icon gl-new-dropdown-icon-only" onclick={toggleAutoRefresh} title="autorefresh: {autoRefresh ? 'on' : 'off'}">
                                <GLIcon icon={autoRefresh ? 'retry' : 'pause'} classes="gl-button-icon"/>
                            </button>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each pipelines as pipeline}
                    <GLPipelineRow {pipeline} />
                {/each}
            </tbody>
        </table>
    </div>
    {/if}
</div>