export interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  articleUrl: string;
  source: string;
  publishedAt: string;
}
