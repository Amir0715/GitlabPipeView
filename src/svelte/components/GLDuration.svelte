<script lang="ts">
    interface Props {
        seconds: number;
    }

    let { seconds } = $props<Props>();

    function formatDuration(secs: number): string {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor((secs % 3600) / 60);
        const remainingSeconds = secs % 60;

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            remainingSeconds.toString().padStart(2, "0"),
        ].join(":");
    }
</script>

<span class="duration">
    {formatDuration(seconds)}
</span>

<style>
    .duration {
        font-family: monospace;
        font-variant-numeric: tabular-nums;
    }
</style>
