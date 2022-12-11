class Monkey {
    inspectCount = 0;
    items = [];
    operation = '';
    test = {
        divider: 0,
        trueThrow: 0,
        falseThrow: 0
    };
    constructor(items, operation, {divider, trueThrow, falseThrow}) {
        this.items = items.split(',').map(i => +i);
        this.operation = operation;
        this.test = {divider, trueThrow, falseThrow};
    }
    inspect = () => { 
        let old = this.items.shift()
        old = Math.floor(eval(this.operation)/3)
        if(old % this.test.divider == 0) monkeys[this.test.trueThrow].items.push(old)
        else monkeys[this.test.falseThrow].items.push(old)
        this.inspectCount ++
    }
    inspectAll = () => {
        while(this.items.length > 0) this.inspect()
    }
}

let monkeys = []

require('fs').readFileSync('input', 'utf-8').split(/\n\r?\n/)
.map(monkey => {
    monkey = monkey.split(/\r?\n/)
    let items = monkey[1].split(':').pop(),
    operation = monkey[2].split('=').pop()
    test = Object.fromEntries(['divider', 'trueThrow', 'falseThrow']
    .map((key, i) => [key, monkey.slice(3).map(l => +l.split(' ').pop())[i]] )
    )
    monkeys.push(new Monkey(items, operation, test))
})
      
for(let i = 0; i < 20; i++) {
    monkeys.map(m => m.inspectAll())
}
        
console.log(monkeys.sort((m1, m2) => m1.inspectCount - m2.inspectCount)
    .slice(-2)
    .reduce((a, m) => a*m.inspectCount, 1)
)