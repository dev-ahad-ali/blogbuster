export interface BlogFrontmatter {
    title: string;
    pubDate: Date;
    description: string;
    author: string;
    tags: string[];
    image?: string;
}

export interface Heading {
    depth: number;
    slug: string;
    text: string;
}

export interface RenderMetadata {
    headings: Heading[];
    localImagePaths: string[];
    remoteImagePaths: string[];
    frontmatter: BlogFrontmatter;
    imagePaths: string[];
}

export interface RenderedContent {
    html: string;
    metadata: RenderMetadata;
}

export interface BlogPost {
    id: string;
    data: BlogFrontmatter;
    body: string;
    filePath: string;
    digest: string;
    rendered: RenderedContent;
    collection: "blog";
}

export interface BlogPostParams {
    slug: string;
}

export interface BlogPostPath {
    params: BlogPostParams;
    props: {
        post: BlogPost;
    };
}

export interface BlogPostSummary {
    id: string;
    slug: string;
    data: BlogFrontmatter;
}

export interface BlogQueryOptions {
    tag?: string;
    tags?: string[];
    author?: string;
    limit?: number;
    sortBy?: "pubDate" | "title";
    sortOrder?: "asc" | "desc";
}

export function isBlogPost(value: any): value is BlogPost {
    return (
        typeof value === "object" &&
        value !== null &&
        typeof value.id === "string" &&
        typeof value.data === "object" &&
        typeof value.body === "string" &&
        typeof value.collection === "string" &&
        value.collection === "blog"
    );
}

export type BlogCollectionEntry = {
    id: string;
    slug: string;
    body: string;
    collection: "blog";
    data: BlogFrontmatter;
};
