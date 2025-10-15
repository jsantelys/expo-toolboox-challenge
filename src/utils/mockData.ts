type CarouselType = "thumb" | "poster";

interface CarouselItem {
    title: string;
    imageUrl: string;
    videoUrl?: string;
    description: string;
}

interface Carousel {
    title: string;
    type: CarouselType;
    items: CarouselItem[];
}

// ✅ Sample videos with multiple formats
const videoSamples = [
    // MP4 videos
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", format: "MP4" },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", format: "MP4" },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", format: "MP4" },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", format: "MP4" },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", format: "MP4" },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", format: "MP4" },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4", format: "MP4" },
    // M3U8 videos (HLS streaming)
    { url: "https://d11gqohmu80ljn.cloudfront.net/128/media-20210712191955-cbdi-0.m3u8/master.m3u8", format: "M3U8" },
    // WebM videos
    { url: "https://dl11.webmfiles.org/big-buck-bunny_trailer-.webm", format: "WebM" },
    { url: "https://dl6.webmfiles.org/elephants-dream.webm", format: "WebM" },
    // AVI videos
    { url: "https://learningcontainer.com/wp-content/uploads/2020/05/sample-avi-file.avi", format: "AVI" },
    { url: "https://filesamples.com/samples/video/avi/sample_1280x720_surfing_with_audio.avi", format: "AVI" },
    // MOV videos
    { url: "https://filesamples.com/samples/video/mov/sample_640x360.mov", format: "MOV" }
];

const descriptions = [
    "An emotional journey filled with mystery and awe, where every step unveils a hidden truth about the world and the human heart. As the story unfolds, the characters are pushed beyond their limits, facing not only external challenges but also the quiet battles within themselves. It's a tale that lingers long after the final moment, blending wonder with melancholy in a way that feels both intimate and grand.",
    "Fast-paced action with stunning visuals.",
    "A heartfelt story about courage and discovery, following a young dreamer who dares to challenge fate itself. Through breathtaking landscapes and unexpected encounters, the narrative explores what it truly means to stand by one’s convictions even when the odds seem impossible. Every decision becomes a reflection of hope, loss, and the relentless human spirit.",
    "A dramatic short exploring love and destiny — two souls connected by a thread of time, crossing paths again and again in different lives. The film captures fleeting moments of beauty, heartbreak, and recognition, weaving them into a single emotional crescendo that questions whether love is bound by time or transcends it entirely.",
    "An adventure through time and perception, where reality bends and memory fractures. The protagonist’s journey becomes a reflection of their fractured mind — a labyrinth of possibilities and timelines that twist together in dazzling, unpredictable ways. Each revelation pulls them deeper into a question of identity: are they changing the world, or is the world changing them?",
    "A surreal exploration of dreams and memory that drifts between light and darkness. Visually poetic and emotionally charged, it blurs the line between what’s imagined and what’s remembered. The story unfolds like a waking dream — familiar yet haunting — asking whether the past we recall is truly ours or a construct shaped by longing and regret.",
    "A story of friendship, struggle, and triumph that captures the raw emotion of growing together through hardship. Against a backdrop of uncertainty and chaos, unlikely allies find strength in one another, proving that unity can emerge from even the most fractured beginnings. It’s a tribute to resilience and the bonds that outlast every storm.",
    "A mix of humor and intensity in a vivid world of eccentric characters and colorful chaos. Beneath the laughter lies a sharp critique of ambition and desire, painting a picture both hilarious and deeply human. Its quick pacing and witty tone give way to moments of genuine reflection that sneak up on the viewer when least expected.",
    "A gripping story of survival and hope in the face of overwhelming odds. Every scene is charged with tension and emotion as the characters navigate both physical danger and moral compromise. Through quiet acts of kindness and devastating losses, the narrative builds toward a powerful message — that hope, fragile as it may be, is what makes survival meaningful.",
    "A lighthearted escapade filled with color and music."
];

function getImageSize(type: CarouselType) {
    return type === "thumb"
        ? { w: 640, h: 480 }
        : { w: 320, h: 480 };
}

function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function generateMockCarousels(
    count: number = 6,
    itemsPerCarousel: number = 10
): Carousel[] {
    const types: CarouselType[] = ["thumb", "poster"];
    const carousels: Carousel[] = [];

    // Track how many times each format has been used to create unique titles
    const formatCounters: { [key: string]: number } = {};

    for (let i = 0; i < count; i++) {
        const type = types[i % types.length]; // alternate between thumb/poster
        const { w, h } = getImageSize(type);

        const items: CarouselItem[] = Array.from({ length: itemsPerCarousel }).map(
            (_, idx) => {
                const hasVideo = Math.random() > 0.25; // ~25% missing video
                let title = `Movie ${idx + 1}`;
                let videoUrl: string | undefined = undefined;

                if (hasVideo) {
                    const videoSample = getRandom(videoSamples);
                    videoUrl = videoSample.url;

                    // Update counter for this format
                    if (!formatCounters[videoSample.format]) {
                        formatCounters[videoSample.format] = 0;
                    }
                    formatCounters[videoSample.format]++;

                    // Include format in title
                    title = `${videoSample.format} ${formatCounters[videoSample.format]}`;
                }

                const baseDescription = getRandom(descriptions);
                const description = videoUrl
                    ? `${baseDescription}\n\n[DEBUG] Video URL: ${videoUrl}`
                    : baseDescription;

                return {
                    title,
                    imageUrl: `https://picsum.photos/seed/${type}-${i}-${idx}/${w}/${h}`,
                    description,
                    videoUrl
                };
            }
        );

        carousels.push({
            title: `Carousel ${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
            type,
            items
        });
    }

    return carousels;
}
