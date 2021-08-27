export const terminalD = [
  {
    title: `Your entire GitLab workflow`,
    workflow: `Work with issues, merge requests, GitLab CI pipelines and jobs, releases and more`,
    name: `View all glab commands`,
    link: `/docs/commands`
  },
  {
    title: `Script and customize`,
    workflow: `Call the GitLab API to script almost any action, and set a custom alias for any command`,
    name: `Learn about aliases and API`,
    link: `/docs/commands/alias`
  },
  {
    title: `Supports all GitLab instances`,
    workflow: `Available for repositories hosted on GitLab.com and self-hosted GitLab Instances`,
    name: `Learn how to authenticate`,
    link: `/docs/commands/auth`
  },
  {
    title: `We <3 Community`,
    workflow: `GLab is open source, Licensed under MIT and ready for your contributions`,
    name: `Contribute to glab`,
    link: `https://github.com/profclems/glab`
  }
]

export const poweredBy = [
  {
    name: 'Fosshost',
    link: 'https://fosshost.org/',
    logo: (
      <img
        src={require('@/img/sponsors/fosshost.png')}
        className="w-auto h-20"
      />
    )
  }
]
