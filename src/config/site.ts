type SiteConfig = {
  name: string;
  url: string;
  description: string;
  repository: string;
  logo?: string;
  links: {
    twitter?: string;
    github?: string;
    gitlab?: string;
    documentation?: string;
    issues?: string;
  };
  keywords?: string[];
};

export const siteConfig: SiteConfig = {
  name: 'GLab',
  url: 'https://gitlab.com/gitlab-org/cli',
  description:
    'GLab is an open-source GitLab CLI tool that brings GitLab to your terminal. Manage issues, merge requests, CI/CD pipelines, and more — directly from your CLI.',
  repository: 'https://gitlab.com/gitlab-org/cli',
  links: {
    gitlab: 'https://gitlab.com/gitlab-org/cli',
    github: 'https://github.com/profclems/glab',
    documentation: 'https://docs.gitlab.com/editor_extensions/gitlab_cli/',
    issues: 'https://gitlab.com/gitlab-org/cli/-/issues',
    twitter: 'https://twitter.com/gitlab'
  },
  keywords: ['glab', 'gitlab', 'cli', 'command-line', 'open source', 'devops', 'cicd', 'developer tools', 'git', 'automation']
};
