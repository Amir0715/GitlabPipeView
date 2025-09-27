<script>
    let { icon, classes, ...others } = $props();
    function gitlabIcon(name) {
        return gon.sprite_icons + "#" + name;
    }
</script>

<svg class="gl-icon gl-fill-current s16 {classes}" {...others} ><use href={gitlabIcon(icon)}></use></svg>
