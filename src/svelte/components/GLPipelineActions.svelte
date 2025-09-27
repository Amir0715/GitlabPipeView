<script>
  let { pipeline } = $props();

  const handleCancel = () => {
    // Логика отмены пайплайна
    console.log("Cancel pipeline", pipeline.id);
  };
</script>

<div class="gl-text-right">
  {#if pipeline.flags.cancelable}
    <button
      title="Cancel pipeline"
      onclick={handleCancel}
      class="btn gl-button btn-danger btn-md btn-icon"
    >
      <svg class="gl-button-icon gl-icon s16 gl-fill-current">
        <use href={`${gon.sprite_icons}#cancel`}></use>
      </svg>
    </button>
  {/if}
</div>
