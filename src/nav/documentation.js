const documentation = {
  Prologue: ['installation', 'introduction', 'usage'],
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
    ]
  }
}

export default documentation
