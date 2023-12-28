// prettier-ignore
/* eslint-disable */
/* auto-generated by NAPI-RS */

const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

const { platform, arch } = process

let nativeBinding = null
let localFileExisted = false
let loadError = null

const isMusl = () => {
  let musl = false
  if (process.platform === 'linux') {
    musl = isMuslFromFilesystem()
    if (musl === null) {
      musl = isMuslFromReport()
    }
    if (musl === null) {
      musl = isMuslFromChildProcess()
    }
  }
  return musl
}

const isFileMusl = (f) => f.includes('libc.musl-') || f.includes('ld-musl-')

const isMuslFromFilesystem = () => {
  try {
    return readFileSync('/usr/bin/ldd', 'utf-8').includes('musl')
  } catch {
    return null
  }
}

const isMuslFromReport = () => {
  const report = typeof process.report.getReport === 'function' ? process.report.getReport() : null
  if (!report) {
    return null
  }
  if (report.header && report.header.glibcVersionRuntime) {
    return false
  }
  if (Array.isArray(report.sharedObjects)) {
    if (report.sharedObjects.some(isFileMusl)) {
      return true
    }
  }
  return false
}

const isMuslFromChildProcess = () => {
  try {
    return require('child_process').execSync('ldd --version', { encoding: 'utf8' }).includes('musl')
  } catch (e) {
    // If we reach this case, we don't know if the system is musl or not, so is better to just fallback to false
    return false
  }
}

switch (platform) {
  case 'android':
    switch (arch) {
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.android-arm64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./jsonwebtoken.android-arm64.node')
          } else {
            nativeBinding = require('@node-rs/jsonwebtoken-android-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.android-arm-eabi.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./jsonwebtoken.android-arm-eabi.node')
          } else {
            nativeBinding = require('@node-rs/jsonwebtoken-android-arm-eabi')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Android ${arch}`)
    }
    break
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.win32-x64-msvc.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./jsonwebtoken.win32-x64-msvc.node')
          } else {
            nativeBinding = require('@node-rs/jsonwebtoken-win32-x64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'ia32':
        localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.win32-ia32-msvc.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./jsonwebtoken.win32-ia32-msvc.node')
          } else {
            nativeBinding = require('@node-rs/jsonwebtoken-win32-ia32-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.win32-arm64-msvc.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./jsonwebtoken.win32-arm64-msvc.node')
          } else {
            nativeBinding = require('@node-rs/jsonwebtoken-win32-arm64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`)
    }
    break
  case 'darwin':
    localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.darwin-universal.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./jsonwebtoken.darwin-universal.node')
      } else {
        nativeBinding = require('@node-rs/jsonwebtoken-darwin-universal')
      }
      break
    } catch {}
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.darwin-x64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./jsonwebtoken.darwin-x64.node')
          } else {
            nativeBinding = require('@node-rs/jsonwebtoken-darwin-x64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.darwin-arm64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./jsonwebtoken.darwin-arm64.node')
          } else {
            nativeBinding = require('@node-rs/jsonwebtoken-darwin-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'freebsd':
    if (arch !== 'x64') {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.freebsd-x64.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./jsonwebtoken.freebsd-x64.node')
      } else {
        nativeBinding = require('@node-rs/jsonwebtoken-freebsd-x64')
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.linux-x64-musl.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./jsonwebtoken.linux-x64-musl.node')
            } else {
              nativeBinding = require('@node-rs/jsonwebtoken-linux-x64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.linux-x64-gnu.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./jsonwebtoken.linux-x64-gnu.node')
            } else {
              nativeBinding = require('@node-rs/jsonwebtoken-linux-x64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm64':
        if (isMusl()) {
          localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.linux-arm64-musl.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./jsonwebtoken.linux-arm64-musl.node')
            } else {
              nativeBinding = require('@node-rs/jsonwebtoken-linux-arm64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.linux-arm64-gnu.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./jsonwebtoken.linux-arm64-gnu.node')
            } else {
              nativeBinding = require('@node-rs/jsonwebtoken-linux-arm64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.linux-arm-gnueabihf.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./jsonwebtoken.linux-arm-gnueabihf.node')
          } else {
            nativeBinding = require('@node-rs/jsonwebtoken-linux-arm-gnueabihf')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'riscv64':
        if (isMusl()) {
          localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.linux-riscv64-musl.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./jsonwebtoken.linux-riscv64-musl.node')
            } else {
              nativeBinding = require('@node-rs/jsonwebtoken-linux-riscv64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(join(__dirname, 'jsonwebtoken.linux-riscv64-gnu.node'))
          try {
            if (localFileExisted) {
              nativeBinding = require('./jsonwebtoken.linux-riscv64-gnu.node')
            } else {
              nativeBinding = require('@node-rs/jsonwebtoken-linux-riscv64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
  try {
    localFileExisted =
      existsSync(join(__dirname, 'jsonwebtoken.wasm32-wasi.wasm')) &&
      existsSync(join(__dirname, 'jsonwebtoken.wasi.cjs'))
    if (localFileExisted) {
      nativeBinding = require('./jsonwebtoken.wasi.cjs')
    } else {
      nativeBinding = require('@node-rs/jsonwebtoken-wasm32-wasi')
    }
  } catch {
    // ignore
  }
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

module.exports.Algorithm = nativeBinding.Algorithm
module.exports.sign = nativeBinding.sign
module.exports.signSync = nativeBinding.signSync
module.exports.verify = nativeBinding.verify
module.exports.verifySync = nativeBinding.verifySync
