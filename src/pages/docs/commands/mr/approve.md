# glab mr approve

Approve merge requests

```bash
glab mr approve {<id> | <branch>} [flags]
```

## Examples

```bash
glab mr approve 235
glab mr approve 123 345
glab mr approve branch-1
glab mr approve branch-2 branch-3
glab mr approve    # Finds open merge request from current branch

```

## Options

```bash
  -s, --sha string   SHA which must match the SHA of the HEAD commit of the merge request
```

## Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

## SEE ALSO

* [glab mr](./)  - Create, view and manage merge requests
