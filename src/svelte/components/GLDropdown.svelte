<script lang="ts">
    let { title, options } = $props();
</script>

<button
    type="button"
    class="btn btn-default btn-md btn-block gl-button gl-new-dropdown-toggle"
>
    <span class="gl-button-text gl-w-full"
        ><span class="gl-new-dropdown-button-text"> Updated date </span>
        <svg
            data-testid="chevron-down-icon"
            role="img"
            aria-hidden="true"
            class="gl-button-icon gl-new-dropdown-chevron gl-icon s16 gl-fill-current"
            ><use
                href="/assets/icons-454317f5123bdb93dcb695c6092c458fb0ec6c862d0a56857aefa1c73469f743.svg#chevron-down"
            ></use>
        </svg>
    </span>
</button>
