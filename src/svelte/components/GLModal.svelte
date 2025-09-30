<script lang="ts">
    import GLIcon from "./GLIcon.svelte";

    let { title, children, isShow = false, onClose, isLoading = false } = $props();
</script>

{#if isShow}
    <div class="position: absolute; z-index: 1040;">
        <div class="modal fade show d-block gl-modal global-search-modal">
            <div class="modal-dialog modal-dialog-scrollable modal-xl" style="max-width: 1400px;">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title">
                            {title}
                        </div>
                        <button
                            class="btn btn-default btn-default-tertiary btn-icon btn-md gl-button"
                            onclick={onClose}
                        >
                            <GLIcon icon="close" />
                        </button>
                    </div>
                    <div class="modal-body">
                        {#if isLoading}
                            Loading...
                        {:else}  
                            {@render children?.()}
                        {/if}
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop"></div>
    </div>
{/if}
