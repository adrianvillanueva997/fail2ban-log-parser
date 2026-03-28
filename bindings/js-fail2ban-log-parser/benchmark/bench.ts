import { Bench } from 'tinybench'

import { plus100, parse } from '../index.js'

function add(a: number) {
  return a + 100
}

const sample = Array(100)
  .fill(
    '2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1'
  )
  .join('\n')

const b = new Bench()

b.add('Native a + 100', () => {
  plus100(10)
})

b.add('JavaScript a + 100', () => {
  add(10)
})

b.add('Native parse single line', () => {
  parse('2024-01-15 14:32:01,847 fail2ban.filter [12345] INFO [sshd] Found 192.168.1.1')
})

b.add('Native parse 100 lines', () => {
  parse(sample)
})

await b.run()

console.table(b.table())
