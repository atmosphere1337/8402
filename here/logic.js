let map = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
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
function square()
{
    
}

console.log(line([2,2,4,4]));