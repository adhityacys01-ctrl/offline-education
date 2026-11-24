import { spawn, execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const webDir = path.resolve(rootDir, 'apps', 'web')
const apiDir = path.resolve(rootDir, 'apps', 'api')

const isWin = process.platform === 'win32'
const npmCmd = isWin ? 'npm.cmd' : 'npm'

console.log('\n🧹 Cleaning up any existing processes on ports 3000 and 3001...')

function killPort(port) {
  try {
    if (isWin) {
      const output = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      const lines = output.trim().split('\n')
      for (const line of lines) {
        const parts = line.trim().split(/\s+/)
        const pid = parts[parts.length - 1]
        if (pid && pid !== '0') {
          try {
            execSync(`taskkill /pid ${pid} /f /t`, { stdio: 'ignore' })
            console.log(`  ✓ Closed process ${pid} on port ${port}`)
          } catch {}
        }
      }
    } else {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' })
    }
  } catch {}
}

killPort(3000)
killPort(3001)

// Give Windows socket a brief moment to close completely
await new Promise((resolve) => setTimeout(resolve, 1500))

console.log('\n🚀 Starting Offline Learning Platform...')
console.log('📱 Web Frontend: \x1b[36mhttp://localhost:3000\x1b[0m')
console.log('🔌 Backend API:   \x1b[33mhttp://localhost:3001\x1b[0m\n')

const procs = []

function runService(name, cwd, args, prefixColor) {
  const child = spawn(npmCmd, args, {
    cwd,
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: isWin,
  })

  child.stdout.on('data', (data) => {
    const lines = data.toString().trimEnd().split('\n')
    for (const line of lines) {
      console.log(`${prefixColor}[${name}]\x1b[0m ${line}`)
    }
  })

  child.stderr.on('data', (data) => {
    const lines = data.toString().trimEnd().split('\n')
    for (const line of lines) {
      console.error(`${prefixColor}[${name} ERR]\x1b[0m ${line}`)
    }
  })

  child.on('close', (code) => {
    if (code !== null && code !== 0) {
      console.log(`${prefixColor}[${name}]\x1b[0m exited with code ${code}`)
    }
  })

  procs.push(child)
  return child
}

// Start Web in apps/web on port 3000
runService('WEB', webDir, ['run', 'dev'], '\x1b[36m')

// Start API in apps/api on port 3001
runService('API', apiDir, ['run', 'start:dev'], '\x1b[33m')

function cleanup() {
  console.log('\n🛑 Shutting down services...')
  for (const p of procs) {
    try {
      if (isWin) {
        spawn('taskkill', ['/pid', p.pid, '/f', '/t'], { stdio: 'ignore' })
      } else {
        p.kill('SIGTERM')
      }
    } catch {}
  }
  process.exit(0)
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)
process.on('exit', cleanup)
