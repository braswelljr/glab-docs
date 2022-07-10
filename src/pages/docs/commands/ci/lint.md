# glab ci lint

Checks if your .gitlab-ci.yml file is valid.

```bash
glab ci lint [flags]
```

## Examples

```bash
$ glab ci lint
#=> Uses .gitlab-ci.yml in the current directory

$ glab ci lint .gitlab-ci.yml

$ glab ci lint path/to/.gitlab-ci.yml

```

## Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

### SEE ALSO

- [glab ci](./) - Work with GitLab CI pipelines and jobs
