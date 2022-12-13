let isOrdered = (left, right, isInternal = false) => {
    switch ([left[0]===undefined, right[0]===undefined].join()) { //handle undefined
        case 'true,true': return isInternal ? 'idk' : true
        case 'true,false': return true
        case 'false,true': return  false
    }
    switch ([typeof(left[0]), typeof(right[0])].join()) {
        case 'number,number':
            return (left[0] == right[0]) ? isOrdered(left.slice(1), right.slice(1), isInternal) : left[0] < right[0]
        case 'object,object':
            let res = isOrdered(left[0], right[0], true)
            return res == 'idk' ? isOrdered(left.slice(1), right.slice(1), isInternal) : isOrdered(left[0], right[0], isInternal)
        case 'object,number':
            return isOrdered([left[0], ...left.slice(1)], [[right[0]], ...right.slice(1)], isInternal)
        case 'number,object':
            return isOrdered([[left[0]], ...left.slice(1)], [right[0], ...right.slice(1)], isInternal)
    }
}

console.log(
    require('fs').readFileSync('input', 'utf-8').split(/\n\r?\n/).map(l => {
        let [left, right] = l.split(/\r?\n/)  
        left = eval(left)
        right = eval(right)
        return isOrdered(left, right)
    }).reduce((a, b, i) => b? a+i+1 : a, 0)
)