# glab mr diff

View changes in a merge request

```bash
glab mr diff [<id> | <branch>] [flags]
```

## Examples

```bash
glab mr diff 123
glab mr diff branch
glab mr diff  # get from current branch
glab mr diff 123 --color=never

```

## Options

```bash
      --color string   Use color in diff output: {always|never|auto} (default "auto")
```

### Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

## SEE ALSO

* [glab mr](./bash)  - Create, view and manage merge requests
