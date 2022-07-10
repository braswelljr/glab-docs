# glab ci delete

Delete a CI pipeline

```bash
glab ci delete <id> [flags]
```

## Examples

```bash
glab ci delete 34
glab ci delete 12,34,2
```

## Options

```bash
  -s, --status string   delete pipelines by status: {running|pending|success|failed|canceled|skipped|created|manual}
```

## Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

### SEE ALSO

- [glab ci](../../../) - Work with GitLab CI pipelines and jobs
