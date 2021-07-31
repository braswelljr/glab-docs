# glab ci run

Create or run a new CI pipeline

```bash
glab ci run [flags]
```

## Examples

```bash
glab ci run
glab ci run -b trunk

```

## Options

```bash
  -b, --branch string       Create pipeline on branch/ref <string>
      --variables strings   Pass variables to pipeline
```

## Options inherited from parent commands

```bash
      --help              Show help for command
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

## SEE ALSO

* [glab ci](./)  - Work with GitLab CI pipelines and jobs
