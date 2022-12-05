line_no=1
$stacks = Array.new(9){ [] }
$delimiters = ['move', 'from', 'to']

def parse_crate(line)
    parsed_line=line.chars.each_slice(4).map(&:join)
    for i in (0..$stacks.length()-1)
        letter=parsed_line[i].tr('[ ]','').tr("\n","")
        if letter != ''
            $stacks[i].push(letter)
        end
    end
end

def move_line(line)
    move=Integer(line.split(Regexp.union($delimiters))[1])
    from=Integer(line.split(Regexp.union($delimiters))[2])-1
    to=Integer(line.split(Regexp.union($delimiters))[3])-1
    (move-1).downto(0).each { |j| 
        $stacks[to].unshift($stacks[from][j])
        $stacks[from].delete_at(j)
    }
end

File.readlines('input').each do |line|
    if line_no < 9
        parse_crate(line)
        line_no+=1
    elsif line_no == 9 or line_no == 10
        line_no+=1
    else
        move_line(line)
    end
end

string=""
$stacks.each do |stack|
    string+=stack[0]
end

puts string