import { fetchTopHeadlines } from "../api/gnews";
import type { NewsArticle } from "../types/NewsArticle";

function mapArticle(article: any): NewsArticle {
  return {
    id: article.articleUrl,
    title: article.title,
    description: article.description,
    imageUrl: article.image,
    articleUrl: article.url,
    source: article.source.name,
    publishedAt: article.publishedAt,
  };
}

export interface GetNewsOptions {
  category?: string;
  max?:number
}

export async function getNews(
  options: GetNewsOptions = {},
): Promise<NewsArticle[]> {
  const response = await fetchTopHeadlines(options);
  return response.articles.map(mapArticle);
}
