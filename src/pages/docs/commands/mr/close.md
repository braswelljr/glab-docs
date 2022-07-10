# glab mr close

Close merge requests

```bash
glab mr close [<id> | <branch>] [flags]
```

## Examples

```bash
glab mr close 1
glab mr close 1 2 3 4  # close multiple branches at once
glab mr close  # use checked out branch
glab mr close branch
glab mr close username:branch
glab mr close branch -R another/repo

```

## Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

## SEE ALSO

- [glab mr](./) - Create, view and manage merge requests
