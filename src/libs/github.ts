import { profile } from '@/content/profile';

const HANDLE = 'joaovitorkc';
const API = 'https://api.github.com';

/** Cache for an hour — the public API allows 60 req/h per IP unauthenticated. */
const REVALIDATE = 3600;

export type GithubSnapshot = {
  handle: string;
  url: string;
  publicRepos: number;
  followers: number;
  createdAt: string;
  languages: { name: string; count: number; share: number }[];
  recent: {
    name: string;
    description: string | null;
    language: string | null;
    pushedAt: string;
    url: string;
    homepage: string | null;
  }[];
  fetchedAt: string;
};

type GhUser = {
  public_repos: number;
  followers: number;
  created_at: string;
};

type GhRepo = {
  name: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  private: boolean;
};

function headers(): HeadersInit {
  const base: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  // Optional: set GITHUB_TOKEN to lift the rate limit. Never required.
  if (process.env.GITHUB_TOKEN) {
    return { ...base, Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };
  }
  return base;
}

/**
 * Live GitHub snapshot. Returns null on any failure — the section renders a
 * calm "unavailable" state instead of breaking the page. Never throws.
 */
export async function getGithubSnapshot(): Promise<GithubSnapshot | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${HANDLE}`, { headers: headers(), next: { revalidate: REVALIDATE } }),
      fetch(`${API}/users/${HANDLE}/repos?per_page=100&sort=pushed`, {
        headers: headers(),
        next: { revalidate: REVALIDATE },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as GhUser;
    const repos = (await reposRes.json()) as GhRepo[];
    if (!Array.isArray(repos)) return null;

    const own = repos.filter((r) => !r.fork && !r.private);

    // language distribution across own repos
    const counts = new Map<string, number>();
    for (const repo of own) {
      if (!repo.language) continue;
      counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
    }
    const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1;
    const languages = Array.from(counts.entries())
      .map(([name, count]) => ({ name, count, share: count / total }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const recent = own.slice(0, 5).map((r) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      pushedAt: r.pushed_at,
      url: r.html_url,
      homepage: r.homepage,
    }));

    return {
      handle: HANDLE,
      url: `https://github.com/${HANDLE}`,
      publicRepos: user.public_repos,
      followers: user.followers,
      createdAt: user.created_at,
      languages,
      recent,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export const githubUrl =
  profile.socials.find((s) => s.key === 'github')?.url ?? `https://github.com/${HANDLE}`;
