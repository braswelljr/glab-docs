module.exports = {
  'getting-started': ['introduction', 'installation', 'usage'],
  Commands: {
    alias: [
      'synopsis',
      'options-inherited-from-parent-commands',
      {
        title: 'sub-commands',
        commands: [
          { title: 'delete', commands: [] },
          { title: 'list', commands: [] },
          { title: 'set', commands: [] }
        ]
      }
    ],
    auth: [
      'synopsis',
      'options-inherited-from-parent-commands',
      {
        title: 'sub-commands',
        commands: [
          {
            title: 'git-credentials',
            commands: ['synopsis', 'options-inherited-from-parent-commands']
          },
          {
            title: 'login',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'status',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          }
        ]
      }
    ],
    'check-update': ['synopsis', 'options-inherited-from-parent-commands'],
    completion: [
      'synopsis',
      'options',
      'options-inherited-from-parent-commands'
    ],
    config: [
      'synopsis',
      'options',
      'options-inherited-from-parent-commands',
      {
        title: 'sub-commands',
        commands: [
          {
            title: 'get',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'init',
            commands: ['synopsis', 'options-inherited-from-parent-commands']
          },
          {
            title: 'set',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          }
        ]
      }
    ],
    issue: [
      'synopsis',
      'examples',
      'options',
      'options-inherited-from-parent-commands',
      {
        title: 'sub-commands',
        commands: [
          {
            title: 'board',
            commands: [
              'synopsis',
              'options-inherited-from-parent-commands',
              'subcommands'
            ]
          },
          {
            title: 'close',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'create',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'delete',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'list',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'note',
            commands: [
              'synopsis',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'reopen',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'subscribe',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'unsubcribe',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'update',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'view',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          }
        ]
      }
    ],
    label: [
      'synopsis',
      'options',
      'options-inherited-from-parent-commands',
      {
        title: 'sub-commands',
        commands: [
          {
            title: 'create',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'list',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          }
        ]
      }
    ],
    mr: [
      'synopsis',
      'examples',
      'options',
      'options-inherited-from-parent-commands',
      {
        title: 'sub-commands',
        commands: [
          {
            title: 'approve',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'approvers',
            commands: ['synopsis', 'options-inherited-from-parent-commands']
          },
          {
            title: 'checkout',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'close',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'create',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'delete',
            commands: [
              'synopsis',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'diff',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'for',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'issues',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'list',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'merge',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'note',
            commands: [
              'synopsis',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'rebase',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'reopen',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'revoke',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'subscribe',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'todo',
            commands: ['synopsis', 'options-inherited-from-parent-commands']
          },
          {
            title: 'unsubscribe',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'update',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'view',
            commands: [
              'synopsis',
              'options',
              'options-inherited-from-parent-commands'
            ]
          }
        ]
      }
    ],
    release: [
      'synopsis',
      'options',
      'options-inherited-from-parent-commands',
      {
        title: 'sub-commands',
        commands: [
          {
            title: 'list',
            commands: [
              'synopsis',
              'options',
              'options-inherited-from-parent-commands'
            ]
          }
        ]
      }
    ],
    repo: [
      'synopsis',
      'options-inherited-from-parent-commands',
      {
        title: 'sub-commands',
        commands: [
          {
            title: 'archive',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'clone',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'contributors',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'create',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'delete',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'fork',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'search',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          }
        ]
      }
    ],
    pipeline: [
      'synopsis',
      'options-inherited-from-parent-commands',
      {
        title: 'sub-commands',
        commands: [
          {
            title: 'ci',
            commands: [
              'synopsis',
              'examples',
              'options-inherited-from-parent-commands',
              {
                title: 'sub-commands',
                commands: [
                  {
                    title: 'lint',
                    commands: [
                      'synopsis',
                      'examples',
                      'options-inherited-from-parent-commands'
                    ]
                  },
                  {
                    title: 'trace',
                    commands: [
                      'synopsis',
                      'examples',
                      'options',
                      'options-inherited-from-parent-commands'
                    ]
                  },
                  {
                    title: 'view',
                    commands: [
                      'synopsis',
                      'examples',
                      'options',
                      'options-inherited-from-parent-commands'
                    ]
                  }
                ]
              }
            ]
          },
          {
            title: 'delete',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'list',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'run',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          },
          {
            title: 'status',
            commands: [
              'synopsis',
              'examples',
              'options',
              'options-inherited-from-parent-commands'
            ]
          }
        ]
      }
    ],
    version: ['synopsis', 'options-inherited-from-parent-commands']
  },
  Help: ['how-to-update', 'trouble-shooting', 'FAQ']
}
