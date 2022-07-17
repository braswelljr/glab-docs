# glab issue view

Display the title, body, and other information about an issue.

```bash
glab issue view <id> [flags]
```

## Examples

```bash
glab issue view 123
glab issue show 123
glab issue view --web 123
glab issue view --comments 123
glab issue view https://gitlab.com/profclems/glab/-/issues/123

```

## Options

```bash
  -c, --comments       Show mr comments and activities
  -p, --page int       Page number (default 1)
  -P, --per-page int   Number of items to list per page (default 20)
  -s, --system-logs    Show system activities / logs
  -w, --web            Open mr in a browser. Uses default browser or browser specified in BROWSER variable
```

### Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

### SEE ALSO

- [glab issue](./) - Work with GitLab issues
