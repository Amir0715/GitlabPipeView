<script lang="ts">
  import "../../declaration/gitlab.d.ts";

  let { pipeline } = $props<{pipeline: Gitlab.Pipeline}>();
</script>

<div class="pipeline-tags">
  <div class="commit-title gl-mb-2">
    <span class="gl-flex">
      <span class="gl-min-w-0 gl-grow gl-truncate">
        <a href={pipeline.commit.commit_path} class="commit-row-message gl-link">
          {pipeline.commit.title}
        </a>
      </span>
    </span>
  </div>
  
  <div class="gl-mb-2">
    <a href={pipeline.path} class="gl-mr-1 gl-link">#{pipeline.id}</a>
    
    <div class="gl-inline-flex gl-rounded-base gl-bg-strong gl-px-2">
      <span class="gl-min-w-0">
        <svg class="gl-icon s12 gl-fill-icon-subtle">
          <use href={`${gon.sprite_icons}#branch`}></use>
        </svg>
        <a href={pipeline.ref.path} class="gl-text-sm gl-font-monospace gl-link">
          {pipeline.ref.name}
        </a>
      </span>
    </div>
    
    <div class="gl-inline-block gl-rounded-base gl-bg-strong gl-px-2 gl-text-sm">
      <svg class="gl-mr-1 gl-icon s12 gl-fill-icon-subtle">
        <use href={`${gon.sprite_icons}#commit`}></use>
      </svg>
      <a href={pipeline.commit.path} class="gl-text-sm gl-font-monospace gl-link">
        {pipeline.commit.short_id}
      </a>
    </div>
    
    <a href={(pipeline.commit.author?.web_url ?? pipeline.commit.author_email)} class="gl-avatar-link gl-ml-1 gl-link">
      <img src={pipeline.commit.author_gravatar_url} alt={pipeline.commit.author_name} class="gl-avatar gl-avatar-circle gl-avatar-s16">
    </a>
  </div>
  
  <div class="label-container gl-mt-1 gl-flex gl-flex-wrap gl-gap-2">
    {#if pipeline.flags.latest}
      <span class="gl-badge badge badge-pill badge-success">
        <span class="gl-badge-content">latest</span>
      </span>
    {/if}
    {#if pipeline.flags.type === 'branch'}
      <span class="gl-badge badge badge-pill badge-info">
        <span class="gl-badge-content">branch</span>
      </span>
    {/if}
  </div>
</div>