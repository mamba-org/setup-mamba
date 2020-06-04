import * as core from '@actions/core'

import * as exec from '@actions/exec'

async function installMamba(): Promise<void> {
  await exec.exec('conda', ['install', '-y', '-c', 'conda-forge', 'mamba'])
}

async function run(): Promise<void> {
  try {
    core.debug('Installing mamba')
    await installMamba()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
