import * as path from 'path'

import * as core from '@actions/core'

import * as exec from '@actions/exec'

async function installMamba(): Promise<void> {
  await exec.exec('conda', ['install', '-y', '-c', 'conda-forge', 'mamba'])
}

const addPath = async (): Promise<void> => {
  const basePath = process.env.CONDA as string
  const bin = path.join(basePath, 'bin')
  core.addPath(basePath)
  core.addPath(bin)
}

async function run(): Promise<void> {
  try {
    core.debug('Installing mamba')
    await installMamba()
    core.debug('Add conda to the path')
    await addPath()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
