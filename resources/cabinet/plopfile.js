module.exports = function (plop) {
  plop.setGenerator('page', {
    description: 'New page',
    prompts: [
      {
        type: 'input',
        name: 'NAME',
        message: 'Name:'
      },
    ],
    actions: () => [
      {
        type: 'addMany',
        templateFiles: 'plop/page/*.vue',
        base: 'plop/page/',
        destination: 'src/pages/{{ dashCase NAME }}/',
        skipIfExists: true,
      },
      {
        type: 'addMany',
        templateFiles: 'plop/page/*.scss',
        base: 'plop/page/',
        destination: 'src/assets/styles/pages/{{ camelCase NAME }}/',
        skipIfExists: true,
      },
    ],
  })

  plop.setGenerator('component', {
    description: 'New component',
    prompts: [
      {
        type: 'input',
        name: 'NAME',
        message: 'Name:',
      },
      {
        type: 'input',
        name: 'PATH',
        message: 'Path:',
      }
    ],
    actions: () => [
      {
        type: 'addMany',
        templateFiles: 'plop/component/*.vue',
        base: 'plop/component/',
        destination: 'src/{{ PATH }}/',
        skipIfExists: true
      },
      {
        type: 'addMany',
        templateFiles: 'plop/component/*.scss',
        base: 'plop/component/',
        destination: 'src/assets/styles/{{ PATH }}',
        skipIfExists: true
      },
    ],
  })

  plop.setGenerator('store', {
    description: 'New store module',
    prompts: [{
      type: 'input',
      name: 'NAME',
      message: 'Name:',
    }],
    actions: () => [{
      type: 'addMany',
      templateFiles: 'plop/store/**',
      base: 'plop/store/',
      destination: 'src/store/{{ camelCase NAME }}/',
      skipIfExists: true,
    }],
  })

  plop.setGenerator('api', {
    description: 'New api module',
    prompts: [{
        type: 'input',
        name: 'NAME',
        message: 'Name:',
      },
    ],
    actions: () => [{
      type: 'addMany',
      templateFiles: [
        'plop/api/**',
      ],
      base: 'plop/api',
      destination: 'src/api/modules/',
      skipIfExists: true,
    }],
  })

  plop.setGenerator('apiResource', {
    description: 'New apiResource module',
    prompts: [{
      type: 'input',
      name: 'NAME',
      message: 'Name:',
    },
    ],
    actions: () => [{
      type: 'addMany',
      templateFiles: [
        'plop/apiResource/**',
      ],
      base: 'plop/apiResource',
      destination: 'src/api/modules/',
      skipIfExists: true,
    }],
  })
}
