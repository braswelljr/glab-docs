# glab mr checkout

Checkout to an open merge request

```bash
glab mr checkout [<id> | <branch>] [flags]
```

## Examples

```bash
glab mr checkout 1
glab mr checkout branch --track
glab mr checkout 12 --branch todo-fix
glab mr checkout new-feature --set-upstream-to=upstream/trunk
glab mr checkout   # use checked out branch

```

## Options

```bash
  -b, --branch string            checkout merge request with <branch> name
  -u, --set-upstream-to string   set tracking of checked out branch to [REMOTE/]BRANCH
  -t, --track                    set checked out branch to track remote branch, adds remote if needed
```

## Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

## SEE ALSO

* [glab mr](./)  - Create, view and manage merge requests
