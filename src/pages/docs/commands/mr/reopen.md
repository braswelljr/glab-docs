# glab mr reopen

Reopen merge requests

```bash
glab mr reopen [<id>... | <branch>...] [flags]
```

## Examples

```bash
glab mr reopen 123
glab mr reopen 123 456 789
glab mr reopen branch-1 branch-2
glab mr reopen  # use checked out branch

```

## Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

## SEE ALSO

* [glab mr](./)  - Create, view and manage merge requests
