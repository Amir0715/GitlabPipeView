<script lang="ts">
  import "../../declaration/gitlab.d.ts";

  import PipelineStatus from "./GLPipelineStatus.svelte";
  import PipelineInfo from "./GLPipelineInfo.svelte";
  import PipelineStages from "./GLPipelineStages.svelte";
  import PipelineActions from "./GLPipelineActions.svelte";

  let { pipeline } = $props<{
    pipeline: Gitlab.Pipeline;
  }>();
</script>

<tr class="!gl-border-b">
  <td class="!gl-border-none">
    <a
      href={pipeline.project.full_path}
      class="gl-flex gl-items-center gl-gap-3 gl-py-2 gl-font-semibold gl-text-default !gl-no-underline focus:gl-focus gl-px-2 gl-rounded-base gl-avatar-identicon gl-avatar-identicon-bg{(pipeline.project.id % 7) + 1}"
      ><div class="gl-flex gl-h-6 gl-w-6 gl-shrink-0 gl-w-6 gl-self-start">
        <div class="gl-avatar gl-avatar-identicon gl-avatar-s24 gl-avatar-identicon-bg{(pipeline.project.id % 7) + 1}" >
          {pipeline.project.name[0].toUpperCase()}
        </div>
      </div>
      <div class="gl-grow gl-text-default gl-break-anywhere nav-item-link-label">
        {pipeline.project.full_name}
      </div>
    </a>
  </td>
  <td class="!gl-border-none">
    <PipelineStatus {pipeline} />
  </td>
  <td class="!gl-border-none">
    <PipelineInfo {pipeline} />
  </td>
  <td class="!gl-border-none @max-lg/panel:!gl-hidden">
    <div>
      <a
        href={pipeline.user.path}
        title={pipeline.user.name}
        class="gl-avatar-link gl-ml-3 gl-link"
      >
        <img
          src={pipeline.user.avatar_url}
          alt="avatar"
          class="gl-avatar gl-avatar-circle gl-avatar-s32"
        />
      </a>
    </div>
  </td>
  <td class="!gl-border-none">
    <PipelineStages stages={pipeline.details.stages} />
  </td>
  <td class="!gl-border-none">
    <PipelineActions {pipeline} />
  </td>
</tr>
