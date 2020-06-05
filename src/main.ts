import * as path from 'path'

import * as core from '@actions/core'

import * as exec from '@actions/exec'

async function installMamba(): Promise<void> {
  await exec.exec('conda', ['install', '-y', '-c', 'conda-forge', 'mamba'])
}

const addPath = async (os: string): Promise<void> => {
  const basePath = process.env.CONDA as string
  core.addPath(basePath)
  console.log(basePath)
  await exec.exec('ls', ['-lisah', basePath])
  if (os === 'darwin') {
    const bin = path.join(basePath, 'condabin')
    core.addPath(bin)
  } else {
    const bin = path.join(basePath, 'bin')
    core.addPath(bin)
  }
}

async function run(): Promise<void> {
  try {
    core.debug('Installing mamba')
    await installMamba()
    core.debug('Add conda to the path')
    const os = process.platform
    await addPath(os)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
