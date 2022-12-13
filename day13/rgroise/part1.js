let isOrdered = (left, right) => {
    switch ([!left[0], !right[0]].join()) { //handle undefined
        case 'true,true': return true
        case 'true,false': return true
        case 'false,true': return false
    }
    switch ([typeof(left[0]), typeof(right[0])].join()) {
        case 'number,number':
            return (left[0] == right[0]) ? isOrdered(left.slice(1), right.slice(1)) : left[0] < right[0]
        case 'object,object':
            return left[0] == right[0] ? isOrdered(left.slice(1), right.slice(1)) : isOrdered(left[0], right[0])
        case 'object,number':
            return isOrdered(left[0], [right[0]]) && isOrdered(left.slice(1), right.slice(1))
        case 'number,object':
            return isOrdered([left[0]], right[0]) && isOrdered(left.slice(1), right.slice(1))
    }
}

console.log(
    require('fs').readFileSync('../example', 'utf-8').split(/\n\r?\n/).map(l => {
        let [left, right] = l.split(/\r?\n/)  
        left = eval(left)
        right = eval(right)
        return isOrdered(left, right)
    }).reduce((a, b, i) => b? a+i+1 : a, 0)
)