# glab repo contributors

Get repository contributors list.

```bash
glab repo contributors [flags]
```

## Examples

```bash
$ glab repo contributors

$ glab repo contributors -R gitlab-com/www-gitlab-com
#=> Supports repo override

```

## Options

```bash
  -o, --order string      Return contributors ordered by name, email, or commits (orders by commit date) fields (default "commits")
  -p, --page int          Page number (default 1)
  -P, --per-page int      Number of items to list per page. (default 30)
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
  -s, --sort string       Return contributors sorted in asc or desc order
```

### Options inherited from parent commands

```bash
  --help   Show help for command
```

### SEE ALSO

* [glab repo](./)  - Work with GitLab repositories and projects
