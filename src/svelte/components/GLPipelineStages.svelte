<script lang="ts">
  import "../../declaration/gitlab.d.ts";
  import { getVariant } from "../../common/utils/gitlab";

  let { stages } = $props<{
    stages: Gitlab.Stage[]
  }>();
</script>

<div class="gl-inline gl-align-middle">
  {#each stages as stage}
    <div class="pipeline-mini-graph-stage-container gl-inline-flex gl-mr-2 gl-my-1 gl-align-middle">
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <a title={stage.title} class="btn gl-button btn-link btn-md" href={stage.path}>
        <span class="gl-button-text">
          <span class="ci-icon gl-inline-flex gl-items-center gl-text-sm ci-icon-variant-{getVariant(stage.status)}">
            <span class="ci-icon-gl-icon-wrapper">
              <svg class="gl-icon s16 gl-fill-current">
                <use href={`${gon.sprite_icons}#${stage.status.icon}`}></use>
              </svg>
            </span>
          </span>
        </span>
      </a>
    </div>
  {/each}
</div>