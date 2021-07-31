# glab repo view

View a project/repository

## Synopsis

Display the description and README of a project or open it in the browser.

```bash
glab repo view [repository] [flags]
```

## Examples

```bash
# view project information for the current directory
$ glab repo view

# view project information of specified name
$ glab repo view my-project
$ glab repo view user/repo
$ glab repo view group/namespace/repo

# specify repo by full [git] URL
$ glab repo view git@gitlab.com:user/repo.git
$ glab repo view https://gitlab.company.org/user/repo
$ glab repo view https://gitlab.company.org/user/repo.git

```

## Options

```bash
  -b, --branch string   View a specific branch of the repository
  -w, --web             Open a project in the browser
```

### Options inherited from parent commands

```bash
  --help   Show help for command
```

## SEE ALSO

* [glab repo](./)  - Work with GitLab repositories and projects
