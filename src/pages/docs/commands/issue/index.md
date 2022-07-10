# glab issue

Work with GitLab issues

## Examples

```bash
glab issue list
glab issue create --label --confidential
glab issue view --web
glab issue note -m "closing because !123 was merged" <issue number>

```

## Options

```bash
  -R, --repo OWNER/REPO   Select another repository using the OWNER/REPO or `GROUP/NAMESPACE/REPO` format or full URL or git URL
```

### Options inherited from parent commands

```bash
  --help   Show help for command
```

### SEE ALSO

- [glab](../../../) - A GitLab CLI Tool
- [glab issue board](issue/board) - Work with GitLab Issue Boards in the given project.
- [glab issue close](issue/close) - Close an issue
- [glab issue create](issue/create) - Create an issue
- [glab issue delete](issue/delete) - Delete an issue
- [glab issue list](issue/list) - List project issues
- [glab issue note](issue/note) - Add a comment or note to an issue on GitLab
- [glab issue reopen](issue/reopen) - Reopen a closed issue
- [glab issue subscribe](issue/subscribe) - Subscribe to an issue
- [glab issue unsubscribe](issue/unsubscribe) - Unsubscribe to an issue
- [glab issue update](issue/update) - Update issue
- [glab issue view](issue/view) - Display the title, body, and other information about an issue.
