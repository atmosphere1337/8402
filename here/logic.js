let map = [[0,0,0,0],
           [0,8,4,0],
           [2,2,4,4],
           [2,0,2,4]];
let current_score = 0;
function line( x )
{
    x = x.filter(x=>x!=0);
    out = new Array();
    for (let i = 0; i < x.length; i++)
    {
        if (x[i] == x[i+1])
        {
            x[i+1] = 2 * x[i+1];
            i++;
        }
        out.push(x[i]);
    }
    if (out.length < 4)
        out = out.concat(new Array(4-out.length).fill(0));
    return out;
}
function square(rotation)
{   
    switch (rotation)
    {
        case 1://  left
            for (i in map)
                map[i] = line(map[i]);
            break;
        case 2: // up
            for (i = 0; i < 4; i++)
            {
                buf = line([map[0][i], map[1][i], map[2][i], map[3][i]]);
                map[0][i] = buf[0];
                map[1][i] = buf[1];
                map[2][i] = buf[2];
                map[3][i] = buf[3];                
            }
            break;
        case 3: // right
            for (i in map)
                map[i] = line(map[i].reverse()).reverse(); // 
            break;
        case 4: // down
        for (i = 0; i < 4; i++)
        {
            buf = line([map[3][i], map[2][i], map[1][i], map[0][i]]);
            map[0][i] = buf[3];
            map[1][i] = buf[2];
            map[2][i] = buf[1];
            map[3][i] = buf[0];                
        }
            break;
        default:
            break;
    }
}
square(4);
console.table(map);
// TEST BRANCH