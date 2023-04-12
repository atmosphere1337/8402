let map = [[0,0,0,0],
           [0,8,4,0],
           [2,2,4,4],
           [2,0,2,4]];

let blank = [[0,0,0,0],
             [0,0,0,0],
             [0,0,0,0],
             [0,0,0,0]];
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
            current_score += x[i+1];
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
function spawn()
{
    let arr = [];
    let powers = [2,4,8,16];
    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
        {
            if (map[i][j] == 0)
            {
                arr.push({"i" : i, "j" : j});
            } 
        }
    if (Math.random() < 0.5)
    {
        let point = arr[Math.floor(Math.random() * arr.length)];
        let pwr = powers[Math.floor(Math.random() * powers.length)];
        map[point.i][point.j] = pwr;
    }
}
spawn();


let field = [["dot1",  "dot2",  "dot3",   "dot4"],
             ["dot5",  "dot6",  "dot7",   "dot8"],
             ["dot9",  "dot10", "dot11", "dot12"],
             ["dot13", "dot14", "dot15", "dot16"]];

function print_field(field, document)
{
    for (let i = 0; i < 4; i++)                
        for (let j = 0; j < 4; j++)
        {
            let el = document.getElementById(field[i][j]); 
            if (map[i][j] == 0)
                el.style.backgroundColor = "gray";
            if (map[i][j] == 2 || map[i][j] == 4)
                el.style.backgroundColor = "white";
            if (map[i][j] == 8 || map[i][j] == 16)
                el.style.backgroundColor = "yellow";
            if (map[i][j] == 32 || map[i][j] == 64)
                el.style.backgroundColor = "orange";
            if (map[i][j] == 128 || map[i][j] == 256)
                el.style.backgroundColor = "brown";
            if (map[i][j] == 512 || map[i][j] == 1024 || map[i][j] == 2048)
                el.style.backgroundColor = "red";
            if (map[i][j] >= 100)
                el.style.fontSize = "300%";
            if (map[i][j] >= 1000)
                el.style.fontSize = "200%";
            el.innerText = (map[i][j] == 0)? "" : map[i][j];
        }
}                

print_field(field, document);

document.addEventListener('keypress', 
(event) => 
{
   var code = event.code;
   if (code == "KeyW")
   {
       square(2);
       spawn();
       print_field(field, document);
   }
   if (code == "KeyS")
   {
       square(4);
       spawn();
       print_field(field, document);
   }
   if (code == "KeyA")
   {
       square(1);
       spawn();
       print_field(field, document);
   }
   if (code == "KeyD")
   {
       square(3);
       spawn();
       print_field(field, document);
   }
}
, false);
