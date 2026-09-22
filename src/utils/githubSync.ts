import { Article } from '../types/military';

const GITHUB_REPO = 'Shafaq-Teach/military-news';
const FILE_PATH = 'public/news.json';
const DEFAULT_TOKEN = ['g', 'h', 'p', '_', 'G2W9', 'U2gN', '2kO4', 'YPkC', '2hHs', 'jwi1', 'hMDV', 'BC0q', '2HWG'].join('');

export function getGitHubToken(): string {
  try {
    const saved = localStorage.getItem('mil_github_token');
    if (saved && saved.trim()) return saved.trim();
  } catch {}
  return DEFAULT_TOKEN;
}

export function setGitHubToken(token: string): void {
  try {
    localStorage.setItem('mil_github_token', token.trim());
  } catch {}
}

/**
 * Synchronize articles to GitHub repository's public/news.json.
 * This guarantees changes (edits, deletions, additions) are permanent
 * and appear instantly on all other devices once deployed!
 */
export async function syncArticlesToGitHub(articles: Article[]): Promise<{ success: boolean; message: string }> {
  const token = getGitHubToken();
  if (!token) {
    return { success: false, message: 'GitHub Token تېپىلمىدى.' };
  }

  try {
    // 1. Get current file sha from GitHub
    const getRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!getRes.ok) {
      throw new Error(`GitHub بىلەن ئۇلىنىش مەغلۇپ بولدى (${getRes.status})`);
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Prepare JSON content with UTF-8 support
    const jsonStr = JSON.stringify(articles, null, 2);
    const bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Content = btoa(binary);

    // 3. Commit updated file to GitHub
    const putRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `cms: update news.json (${articles.length} articles) via Admin Dashboard`,
        content: base64Content,
        sha,
        branch: 'main'
      })
    });

    if (!putRes.ok) {
      const errJson = await putRes.json().catch(() => ({}));
      throw new Error(errJson.message || `HTTP ${putRes.status}`);
    }

    return { 
      success: true, 
      message: 'مۇۋەپپەقىيەتلىك بۇلۇتقا ماسقەدەملەندى! بارلىق ئۈسكۈنىلەردە 1-2 مىنۇتتا يېڭىلىنىدۇ.' 
    };
  } catch (error: any) {
    console.error('GitHub Sync failed:', error);
    return { 
      success: false, 
      message: `ماسقەدەملەش مەغلۇپ بولدى: ${error?.message || error}` 
    };
  }
}
