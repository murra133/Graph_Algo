///Test///

//// Side Bar Toggle////
var type = "NA";
var start = ""
var location_ = []
var speed = 20;
var roads = [0,0]
var blocks = [0,0]
var rocks = [0,0]
var click = 0;
var grid_run =0;
var prev = ""
var trail = 2;
var road = .5;
var trees = 10;

function toggle_sidebar(button){
    if(button.getAttribute('class')=="inactive"){
        button.setAttribute('class',"active")
        document.getElementById('sidebar').setAttribute('class',"active")
    }
    else{
        button.setAttribute('class',"inactive")
        document.getElementById('sidebar').setAttribute('class',"inactive")
    }
}

function did(id){
    /// quick way to get and element by id
    return document.getElementById(id)
}
function dcl(class_){
    return document.getElementsByClassName(class_)
}
function qsa(selector){
    return document.querySelectorAll(selector)
}

function vle(element){
    if(element.getAttribute('value')=='n'){ 
    return element.getAttribute('value')}
    else{
        return parseFloat(element.getAttribute('value'))
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
function reset(){
    let v = qsa('.visit');
    let p = qsa('.path');
    let r = qsa('.relax');
    r.forEach(block=>{
        if(block.classList.contains('fa-solid')){
            block.classList.remove('relax')
        }
        else{
            block.className = 'nvisit'
        }
    })
    v.forEach(block=>{
        if(block.classList.contains('fa-solid')){
            block.classList.remove('visit')
        }
        else{
            block.className = 'nvisit'
        }
    })
    p.forEach(block=>{
        if(block.classList.contains('fa-solid')){
            block.classList.remove('path')
        }
        else{
            block.className = 'nvisit'
        }
    })
}
function speed_instant(checkbox){
    if(checkbox.checked){
        speed = 'instant';
    }
    else{
        speed=5
        speed_change(did(speed))
    }
}



function clear_(){
    removeAllChildNodes(did('grid'));
    grid_size()
    start=''
    location_=[]
}

function speed_change(bar){
    if (speed!='instant'){
        speed = bar.value;
        did('speed_val').innerHTML=bar.value+"ms"
    }

}

function length_change(input){
    if(input.id=="blank_l"){
        let blocks = qsa('.nvisit');
        blocks.forEach(block => {
            block.setAttribute('value',input.value)
        });
        trail = input.value;
    }
    else if(input.id=="road_l"){
        let blocks = qsa('.merge');
        blocks.forEach(block => {
            block.setAttribute('value',input.value)
        });
        road = input.value;
    }
    else if(input.id=="forest_l"){
        let blocks = qsa('.slow');
        blocks.forEach(block => {
            block.setAttribute('value',input.value)
        });
        trees = input.value;
    }
}

function grid_size(){
    let xgrid = document.getElementById('xgrid')
    let ygrid = document.getElementById('ygrid')
    if(xgrid.value>100){
        xgrid.value=100;
    }
    else if (xgrid.value<1){
        xgrid.vlaue = 1;
    }
    if(ygrid.value>100){
        ygrid.value=100
    }
    else if (ygrid.value<1){
        ygrid.vlaue = 1;
    }
    let xval = xgrid.value
    let yval=ygrid.value
    let grid = document.getElementById('grid');
    let xcurrent = document.getElementById('grid').children;
    let xcurrent_val = xcurrent.length

    for(let i = 0;i<xval;i++){
        if(i+1>xcurrent_val){
            let x = xcurrent_val+1;
            while(x<=xval){
                let x_div = document.createElement('div')
                x_div.setAttribute('class','row')
                x_div.id = "r"+x;
                for(let y_ = 1; y_ <=yval;y_++){
                    let y_div = document.createElement('div')
                    y_div.setAttribute('class',"nvisit")
                    y_div.id = x+"_"+y_;
                    y_div.setAttribute('onclick','change_click(this)')
                    y_div.setAttribute('value',trail)
                    x_div.append(y_div)
                }
                grid.append(x_div)
                x=x+1
            }
            i=xval
        }
        else{
            //// Add y values if yval>current
            let ycurrent_val = xcurrent[i].children.length;
            if(yval>ycurrent_val){
                for (let y_ = ycurrent_val+1;y_<=yval;y_++){
                    let y_div = document.createElement('div')
                    y_div.setAttribute('class',"nvisit")
                    let x_ = i+1
                    y_div.id = x_+"_"+y_;
                    y_div.setAttribute('onclick','change_click(this)')
                    y_div.setAttribute('value',trail)
                    xcurrent[i].append(y_div)
                }
            }
            else if(yval<ycurrent_val){
                for(let y_=ycurrent_val-1;y_>yval-1;y_--){
                    xcurrent[i].removeChild(xcurrent[i].children[y_])
                }
                
            }
        }
    }

        if (xval<xcurrent_val){
            for(let i = xcurrent_val-1;i>xval-1;i--){
                grid.removeChild(xcurrent[i])
            }
        }
        let hw = innerHeight
        let ww = innerWidth
        let w = grid.offsetWidth
        let h = grid.offsetHeight
        if (hw*.45-h/2<10 && ww*.45-w/2>10){
            grid.setAttribute('style',"top:0px; left:calc(45% - "+w/2+"px)")
        }
        else if (hw*.45-h/2>10 && ww*.45-w/2<10){
            grid.setAttribute('style',"top:calc(45% - "+h/2+"px); left:0px")

        }
        else if (hw*.45-h/2<10 && ww*.45-w/2<10){
            grid.setAttribute('style',"top:0px; left:0px")

        }
        else{
            grid.setAttribute('style',"top:calc(45% - "+h/2+"px); left:calc(45% - "+w/2+"px)")

        }



}

function change_click(element){
    let grid = grid_run
    if(type=="NA"){
        click=0;
        grid_run=0;
        return
    }
    if((element.classList.value == type.classList.value)){
        if(grid!=1){
            remove_type(element)
            click = 0
        }
        else{
            add_type_constant(element)
            grid_run=0
            click = 0
        }
        
        
    }
    ///For Home and Location///
    else if(type.classList.contains('start')||type.classList.contains('location')){
        "Running Single"
        add_single(element)
        click = 0;
        grid = 0;
    }
    else{
        
        click = 1
        grid_run = 1;
        add_type_constant(element)
    }
    
}
function algo(algo){
    document.getElementsByClassName("run-button")[0].setAttribute('onclick','choose_algo("'+algo.value+'")')
    let option = document.getElementsByTagName('option')
    for(let i=0;i<option.length;i++){
        if(option[i].value==algo.value){
            var title = option[i].innerHTML
        }
    }
    did('algo_title').innerHTML = title
}

function select_type(c_type){

    let all_types = document.getElementById('type').children
    for (let i=0;i<all_types.length;i++){
        all_types[i].removeAttribute('style')
    }
    let rows = document.getElementsByClassName('row');
    for(let i=0;i<rows.length;i++){
        let childs = rows[i].children
        for(let k=0;k<childs.length;k++){
            childs[k].addEventListener('mouseenter',function(){add_type_constant(childs[k])})
            childs[k].addEventListener('mouseover',function(e){e.preventDefault()})

        }
    }

    if (type.classList!=undefined && type.classList.value == c_type.classList.value){
        type = "NA"
    }
    else{ 
        type = c_type.cloneNode(true);
        c_type.setAttribute('style','opacity:.4')
        click = 0;
    }

}
function merge_cells(b,cell,c,v){
    let x = parseInt(cell.id.split("_")[0])
    let y = parseInt(cell.id.split("_")[1])
    v[cell.id]=1
    let top = did((x-1)+"_"+y)
    let left = did(x+"_"+(y-1))
    let right = did(x+"_"+(y+1))
    let bottom = did((x+1)+"_"+y)
    if (top!=null && top.className.split(' ')[2]=='merge' && v[top.id]==null){
        c =merge_cells(b,top,c+1,v)
    }
    if(left!=null && left.className.split(' ')[2]=='merge' && v[left.id]==null){
        c = merge_cells(b,left,c+1,v)
    }
    if(right!=null && right.className.split(' ')[2]=='merge' && v[right.id]==null){
        c = merge_cells(b,right,c+1,v)
    }
    if(bottom!=null && bottom.className.split(' ')[2]=='merge' && v[bottom.id]==null){
        c = merge_cells(b,bottom,c+1,v)
    }
    if(cell==b){
        let array = Object.keys(v)
        for(let i=0;i<array.length;i++){
            (did(array[i])).setAttribute('value',1/c)
        }
    }
    return c;

}

function remove_type(current_loc){
    let d_ = document.createElement('div');
    d_.setAttribute('class','nvisit')
    d_.id = current_loc.id
    d_.setAttribute('onclick','change_click(this)')
    d_.addEventListener('mouseenter',function(){add_type_constant(d_)})
    d_.setAttribute('value',trail)
    current_loc.replaceWith(d_)
    if(current_loc.className.split(' ')[2]=='start'){
        start = ''
    }
    else if(current_loc.className.split(' ')[2] =='location' ){
        let l = current_loc.innerHTML;
        for(let i = l;i<location_.length;i++){
            location_[i-1]=location_[i]
            document.getElementById(location_[i-1]).innerHTML=i;
        }
        location_.pop(-1)
    }
    else if(current_loc.className.split(' ')[2]=='merge'){
        // merge_cells(current_loc,current_loc,0,{})
    }
    if(type=="NA"){
        return
    }
    current_loc.replaceWith(d_)

}

function add_single(current_loc){
    let d_ = document.createElement('i');
    d_.id = current_loc.id;
    d_.className = type.className
    d_.setAttribute('onclick','change_click(this)')
        // d_.addEventListener('mouseenter',function(){add_type(d_)})
    d_.setAttribute('value','5')
    if(d_.className.split(' ')[2]=='start'){
        if(start!=""){
            let s = document.getElementsByClassName('nvisit')[0].cloneNode(true)
            s.id = start
            did(start).replaceWith(s)
        }
        start = d_.id
    }
    else if(d_.className.split(' ')[2] =='location' ){
        let l = location_.length;
        d_.innerHTML = l+1;
        location_.push(d_.id)
    }

    current_loc.replaceWith(d_)

}
function add_type_constant(current_loc){
    if(click==0){
        return
    }
    let d_ = document.createElement('i');
    d_.id = current_loc.id;
    d_.className = type.className
    d_.setAttribute('onclick','change_click(this)')
        // d_.addEventListener('mouseenter',function(){add_type(d_)})
    d_.setAttribute('value','5')
    if(d_.className.split(" ")[2]=='stop'){
        d_.setAttribute('value','n')
            
    }
    else if(d_.className.split(' ')[2]=='merge'){
            // let c = merge_cells(d_,d_,1,{})
            // d_.setAttribute('value',1/c)
        d_.setAttribute('value',road)
    }
    else if(d_.className.split(" ")[2]=='slow'){
        d_.setAttribute('value',trees)
    }
    current_loc.replaceWith(d_)

}


function create_visit_parent_map(){
    let gridx = parseInt(did('xgrid').value)
    let gridy = parseInt(did('ygrid').value);
    let mapv = {}
    let mapp = {}
    for(let i=1;i<(gridx+1);i++){
        mapv[i] = Array(gridy+1).fill(10000)
        mapp[i] = Array(gridy+1).fill(-1)
    }
    return [mapv,mapp]
}


//// Animattions ////

function animate_instant(element,i,stats){
    if(element[0][i]==-1){
        alert("No Path Found")
    }
    if(i>element[0].length-1){
        did('stat_visit').innerHTML = stats[0]
        did('stat_dist').innerHTML = stats[1]
        did('stat_time').innerHTML = stats[2]
        return
    }
    stats[0]=stats[0]+1;
    let class_a = element[0][i].className.split(' ')
    if(class_a[class_a.length-1]!='path'){
        stats[1]=stats[1]+vle(element[0][i]);
    }
    if(class_a[class_a.length-1]!='path'){
        element[0][i].className=element[1][i]
    }
    i=i+1
    animate_instant(element,i,stats)
    return
}

function animate_visit(element,i,stats){
    if(speed=='instant'){
        animate_instant(element,i,stats)
        return
    }
    if(element[0][i]==-1){
        alert("No Path Found")
    }
    if(i>element[0].length-1){
        did('stat_visit').innerHTML = stats[0]
        did('stat_dist').innerHTML = stats[1]
        did('stat_time').innerHTML = stats[2]
        return
    }
    stats[0]=stats[0]+1;
    if(element[1][i].split(' ').includes('path')){
        stats[1]=stats[1]+parseFloat(vle(element[0][i]));
        console.log(stats[1])
        element[0][i].removeAttribute('class');
        setTimeout(function(){
            element[0][i].className=element[1][i]
        },0)
        
    }
    if(!element[1][i].split(' ').includes('path')){
        element[0][i].removeAttribute('class');
        setTimeout(function(){
            element[0][i].className=element[1][i]
        },0)
        
    }

    setTimeout(function(){
    i=i+1
    animate_visit(element,i,stats)
    },speed)

    return 
}


////// Algorithms /////

function reconstruct_path(parent,floc,s,visited){
    //// Takes in a parent matrix and the final location ////
    c = floc
    let x = parseInt(c.split('_')[0])
    let y = parseInt(c.split('_')[1])
    if(c==s||parent[x][y]==-1){
        return visited
    }
    while(parent[x][y]!=null && parent[x][y]!=-1){
        let pid = parent[x][y]
        if(pid!= s){
            visited = push_visited(visited,did(pid),'path')
        }
        x = parseInt(pid.split('_')[0])
        y= parseInt(pid.split('_')[1])
}
return visited
}


function choose_algo(algo){
    let time = (new Date).getTime()
    if(start==''){
        alert("Starting Position Needs to be Chosen")
        return
    }
    if(location_.length==0){
        alert("No end location has been chosen")
        return
    }

    let loc = Math.floor(location_.length/2);
    let locl=loc;
    let locr=loc;
    let len = location_.length
    let visited = [[],[]]
    
    if (algo == 'bfs'){
        if (len==1){
            visited = bfs(start,start,location_[0], visited)
        }
        else if(len==2){
            visited = bfs(location_[0],start,location_[1],visited)
        }
        else{
            while(locl>=-1||locr<location_.length){
                /// Locations are equal////
                if(locl==locr){
                    visited = bfs(location_[loc],location_[loc-1],location_[loc+1],visited)
                    locl=locl-2
                    locr=locr+2
                }
                else if(locl>0 &&locr<location_.length-1){
                    visited = bfs(location_[locl],location_[locl-1],location_[locl+1],visited)
                    visited = bfs(location_[locr],location_[locr-1],location_[locr+1],visited)
                    locl=locl-2
                    locr=locr+2
                }
                else if(locl==-1||locl==0){

                    if (locl==0){
                        visited = bfs(location_[locl],start,location_[locl+1],visited)
                    }
                    else if(locl==-1){
                        visited = bfs(start,start,location_[0],visited)
                    }
                    if(locr<(len-1)){
                        visited = bfs(location_[locr],location_[locr-1],location_[locr+1],visited)
                        locr=locr+2
                    }
                    locl=locl-10
                }
                else if(locr==(len-2)||locr==(len-1)){
                    
                    if (locr==(len-2)){
                        visited = bfs(location_[locr],location_[locr-1],location_[locr+1],visited)
                    }
                    else if(locr==(len-1)){
                        visited = bfs(location_[locr],location_[locr-1],location_[locr],visited)
                    }
                    if(locl>0){
                        visited = bfs(location_[locl],location_[locl-1],location_[locl+1],visited)
                        locl=locl-2
                    }
                    locr=locr+10
                }
        
            }

        }
    }
    else if(algo=='dji2'||algo=='astar'){
        let s = start;
        let e;
        for(let i=0;i<location_.length;i++){
            e = location_[i]
            visited = bidjis(s,e,visited,algo)
            s=e
        }

    }
    let stats = [0,0,(new Date).getTime()-time]
    animate_visit(visited,0,stats)
}


function visited_push(element,visited){
    if(!element.classList.contains('path')&&!element.classList.contains('location')&&!element.classList.contains('start')){
        if(element.classList.contains('fa-solid')){
            visited[0].push(element)
            visited[1].push(element.className+' visit')
        }
        else{
            visited[0].push(element)
            visited[1].push('visit')
        }
    }
    return visited
}

/////Breadth First Search///////
function bfs(s,l,r,visited){
    let vn = 0;
    let map_ = create_visit_parent_map();
    let v=map_[0]; let parent=map_[1];
    let qu = [s];
    let c = qu[0]
    let z = qu[0]
    while((c!=l||z!=r)&&qu.length!=0){
        vn++
        let elementc = did(c)
        let elementz = did(z)
        visited = visited_push(elementc,visited)
        visited = visited_push(elementz,visited)
        if(z==r){
            var x = parseInt(c.split('_')[0])
            var y = parseInt(c.split('_')[1])
        }
        else if(c==l){
            var x = parseInt(z.split('_')[0])
            var y = parseInt(z.split('_')[1])
        }
        else{
            var x = parseInt(c.split('_')[0])
            var y = parseInt(c.split('_')[1])
        }
        v[x][y] =1;
        let top = did((x-1)+"_"+y)
        let xt = x-1
        let left = did(x+"_"+(y-1))
        let yl = y-1
        let right = did(x+"_"+(y+1))
        let yr = y+1
        let bottom = did((x+1)+"_"+y)
        let xb = x+1
        if(top!=null && vle(top)!='n'&&v[xt][y]!=1){
            qu.push(top.id)
            parent[xt][y] = x+"_"+y
            v[xt][y]=1
        }
        if(left!=null && vle(left)!='n'&&v[x][yl]!=1){
            qu.push(left.id)
            parent[x][yl] = x+"_"+y
            v[x][yl]=1
        }
        if(bottom!=null && vle(bottom)!='n'&&v[xb][y]!=1){
            qu.push(bottom.id)
            parent[xb][y] = x+"_"+y
            v[xb][y]=1
        }
        if(right!=null && vle(right)!='n'&&v[x][yr]!=1){
            qu.push(right.id)
            parent[x][yr] = x+"_"+y
            v[x][yr]=1
        }
        qu.shift()
        if(c!=l){
            c=qu[0]
        }
        if(z!=r){
            z=qu[0]
        }


    }


    if (c==l&&z==r){
        visited = reconstruct_path(parent,c,s,visited)
        visited = reconstruct_path(parent,z,s,visited)
        }
    else if(c==l&&z!=r){
        visited = reconstruct_path(parent,c,s,visited)
    }
    else if(c!=l&&z==r){
        visited = reconstruct_path(parent,z,s,visited)
    }
    else{
        alert("No Path has Been Found")
        return visited
    }

    return visited
    }

/////BiDirectional Djikstra//////

function heap_remove(heapv,heapid){
    let minv = heapv[1]
    let minid = heapid[1]
    heapv[1]=heapv[heapv.length-1]
    heapid[1]=heapid[heapid.length-1]
    heapv.pop()
    heapid.pop()
    loc =1;
    let c=1;

    ///Move Down////
    while(heapv[loc]>heapv[loc*2]||heapv[loc]>heapv[loc*2+1]&&c ==1){
        let tempv = heapv[loc];
        let tempid = heapid[loc];
        if (heapv[loc*2]==null&&heapv[loc*2+1]==null){
            c=1;
        }
        else if (heapv[loc*2]==null){
            heapv[loc]=heapv[loc*2+1]
            heapid[loc]=heapid[loc*2+1]
            heapv[loc*2+1]=tempv
            heapid[loc*2+1]=tempid
            loc = loc*2+1  
        }
        else if(heapv[loc*2+1]==null){
            heapv[loc]=heapv[loc*2]
            heapid[loc]=heapid[loc*2]
            heapv[loc*2]=tempv
            heapid[loc*2]=tempid
            loc = loc*2
        }
        else{
            if (heapv[loc*2]<heapv[loc*2+1]){
                heapv[loc]=heapv[loc*2]
                heapid[loc]=heapid[loc*2]
                heapv[loc*2]=tempv
                heapid[loc*2]=tempid
                loc = loc*2
                
            }
            else{
                heapv[loc]=heapv[loc*2+1]
                heapid[loc]=heapid[loc*2+1]
                heapv[loc*2+1]=tempv
                heapid[loc*2+1]=tempid
                loc = loc*2+1  
            }

        }
    }
    return [minv,minid,heapv,heapid]
}

function heap_insert(heapv,heapid,nv,nid){
    heapv.push(nv)
    heapid.push(nid)
    let loc = heapv.length-1;
    let ploc = Math.floor(loc/2)

    ////Move Up////
    while(loc!=1&&heapv[loc]<heapv[ploc]){
        let tempv = heapv[loc];
        let tempid = heapid[loc];
        heapv[loc]= heapv[ploc]
        heapid[loc]=heapid[ploc]
        heapid[ploc]=tempid
        heapv[ploc]=tempv
        loc = ploc;
        ploc = Math.floor(loc/2)
    }

    return [heapv,heapid]
}

function check_source(id_,tree){

    let x = parseInt(id_.split('_')[0])
    let y = parseInt(id_.split('_')[1])

    if (tree[x][y]==-1){
        return [tree,id_]
    }
    else{
        let s = check_source(tree[x][y],tree)
        id_=s[1]
        tree = s[0]
        tree[x][y] = id_
    }
    return [tree,id_]
}

function dist(x1,x2,y1,y2){
    return(Math.sqrt(parseFloat(((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)))))
}

function push_visited(visited,element,action){
    let class_a = element.className.split(' ')
    if(class_a[class_a.length-1]!='path'){
        
        if(class_a.length>1){
            action = element.className+" "+action
        }
        visited[0].push(element)
        visited[1].push(action)
    }
    else{
        visited[0].push(element)
        visited[1].push(element.className)
    }
    return visited
}


function search_side(side,xs,ys,xp,yp,psource,v,tree,visited,parent,pqv,pqid,algo,start,end,relaxed_map){
    let side_source; let s;
    s = check_source(xp+"_"+yp,tree)
        side_source = s[1]
        tree=s[0]
    if (side!=null&&vle(side)!='n'&&v[xs][ys]!=0){
        if(tree[xs][ys]==-1){
            s = check_source(xp+"_"+yp,tree)
            side_source = s[1]
            tree=s[0]
            tree[xs][ys] = side_source
            
        }
        else{
            s = check_source(side.id,tree)
            side_source = s[1]
            tree=s[0]
            if(side_source!=psource&&relaxed_map[xs][ys]==1){
                visited = push_visited(visited,side,'path')
                return [1,side.id,v,visited,tree,parent]
        }

        }
        let d;let x; let y;
        if(algo=="astar"){
            if(side_source==start){
                x = parseInt(end.split("_")[0])
                y = parseInt(end.split("_")[1])
                d = dist(xs,x,ys,y)
            }
            else{
                x = parseInt(start.split("_")[0])
                y = parseInt(start.split("_")[1])
                d = dist(xs,x,ys,y)
            }
        }
        else{
            d= 0;
        }
        
        if((v[xp][yp]+vle(side))<v[xs][ys]){
            v[xs][ys]=v[xp][yp]+vle(side)
            parent[xs][ys] = xp+"_"+yp
            tree[xs][ys] = xp+"_"+yp
            let q = heap_insert(pqv,pqid,v[xs][ys]+d,side.id)
            pqv=q[0]
            pqid =q[1]
            visited = push_visited(visited,side,'visit')
        }
    }
    return[pqv,pqid,v,visited,tree,parent]
}

function check_sides_final(xp,yp,){

}
function djiv(id_,pqv,pqid,v,parent,visited,tree,algo,start,end,relaxed_map){
    let x = parseInt(id_.split("_")[0])
    let y = parseInt(id_.split("_")[1])
    let s = check_source(id_,tree)
    let val;
    sid_=s[1]
    tree = s[0]
    ///// Running on Top variable /////
    let top = did((x-1)+"_"+y)
    let xt = x-1
    val = search_side(top,xt,y,x,y,sid_,v,tree,visited,parent,pqv,pqid,algo,start,end,relaxed_map);
    pqv=val[0];pqid=val[1];v=val[2];visited=val[3];tree=val[4];parent=val[5]
    if(pqv==1){
        return [pqv,pqid,v,parent,visited,tree]
    }

    ///// Running on Left//////
    let left = did(x+"_"+(y-1))
    let yl = y-1
    val = search_side(left,x,yl,x,y,sid_,v,tree,visited,parent,pqv,pqid,algo,start,end,relaxed_map);
    pqv=val[0];pqid=val[1];v=val[2];visited=val[3];tree=val[4];parent=val[5]
    if(pqv==1){
        return [pqv,pqid,v,parent,visited,tree]
    }

    ///// Running on right//////
    let right = did(x+"_"+(y+1))
    let yr = y+1

    val = search_side(right,x,yr,x,y,sid_,v,tree,visited,parent,pqv,pqid,algo,start,end,relaxed_map);
    pqv=val[0];pqid=val[1];v=val[2];visited=val[3];tree=val[4];parent=val[5]
    if(pqv==1){
        return [pqv,pqid,v,parent,visited,tree]
    }

    ///// Running Bottom //////
    let bottom = did((x+1)+"_"+y)
    let xb = x+1
    val = search_side(bottom,xb,y,x,y,sid_,v,tree,visited,parent,pqv,pqid,algo,start,end,relaxed_map);
    pqv=val[0];pqid=val[1];v=val[2];visited=val[3];tree=val[4];parent=val[5]
    if(pqv==1){
        return [pqv,pqid,v,parent,visited,tree]
    }

    return [pqv,pqid,v,parent,visited,tree]

}

function relax_section(id,visited,relaxed_map){
    if(!did(id).classList.contains('start')&&!did(id).classList.contains('location')){
        if(did(id).classList.contains('fa-solid')){
            visited[1].push(did(id).className+' relax')
        }
        else{
            visited[1].push('relax')
        }
        visited[0].push(did(id));
        
    }
    let x = id.split('_')[0]
    let y = id.split('_')[1]
    relaxed_map[x][y]=1;
    return [relaxed_map,visited]
}

function bidjis(s,r,visited,algo){
    let pqv = [0]
    let pqid = [0]
    let n;
    let map_ = create_visit_parent_map();
    let v=map_[0]; let parent=map_[1];
    map_ = create_visit_parent_map();
    let tree = map_[1]; let relaxed_map = map_[0];
    v[s.split('_')[0]][s.split('_')[1]] = 0
    v[r.split('_')[0]][r.split('_')[1]] = 0
    n = relax_section(s,visited,relaxed_map);
    visited = n[1]; relaxed_map = n[0]
    let mp = djiv(s,pqv,pqid,v,parent,visited,tree,algo,s,r,relaxed_map)
    let minv;let minid;
    pqv =mp[0];pqid = mp[1];v=mp[2];parent=mp[3];visited=mp[4];tree = mp[5]
    n = relax_section(r,visited,relaxed_map);
    visited = n[1]; relaxed_map = n[0]
    mp = djiv(r,pqv,pqid,v,parent,visited,tree,algo,s,r,relaxed_map)
    pqv =mp[0];pqid = mp[1];v=mp[2];parent=mp[3];visited=mp[4];tree = mp[5]
    
    while(pqv!=1&&pqv.length!=1){
        console.log(pqv)
        mp = heap_remove(pqv,pqid)
        minv = mp[0]; minid=mp[1];pqv=mp[2];pqid=mp[3]
        n = relax_section(minid,visited,relaxed_map);
        visited = n[1]; relaxed_map = n[0]
        mp = djiv(minid,pqv,pqid,v,parent,visited,tree,algo,s,r,relaxed_map)
        pqv =mp[0];pqid = mp[1];v=mp[2];parent=mp[3];visited=mp[4];tree = mp[5]
        
    }
    if(pqv.length==1){
        visited[0].push(-1)
        return visited
    }
    visited = push_visited(visited,did(minid),'path')
    visited = reconstruct_path(parent,minid,s,visited)
    visited = reconstruct_path(parent,pqid,s,visited)

    return visited;




}