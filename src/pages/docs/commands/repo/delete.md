# glab repo delete

Delete an existing repository on GitLab

## Synopsis

Delete an existing repository on GitLab

```bash
glab repo delete [<NAMESPACE>/]<NAME> [flags]
```

## Examples

```bash
# delete a personal repo
$ glab repo delete dotfiles

# delete a repo in GitLab group or another repo you have write access
$ glab repo delete mygroup/dotfiles

$ glab repo delete myorg/mynamespace/dotfiles

```

## Options

```bash
  -y, --yes   Skip the confirmation prompt and immediately delete the repository.
```

### Options inherited from parent commands

```bash
  --help   Show help for command
```

## SEE ALSO

- [glab repo](./) - Work with GitLab repositories and projects
