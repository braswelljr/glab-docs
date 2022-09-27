# glab repo transfer

Transfer a repository to a new namespace.

```
glab repo transfer [repo] [flags]
```

## Examples

```
glab repo transfer profclems/glab --target-namespace notprofclems

```

## Options

```
  -t, --target-namespace string   The namespace where your project should be transferred to
  -y, --yes                       Danger: Skip confirmation prompt and force transfer operation. Transfer cannot be undone.
```

### Options inherited from parent commands

```
      --help   Show help for command
```

## SEE ALSO

- [glab repo](./) - Work with GitLab repositories and projects
