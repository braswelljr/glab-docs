# glab release delete

Delete a GitLab Release

## Synopsis

Delete release assets to GitLab Release

Deleting a release does not delete the associated tag unless `--with-tag` is specified.
Maintainer level access to the project is required to delete a release.

```bash
glab release delete <tag> [flags]
```

## Examples

```bash
Delete a release (with a confirmation prompt')
$ glab release delete v1.1.0'

Skip the confirmation prompt and force delete
$ glab release delete v1.0.1 -y

Delete release and associated tag
$ glab release delete v1.0.1 --with-tag

```

## Options

```bash
  -t, --with-tag   Delete associated tag
  -y, --yes        Skip confirmation prompt
```

### Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

## SEE ALSO

- [glab release](./) - Manage GitLab releases
