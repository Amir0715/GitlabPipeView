import "../../declaration/gitlab.d.ts";

const variantsMap = {
    success: "success",
    running: "info",
    failed: "danger",
    created: "neutral",
    canceled: "neutral", 
    skipped: "neutral",
} as const;

// Type guard для проверки ключа
function isValidStatusGroup(group: string): group is keyof typeof variantsMap {
    return group in variantsMap;
}

export function getVariant(status: Gitlab.Status): string {
    if (isValidStatusGroup(status.group)) {
        return variantsMap[status.group];
    }
    return "neutral";
}