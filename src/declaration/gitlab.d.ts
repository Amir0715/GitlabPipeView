declare namespace Gitlab {
    enum Visibility {
        private,
        public,
        internal
    }

    enum ChildrenType {
        project,
        group
    }

    interface Children {
        id: number;
        name: string;
        description: string;
        visibility: Visibility;
        full_name: string;
        created_at: Date;
        updated_at: Date;
        avatar_url: string;
        type: ChildrenType;
        can_edit: boolean;
        edit_path: string;
        relative_path: string;
        permission: any;
        last_activity_at: Date;
        star_count: number;
        archived: boolean;
        markdown_description: string;
        marked_for_deletion: boolean;
        compliance_management_frameworks: any[];
    }

    export interface Jobs {
        id: number;
        iid: number;
        user: User;
        active: boolean;
        name: null;
        source: string;
        created_at: Date;
        updated_at: Date;
        path: string;
        flags: { [key: string]: boolean };
        details: Details;
        ref: Ref;
        commit: Commit;
        delete_path: string;
        failed_builds_count: number;
        project: Project;
        triggered_by: null;
        triggered: any[];
    }

    export interface Commit {
        id: string;
        short_id: string;
        created_at: Date;
        parent_ids: string[];
        title: string;
        message: string;
        author_name: string;
        author_email: string;
        authored_date: Date;
        committer_name: string;
        committer_email: string;
        committed_date: Date;
        trailers: Trailers;
        extended_trailers: Trailers;
        web_url: string;
        author: User;
        author_gravatar_url: string;
        commit_url: string;
        commit_path: string;
    }

    export interface User {
        id: number;
        username: string;
        name: string;
        state: string;
        locked: boolean;
        avatar_url: string;
        web_url: string;
        show_status: boolean;
        path: string;
    }

    export interface Trailers {
    }

    export interface Details {
        status: Status;
        stages: Stage[];
        duration: number;
        finished_at: Date;
        event_type_name: string;
        has_manual_actions: boolean;
        has_scheduled_actions: boolean;
    }

    export interface Stage {
        name: string;
        title: string;
        status: Status;
        path: string;
        dropdown_path: string;
    }

    export interface Status {
        icon: string;
        text: string;
        label: string;
        group: string;
        tooltip: string;
        has_details: boolean;
        details_path: string;
        illustration: null;
        favicon: string;
    }

    export interface Project {
        id: number;
        name: string;
        full_path: string;
        full_name: string;
        refs_url: string;
    }

    export interface Ref {
        name: string;
        path: string;
        tag: boolean;
        branch: boolean;
        merge_request: boolean;
    }

    export interface Pipelines {
        pipelines: Pipeline[];
        count: Count;
    }

    export interface Count {
        all: string;
    }

    export interface Pipeline {
        id: number;
        iid: number;
        user: User;
        active: boolean;
        name: null;
        source: string;
        created_at: Date;
        updated_at: Date;
        path: string;
        flags: Flags;
        details: Details;
        ref: Ref;
        commit: Commit;
        delete_path: string;
        failed_builds_count: number;
        pipeline_schedule: null;
        project: Project;
        triggered_by: null;
        triggered: any[];
    }

    export interface User {
        id: number;
        username: string;
        public_email: string;
        name: string;
        state: string;
        locked: boolean;
        avatar_url: string;
        web_url: string;
        show_status: boolean;
        path: string;
    }

    export interface Trailers {
    }

    export interface Details {
        status: Status;
        stages: Stage[];
        duration: number;
        finished_at: Date;
        event_type_name: string;
        has_manual_actions: boolean;
        has_scheduled_actions: boolean;
    }

    export interface Stage {
        name: string;
        id: number;
        title: string;
        status: Status;
        path: string;
        dropdown_path: string;
    }

    export interface Status {
        icon: string;
        text: string;
        label: string;
        group: string;
        tooltip: string;
        has_details: boolean;
        details_path: string;
        illustration: null;
        favicon: string;
    }

    export interface Flags {
        stuck: boolean;
        auto_devops: boolean;
        merge_request: boolean;
        yaml_errors: boolean;
        retryable: boolean;
        cancelable: boolean;
        failure_reason: boolean;
        detached_merge_request_pipeline: boolean;
        merge_request_pipeline: boolean;
        merged_result_pipeline: boolean;
        type: string;
        merge_train_pipeline: boolean;
        latest: boolean;
    }

    export interface Project {
        id: number;
        name: string;
        full_path: string;
        full_name: string;
        refs_url: string;
        forked: null;
    }

    export interface Ref {
        name: string;
        path: string;
        tag: boolean;
        branch: boolean;
        merge_request: boolean;
    }
}