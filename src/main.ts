import * as path from 'path'

import * as core from '@actions/core'

import * as exec from '@actions/exec'

async function fixPermissions(os: string): Promise<void> {
  if (os === 'darwin') {
    const username = process.env.USER
    await exec.exec('sudo', [
      'chown',
      '-R',
      `${username}:staff`,
      process.env.CONDA as string
    ])
  }
}

async function addPath(os: string): Promise<void> {
  const basePath = process.env.CONDA as string
  if (os === 'darwin') {
    const bin = path.join(basePath, 'condabin')
    core.addPath(bin)
  } else if (os === 'win32') {
    core.addPath(path.join(basePath, 'Library', 'bin'))
    core.addPath(path.join(basePath, 'condabin'))
    core.addPath(path.join(basePath, 'bin'))
    core.addPath(path.join(basePath, 'Scripts'))
    core.addPath(path.join(basePath, 'Library', 'usr', 'bin'))
    core.addPath(path.join(basePath, 'Library', 'mingw-w64', 'bin'))
    core.addPath(path.join(basePath))
  } else {
    const bin = path.join(basePath, 'bin')
    core.addPath(bin)
  }
}

async function installMamba(): Promise<void> {
  await exec.exec('conda', ['install', '-y', '-c', 'conda-forge', 'mamba'])
}

async function activate(os: string): Promise<void> {
  if (os === 'win32') {
    const basePath = process.env.CONDA as string
    const activateFile = path.join(basePath, 'condabin', 'activate.bat')
    await exec.exec('conda', ['shell.powershell', activateFile, 'base'])
  }
}

async function run(): Promise<void> {
  try {
    const os = process.platform

    core.debug('Fix permissions')
    fixPermissions(os)

    core.debug('Add conda to the path')
    await addPath(os)

    core.debug('Activate the environment')
    activate(os)

    core.debug('Installing mamba')
    await installMamba()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
