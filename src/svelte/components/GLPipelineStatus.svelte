<script lang="ts">
  import "../../declaration/gitlab.d.ts";
  import { getVariant } from "../../common/utils/gitlab";
  import GLDateTime from "./GLDateTime.svelte";
  import GLDuration from "./GLDuration.svelte";

  let { pipeline } = $props<{
    pipeline: Gitlab.Pipeline;
  }>();
</script>

<div>
  <a
    href={pipeline.path}
    class="ci-icon gl-inline-flex gl-items-center gl-text-sm gl-mb-2 ci-icon-variant-{getVariant(pipeline.details.status)}"
  >
    <span class="ci-icon-gl-icon-wrapper">
      <svg class="gl-icon s16 gl-fill-current">
        <use href={`${gon.sprite_icons}#${pipeline.details.status.icon}`}></use>
      </svg>
    </span>
    <span
      class="gl-ml-2 gl-mr-3 gl-self-center gl-whitespace-nowrap gl-leading-1"
    >
      {pipeline.details.status.text}
    </span>
  </a>

  {#if pipeline.details.duration || pipeline.details.finished_at}
    <div
      class="gl-display-flex gl-flex-direction-column gl-align-items-flex-end gl-lg-align-items-flex-start gl-font-sm"
    >
      {#if pipeline.details.duration}
        <p
          class="gl-inline-flex gl-align-items-center gl-text-secondary gl-m-0 gl-whitespace-nowrap"
        >
          <svg class="gl-mr-2 gl-icon s12 gl-fill-current">
            <use href={`${gon.sprite_icons}#timer`}></use>
          </svg>
          <GLDuration seconds={pipeline.details.duration} />
        </p>
      {/if}
      {#if pipeline.details.finished_at}
        <p
          class="gl-inline-flex gl-align-items-center gl-text-secondary gl-m-0 gl-whitespace-nowrap"
        >
          <svg class="gl-mr-2 gl-icon s12 gl-fill-current">
            <use href={`${gon.sprite_icons}#calendar`}></use>
          </svg>
          <GLDateTime dateTime={pipeline.details.finished_at} />
        </p>
      {/if}
    </div>
  {/if}
</div>
