import type { CollectionEntry } from 'astro:content';

interface Post {
  title: string;
  category: string;
  telegramPostId: string;
  imageUrl: string;
  date?: string;
}

interface NewsItem {
  title: string;
  category: string;
  telegramPostId: string;
  imageUrl: string;
  date: string;
}

interface VideoItem {
  title: string;
  telegramPostId: string;
  imageUrl: string;
}

interface ConcertItem {
  band: string;
  telegramPostId: string;
  imageUrl: string;
  date: string;
}

export async function getLatestPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  
  try {
    // Import all content files
    const newsModule = await import('../pages/news.astro');
    const videosModule = await import('../pages/videos.astro');
    const concertsModule = await import('../pages/concerts.astro');

    // Add 3 latest news posts
    const newsItems: NewsItem[] = newsModule.default?.props?.latestNews || [];
    posts.push(...newsItems
      .sort((a, b) => parseInt(b.telegramPostId) - parseInt(a.telegramPostId))
      .slice(0, 3)
      .map(item => ({
        title: item.title,
        category: item.category,
        telegramPostId: item.telegramPostId,
        imageUrl: item.imageUrl,
        date: item.date
      })));

    // Add 3 latest video posts
    const videoItems: VideoItem[] = videosModule.default?.props?.videoReviews || [];
    posts.push(...videoItems
      .sort((a, b) => parseInt(b.telegramPostId) - parseInt(a.telegramPostId))
      .slice(0, 3)
      .map(item => ({
        title: item.title,
        category: 'Клип',
        telegramPostId: item.telegramPostId,
        imageUrl: item.imageUrl
      })));

    // Add 2 latest concert posts
    const concertItems: ConcertItem[] = concertsModule.default?.props?.upcomingConcerts || [];
    posts.push(...concertItems
      .sort((a, b) => parseInt(b.telegramPostId) - parseInt(a.telegramPostId))
      .slice(0, 2)
      .map(item => ({
        title: item.band,
        category: 'Концерт',
        telegramPostId: item.telegramPostId,
        imageUrl: item.imageUrl,
        date: item.date
      })));

  } catch (error) {
    console.error('Error loading posts:', error);
  }

  // Sort all posts by telegramPostId
  return posts.sort((a, b) => parseInt(b.telegramPostId) - parseInt(a.telegramPostId));
}