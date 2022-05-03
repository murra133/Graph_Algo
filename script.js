///Test///

////Global Variables////
var speed = 20;

///Graph Variables///
var type = "NA";
var start = ""
var location_ = []
var roads = [0,0]
var blocks = [0,0]
var rocks = [0,0]
var click = 0;
var grid_run =0;
var prev = ""
var trail = 2;
var road = .5;
var trees = 10;
////Sort Variables////
var sort_array=[];
var length = 0;
var max = 0;
var animation_arr = []


//// Side Bar Toggle////

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

    if (did("data")!=undefined){
        removeAllChildNodes(did('data'));
        visualize_sort();
    }
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
    if(did("grid")!=null){
        removeAllChildNodes(did('grid'));
        grid_size()
        start=''
        location_=[]
    }
    else if(did('data')!=null){
        removeAllChildNodes(did('data'))
        did("sort_values").value = ""
        array_val=[];
    }

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
        mapv[i] = Array(gridy+1).fill(Infinity)
        mapp[i] = Array(gridy+1).fill(-1)
    }
    return [mapv,mapp]
}

function create_infinite_value_map(){
    let gridx = parseInt(did('xgrid').value)
    let gridy = parseInt(did('ygrid').value);
    let mapv = {}
    for(let i=1;i<(gridx+1);i++){
        mapv[i] = Array(gridy+1).fill(Infinity)
    }
    return mapv
}

function create_boolean_value_map(){
    let gridx = parseInt(did('xgrid').value)
    let gridy = parseInt(did('ygrid').value);
    let visited = false;
    let mapv = {}
    for(let i=1;i<(gridx+1);i++){
        mapv[i] = Array(gridy+1).fill(visited)
    }
    return mapv
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
    console.log(parent);
    c = floc
    let x = parseInt(c.split('_')[0])
    let y = parseInt(c.split('_')[1])
    if(c==s||parent[x][y]==-1){
        return visited
    }
    while(parent[x][y]!=null && parent[x][y]!=-1){
        let pid = parent[x][y]
        console.log(pid);
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
    else if(algo=="dfs"){
     let s=start;
     let e;
     for (let i=0;i<location_.length;i++){
         e=location_[i];
         visited = dfs(s,e,visited)
        }
     }
     else if(algo=="dji"){
        console.log("astar")
        let s = start;
        let e;
        for(let i=0;i<location_.length;i++){
            e = location_[i]
            visited = djikstra(s,e,visited,algo)
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
///// Depth First Search/////
function dfs(s,e,visited){
    let map_ = create_visit_parent_map();
    let v=map_[0]; let parent=map_[1];
    let stack = [s]
    let loc = s;

    while (loc!=e&&stack.length!=0){
        stack.shift()
        var x = parseInt(loc.split('_')[0])
        var y = parseInt(loc.split('_')[1])
        visited = visited_push(did(loc),visited)
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
            stack.unshift(top.id)
            parent[xt][y] = x+"_"+y
            v[xt][y]=1
        }
        if(left!=null && vle(left)!='n'&&v[x][yl]!=1){
            stack.unshift(left.id)
            parent[x][yl] = x+"_"+y
            v[x][yl]=1
        }
        if(bottom!=null && vle(bottom)!='n'&&v[xb][y]!=1){
            stack.unshift(bottom.id)
            parent[xb][y] = x+"_"+y
            v[xb][y]=1
        }
        if(right!=null && vle(right)!='n'&&v[x][yr]!=1){
            stack.unshift(right.id)
            parent[x][yr] = x+"_"+y
            v[x][yr]=1
        }
        
        if(loc!=e){
            loc=stack[0]
        }
    }
    
    if(loc==e){
        visited = reconstruct_path(parent,e,s,visited)
    }
    else{
        alert("No Path has Been Found")
        return visited
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

function heap_remove(heapv,heapid,action){
    console.log(heapv)
    ////Set action to "graph" if this function is to be ran in a graph function
    let length_diff;
    let minv = heapv[1]
    let minid = heapid[1]
    if(action!='graph'){
        ///Remove the first
        length_diff = sort_array.length-heapv.length+1
        action.push('l_'+length_diff);
        // console.log('l_'+length_diff)
    }
    heapv[1]=heapv[heapv.length-1]
    heapid[1]=heapid[heapid.length-1]
    heapv.pop()
    heapid.pop()
    length_diff = sort_array.length-heapv.length+1
    if(action!='graph'){
        let l = length_diff
        action.push('v_'+(sort_array.length-1))
        action.push('i_'+(sort_array.length -1)+"_"+l)
        // for(let i=(sort_array.length-1);i>l;i--){
        //     action.push('s_'+i+'_'+(i-1))
        // }
    }
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
            if(action!='graph'){
                action.push('v_'+(loc*2+1))
                action.push('s_'+(loc+length_diff-1)+'_'+(loc*2+length_diff));
            }
            heapv[loc]=heapv[loc*2+1]
            heapid[loc]=heapid[loc*2+1]
            heapv[loc*2+1]=tempv
            heapid[loc*2+1]=tempid
            loc = loc*2+1  

        }
        else if(heapv[loc*2+1]==null){
            if(action!='graph'){
                action.push('v_'+(loc*2))
                action.push('s_'+(loc+length_diff-1)+'_'+(loc*2+length_diff-1));
            }
            heapv[loc]=heapv[loc*2]
            heapid[loc]=heapid[loc*2]
            heapv[loc*2]=tempv
            heapid[loc*2]=tempid
            loc = loc*2
        }
        else{
            if (heapv[loc*2]<heapv[loc*2+1]){
                if(action!='graph'){
                    action.push('v_'+(loc*2))
                    action.push('s_'+(loc+length_diff-1)+'_'+(loc*2+length_diff-1));
                }
                heapv[loc]=heapv[loc*2]
                heapid[loc]=heapid[loc*2]
                heapv[loc*2]=tempv
                heapid[loc*2]=tempid
                loc = loc*2
                
            }
            else{
                if(action!='graph'){
                    action.push('v_'+(loc*2+1))
                    action.push('s_'+(loc+length_diff-1)+'_'+(loc*2+length_diff));
                }
                heapv[loc]=heapv[loc*2+1]
                heapid[loc]=heapid[loc*2+1]
                heapv[loc*2+1]=tempv
                heapid[loc*2+1]=tempid
                loc = loc*2+1  
            }

        }
    }
    // console.log(action)
    if(action!='graph'){
        // action.push('d_'+loc);
        action.push('dv')
        return [heapv,heapid,action,minv]
    }
    return [minv,minid,heapv,heapid]
}

function heap_insert(heapv,heapid,nv,nid,action){
    heapv.push(nv)
    heapid.push(nid)
    let loc = heapv.length-1;
    let ploc = Math.floor(loc/2)
    if(action!='graph'){
        action.push('a_'+(loc-1))
    }

    ////Move Up////
    while(loc!=1&&heapv[loc]<heapv[ploc]){
        if(action!='graph'){
            ///This is for the sort animation on the sort site
            action.push('v_'+(ploc-1))
            action.push('s_'+(loc-1)+"_"+(ploc-1))
        }
        let tempv = heapv[loc];
        let tempid = heapid[loc];
        heapv[loc]= heapv[ploc]
        heapid[loc]=heapid[ploc]
        heapid[ploc]=tempid
        heapv[ploc]=tempv
        loc = ploc;
        ploc = Math.floor(loc/2)
    }
    if(action!='graph'){
        ///Returns the locations and the animation for heap sort///
        action.push('d_'+(loc-1))
        action.push('dv')
        return [heapv,heapid,action]
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
    return(Math.sqrt(parseFloat(((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))))*trail)
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
        d=0;
        if(algo=="astar"){
            x = parseInt(end.split("_")[0])
            y = parseInt(end.split("_")[1])
            d = dist(xs,x,ys,y)
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
        if((v[xp][yp]+vle(side))<v[xs][ys]){
            v[xs][ys]=v[xp][yp]+vle(side)
            parent[xs][ys] = xp+"_"+yp
            tree[xs][ys] = xp+"_"+yp
            let q = heap_insert(pqv,pqid,v[xs][ys]+d,side.id,'graph')
            pqv=q[0]
            pqid =q[1]
            visited = push_visited(visited,side,'visit')
        }
    }
    return[pqv,pqid,v,visited,tree,parent]
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
        mp = heap_remove(pqv,pqid,'graph')
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
    console.log(v)


    return visited;
}

function biastar(s,r,visited,algo){
    ////Inititializes Priority Q for start and end///
    let pqvs = [0]
    let pqids = [0]
    let pqve = [0]
    let pqide = [0]
    let n;
    let minv;let minid;
    ////Create Emmpty grids representing the system///
    let map_ = create_visit_parent_map();
    let v=map_[0]; let parent=map_[1];
    map_ = create_visit_parent_map();
    let tree = map_[1]; let relaxed_map = map_[0];
    v[s.split('_')[0]][s.split('_')[1]] = 0
    v[r.split('_')[0]][r.split('_')[1]] = 0
    ///relax section to be visited///
    n = relax_section(s,visited,relaxed_map);
    visited = n[1]; relaxed_map = n[0]
    ///Visit start send in end as end///
    let mp = djiv(s,pqvs,pqids,v,parent,visited,tree,algo,s,r,relaxed_map)
    pqvs =mp[0];pqids = mp[1];v=mp[2];parent=mp[3];visited=mp[4];tree = mp[5];
    ////Relax End Section////
    n = relax_section(r,visited,relaxed_map);
    visited = n[1]; relaxed_map = n[0]
    ///Visit end send in start as end////
    mp = djiv(r,pqve,pqide,v,parent,visited,tree,algo,r,s,relaxed_map)
    pqve =mp[0];pqide = mp[1];v=mp[2];parent=mp[3];visited=mp[4];tree = mp[5]

    ///Choose side to visit first///


    while(pqvs!=1&&pqvs.length!=1&&pqve!=1&&pqve.length!=1){
        console.log('s')
        console.log(pqvs)
        console.log(pqids)
        console.log('e')
        console.log(pqve)
        console.log(pqide)
        if(pqvs[1]>pqve[1]){
            mp = heap_remove(pqve,pqide,'graph')
            minv = mp[0]; minid=mp[1];pqve=mp[2];pqide=mp[3]
            n = relax_section(minid,visited,relaxed_map);
            visited = n[1]; relaxed_map = n[0]
            mp = djiv(minid,pqve,pqide,v,parent,visited,tree,algo,r,pqids[1],relaxed_map)
            pqve =mp[0];pqide = mp[1];v=mp[2];parent=mp[3];visited=mp[4];tree = mp[5]
        }
        else{
            mp = heap_remove(pqvs,pqids,'graph')
            minv = mp[0]; minid=mp[1];pqvs=mp[2];pqids=mp[3]
            n = relax_section(minid,visited,relaxed_map);
            visited = n[1]; relaxed_map = n[0]
            mp = djiv(minid,pqvs,pqids,v,parent,visited,tree,algo,s,pqide[1],relaxed_map)
            pqvs =mp[0];pqids = mp[1];v=mp[2];parent=mp[3];visited=mp[4];tree = mp[5]
        }
    }
    if(pqve.length==1&&pqvs.length==1){
        visited[0].push(-1)
        return visited
    }
    console.log(v)
    visited = push_visited(visited,did(minid),'path')
    visited = reconstruct_path(parent,minid,s,visited)
    visited = reconstruct_path(parent,minid,r,visited)

    return visited;
}

function djikstra(s,r,visited,algo){
    let count = 0;
    let gridx = parseInt(did('xgrid').value)
    let gridy = parseInt(did('ygrid').value);
    let map_ = create_infinite_value_map();
    map_[s.split('_')[0]][s.split('_')[1]] = 0;
    let map_visited = create_boolean_value_map();
    let parent = create_visit_parent_map()[1];
    let map_path = create_visit_parent_map()[1];
    x = parseInt(s.split('_')[0]);
    y = parseInt(s.split('_')[1]);
    destination_x = parseInt(r.split('_')[0]);
    destination_y = parseInt(r.split('_')[1]);
    push_visited(visited,did(x+"_"+y),"visit");
    finished = false;
    while(!finished){
        push_visited(visited,did(x+"_"+y),"relax");
        if((x < gridx)&&(vle(did((x+1)+"_"+y))!='n')){
            var original_loc = did((x+1)+"_"+y);
            if((x+1==destination_x)&&(y==destination_y)){
                var original_loc_value = 0;
            }
            else{
                var original_loc_value = vle(original_loc);
            }
            if(map_visited[x+1][y]!=true){
                push_visited(visited,did((x+1)+"_"+y),"visit");
                if((map_[x+1][y]>original_loc_value+map_[x][y])&&map_visited[x+1][y] == false){
                    map_[x+1][y]=original_loc_value+map_[x][y];
                    map_path[x+1][y] = x+"_"+y;
                }
            }
        }
        if((x > 1)&&(vle(did((x-1)+"_"+y))!='n')){
            var original_loc = did((x-1)+"_"+y);
            if((x-1==destination_x)&&(y==destination_y)){
                var original_loc_value = 0;
            }
            else{
                var original_loc_value = vle(original_loc);
            }
            if(map_visited[x-1][y]!=true){
                push_visited(visited,did((x-1)+"_"+y),"visit");
                if((map_[x-1][y]>original_loc_value+map_[x][y])&&map_visited[x-1][y] == false){
                    map_[x-1][y]=original_loc_value+map_[x][y];
                    map_path[x-1][y] = x+"_"+y;
                }
            }
        }
        if((y < gridy)&&(vle(did(x+"_"+(y+1)))!='n')){
            var original_loc = did(x+"_"+(y+1));
            if((x==destination_x)&&(y+1==destination_y)){
                var original_loc_value = 0;
            }
            else{
                var original_loc_value = vle(original_loc);
            }
            if(map_visited[x][y+1]!=true){
                push_visited(visited,did(x+"_"+(y+1)),"visit");
                if((map_[x][y+1]>original_loc_value+map_[x][y])&&map_visited[x][y+1] == false){
                    map_[x][y+1]=original_loc_value+map_[x][y];
                    map_path[x][y+1] = x+"_"+y;
                }
            }
        }
        if((y > 1)&&(vle(did(x+"_"+(y-1)))!='n')){
            var original_loc = did(x+"_"+(y-1));
            if((x==destination_x)&&(y-1==destination_y)){
                var original_loc_value = 0;
            }
            else{
                var original_loc_value = vle(original_loc);
            }
            if(map_visited[x][y-1]!=true){
                push_visited(visited,did(x+"_"+(y-1)),"visit");
                if((map_[x][y-1]>original_loc_value+map_[x][y])&&map_visited[x][y-1] == false){
                    map_[x][y-1]=original_loc_value+map_[x][y];
                    map_path[x][y-1] = x+"_"+y;
                }
            }
        }
        map_visited[x][y]= true;
        map_temp = map_;
        console.log(map_visited);
        console.log(map_visited[2][3]);
        for(var i = 1; i <= gridx; i++){
            for(var j = 1; j <= gridy; j++){
                if(map_visited[i][j] == true){
                    console.log(i+"_"+j);
                    map_temp[i][j] = Infinity;
                }
            }
        }      
        console.log(map_temp)
        console.log(r.split('_')[0]);
        console.log(x);
        var min = Infinity;
        for(var i = 1; i <= gridx; i++){
            for(var j = 1; j <= gridy; j++){
                if(map_temp[i][j] < min){
                    min = map_temp[i][j];
                    x = i;
                    y = j;
                }
            }
        } 
        console.log(vle(did(r.split('_')[0]+"_"+r.split('_')[1])));
        console.log(map_path);
        console.log(x);
        console.log(y);
        console.log(parseInt(r.split('_')[0]));
        console.log(parseInt(r.split('_')[1]));
        //push_visited(visited,did(x+"_"+y),"visit");
        if((x==parseInt(r.split('_')[0]))&&(y==parseInt(r.split('_')[1]))){
            finished = true;
        }
    }
    visited = reconstruct_path(map_path,r,s,visited)
     return visited;
}



/*
* This section houses all the sorting related Algoriths
*/

function choose_sort(sort){
    ///Reset ViewPort to Standard////
    let data = did('data').cloneNode(true);
    removeAllChildNodes(did('view_port'))
    did('view_port').appendChild(data)
    if(sort.value=='qs'){
        did('buttons').children[0].setAttribute('onclick','qsort_start()');
    }
    else if(sort.value=='cs'){
        did('buttons').children[0].setAttribute('onclick','count_sort()');
        let count_view = document.createElement('div');
        count_view.id = "count-view"
        let max_val = document.createElement('h3');
        max_val.innerHTML = "Max Value: ";
        let array = document.createElement('div');
        array.id = 'count_array';
        count_view.appendChild(max_val);
        count_view.appendChild(array)
        did('view_port').appendChild(count_view)
    }
    else if(sort.value == 'is'){
        did('buttons').children[0].setAttribute('onclick','insertion_sort()');
    }
    else if(sort.value == 'mg'){
        max = Math.max(...sort_array);
        length = sort_array.length-1;
        did('buttons').children[0].setAttribute('onclick','merge_sort(sort_array, 0, length)');
    }
    else if ('hs'){
        did('buttons').children[0].setAttribute('onclick','heap_sort()');
    }
    
}

function animate_sort(action_array,start){
    /*
    * Activate Value = a_val, ex. a_1
    * Lock Value =l_val, ex. l_1
    * Swap Values = s_val1_val2, ex. s_3_10
    * Deactivate Values = d_val, ex. d_1
    * Visit value = v_val, ex v_1
    * Devisit value = dv_val, ex dv_1
    * count value = c_id, ex, c_0 this is specific to the count sort
    * count active by id = ac_val, ex ac_0
    * count deactive by id = dc_val, ex dc_0
    * Replace with histo = r_loc_max_val_len, ex r_0_60_10_400 <-Creates new Histogram to replace current
    * Insert Div = i_val_beforeval, ex i_2_5, insert item 2 before 5
    */
    if(start>=action_array.length){
        return
    }
    let div_array = did("data").children;
        let actions=action_array[start].split("_");
        let loc = parseInt(actions[1])
        switch(actions[0]){
            case "s":
                let loc2 = parseInt(actions[2])
                let temp2 = div_array[loc2].cloneNode(true);
                let temp1 = div_array[loc].cloneNode(true);
                div_array[loc2].replaceWith(temp1);
                div_array[loc].replaceWith(temp2);
                break;
            case "a":
                div_array[loc].classList.add('s_active');
                break;
            case "d":
                div_array[loc].classList.remove('s_active');
                break;
            case "v":
                div_array[loc].classList.add('s_visit')
                break;
            case "dv":
                let visit = qsa('.s_visit');
                visit.forEach(v=>{
                    v.classList.remove('s_visit');
                })
                break;
            case "l":
                div_array[loc].classList.remove('s_active')
                div_array[loc].classList.add('s_lock');
                break;
            case "c":
                did(action_array[start]).innerHTML = parseInt(did(action_array[start]).innerHTML)+1;
                break;
            case "ac":
                did("c_"+loc).classList.add('s_active')
                break;
            case "dc":
                did("c_"+loc).classList.remove('s_active')
                break;
            case "r":
                let max = parseInt(actions[2]);
                let value = parseInt(actions[3])
                let length = parseInt(actions[4])
                let histo = create_histo(max,value,length);
                div_array[loc].replaceWith(histo)
                break;
            case "i":
                let last_div = did('data').children[loc]
                let clone_div = last_div.cloneNode(true)
                did('data').removeChild(last_div)
                did('data').insertBefore(clone_div,did('data').children[actions[2]])
                break;
        }
        setTimeout(function(){
            animate_sort(action_array,start+1)
        },speed)

    }


function isNumeric(val){
    if(parseInt(val)!=val){
        return false;
    }
    else{
        return true
    }
}

function draw_to_viewport(value_array,max){
    let view_port = did("data");
    removeAllChildNodes(view_port);
    for(let i=0;i<value_array.length;i++){
        let histo = create_histo(max,value_array[i],value_array.length)
        view_port.appendChild(histo);
    }
}
function randomnize_sort(){
    let quantity = parseInt(did("n_nodes").value);
    let low = parseInt(did("range_low").value);
    let high = parseInt(did("range_high").value);
    let array_val = Array();
    let input;
    max=10;
    for (let i=0;i<quantity;i++){
        let value = Math.floor(Math.random()*(high-low)+low)
        if(i==0){
            input=value.toString()
        }
        else{
            input=input+","+value.toString()
        }
        if(value>max){
            max=value;
        }
        array_val.push(value)
    }
    draw_to_viewport(array_val,max);
    did('sort_values').value = input;
    sort_array = array_val;

}

function create_histo(max_value,c_value,quantity){
    let height = c_value/max_value*600
    let width = 1350/quantity;
    if(width>25){
        width = 25
    }
    let histo = document.createElement('div');
    histo.setAttribute('style',"width:"+width+"px; height:"+height+"px")
    histo.setAttribute('class','value_box');
    if(width<2){
        let border = 0;
        histo.setAttribute('style',"width:"+width+"px; height:"+height+"px;border:"+border+"px;background-color:black")
    }


    return histo;
}
function visualize_sort(){
    let input = did('sort_values').value;
    if(input[(input.length-1)]==","){
        return
    }
    values = input.split(',');
    let value;
    let array_val = Array();
    max=0;
    for(let i=0;i<values.length;i++){
        value=values[i];
        if(!isNumeric(value)){
            alert("Invalid Input Detected");
            return
        }
        value = parseInt(value);
        if (value>max){
            max=value;
        }
        array_val.push(value);
        }
    
    let view_port = did("data");
    removeAllChildNodes(view_port);
    for(let i=0;i<array_val.length;i++){
        let histo = create_histo(max,array_val[i],array_val.length)
        view_port.appendChild(histo);
    }
    sort_array=array_val;
}

function naive_sort(){
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }
    let animation_arr = [];
    for(let i=0;i<sort_array.length;i++){
        let min_pos=i;
        animation_arr.push('a_'+i);
        for(let k=i+1;k<sort_array.length;k++){
            animation_arr.push('v_'+k)
            if(sort_array[k]<sort_array[min_pos]){
                min_pos=k;
            }

        }
        animation_arr.push('a_'+min_pos);
        animation_arr.push('s_'+i+'_'+min_pos);
        animation_arr.push('l_'+i);
        animation_arr.push('d_'+min_pos);
        let temp = sort_array[i];
        sort_array[i]=sort_array[min_pos];
        sort_array[min_pos] = temp;
        animation_arr.push('dv'); 
    }

    animate_sort(animation_arr,0)
}

function qsort_start(){
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }
    
    qsort(0,sort_array.length);
    animate_sort(animation_arr,0)
    animation_arr=[];

}

function qsort(left,right){
    animation_arr.push("a_"+left);
    ///array = animation array, qsort sorts the global variable sort_array, not sent in as parameter///
    let l=left+1;
    let r = right-1;
    if(l>(r)){
        animation_arr.push('l_'+left)
        return;
    }
    animation_arr.push('v_'+l);
    animation_arr.push('v_'+r);
    
    let temp;
    while(l<r){
        while(sort_array[l]<=sort_array[left]&&l<r){
            animation_arr.push('v_'+(l));
            l++;
        }
        while(sort_array[r]>=sort_array[left] &&l<r){
            animation_arr.push('v_'+(r))
            r--;
        }
        if(sort_array[l]>sort_array[left]&&sort_array[r]<sort_array[left]&&l<r){
            temp =sort_array[r];
            sort_array[r] = sort_array[l];
            sort_array[l]=temp;
            /// Animations///
            ///Visit///
            animation_arr.push("v_"+l);
            animation_arr.push("v_"+(r))
            ///Swap///
            animation_arr.push("s_"+l+"_"+(r))

            l=l+1;
            r=r-1;
        }

    }

    if(sort_array[l]>=sort_array[left]){
        temp = sort_array[l-1];
        sort_array[l-1]=sort_array[left];
        sort_array[left]=temp;

        ///animation///
        animation_arr.push('s_'+(l-1)+"_"+left);
        animation_arr.push('l_'+(l-1));
        animation_arr.push('dv');

        qsort(left,l-1);
        ///Sent right Side///
        qsort(l,right);
    }
    else{
        temp = sort_array[l];
        sort_array[l]=sort_array[left];
        sort_array[left]=temp;
        
        ///animation///
        animation_arr.push('s_'+(l)+"_"+left);
        animation_arr.push('l_'+(l));
        animation_arr.push('dv');
        qsort(left,l);
        ///Sent right Side///
        qsort(l+1,right);
    }



    return;
}

function insertion_sort(){
    let arr = new Array();
        /*
    * Activate Value = a_val, ex. a_1
    * Lock Value =l_val, ex. l_1
    * Swap Values = s_val1_val2, ex. s_3_10
    * Deactivate Values = d_val, ex. d_1
    * Visit value = v_val, ex v_1
    * Devisit value = dv_val, ex dv_1
    * count value = c_id, ex, c_0 this is specific to the count sort
    * count active by id = ac_val, ex ac_0
    * count deactive by id = dc_val, ex dc_0
    * Replace with histo = r_loc_max_val_len, ex r_0_60_10_400 <-Creates new Histogram to replace current
    * Insert Div = i_val_beforeval, ex i_2_5, insert item 2 before 5
    */
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }
    
    let n = sort_array.length;
    let start = sort_array;
    for(let i = 1; i < n; i++){
        let key = sort_array[i];
        let j = i - 1;
        animation_arr.push('a_'+i);
        while(j >= 0 && sort_array[j] > key){
            animation_arr.push('v_'+(j+1));
            animation_arr.push('v_'+j);
            sort_array[j + 1] = sort_array[j];
            j--;
        }
        animation_arr.push('dv_'+(j+2));
        animation_arr.push('dv_'+(j+1));
        sort_array[j + 1] = key;
        animation_arr.push('i_'+i+'_'+(j+1));
        animation_arr.push('d_'+(j+1));
    }
    for(let i = 0; i < n; i++){
        animation_arr.push('l_'+i);
    }
    animate_sort(animation_arr,0)
    animation_arr=[];
}

function merge_sort(arr, l, r){
    merge_sort1(arr, l, r);
    for(let i = 0; i < sort_array.length; i++){
        animation_arr.push('l_'+i);
    }
    animate_sort(animation_arr,0)
    animation_arr=[];
}

function merge_sort1(arr, l, r){
    if (l < r) {
        let m = (l+ Math.floor((r-l)/2));
        merge_sort1(arr, l, m);
        merge_sort1(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

function merge(arr, l, mid, r){
        let n1 = mid - l + 1;
        let n2 = r - mid;
        let L = new Array(n1);
        let R = new Array(n2);
        for(let i = 0; i < n1; ++i){
            L[i] = arr[l + i];
        }
        for(let j = 0; j < n2; ++j){
            R[j] = arr[mid + 1 + j];
        }
        let i = 0
        let j = 0;
        let k = l;
        while (i < n1 && j < n2) {
            animation_arr.push('v_'+(l+i));
            animation_arr.push('v_'+(mid + 1+j));
            if (L[i] <= R[j]) {
                animation_arr.push('dv_'+(l+i));
                animation_arr.push('dv_'+(mid + 1+j));
                animation_arr.push('a_'+k);
                arr[k] = L[i];
                animation_arr.push('r_'+k+'_'+max+'_'+L[i]+'_'+sort_array.length);
                animation_arr.push('d_'+k);
                i++;
            }
            else {
                animation_arr.push('dv_'+(l+i));
                animation_arr.push('dv_'+(mid + 1+j));
                animation_arr.push('a_'+k);
                arr[k] = R[j];
                animation_arr.push('r_'+k+'_'+max+'_'+R[j]+'_'+sort_array.length);
                animation_arr.push('d_'+k);
                j++;
            }
            k++;
        }
        while (i < n1) {
            animation_arr.push('v_'+(l+i));
            animation_arr.push('a_'+k);
            arr[k] = L[i];
            animation_arr.push('r_'+k+'_'+max+'_'+L[i]+'_'+sort_array.length);
            animation_arr.push('d_'+k);
            i++;
            k++;
        }
        while (j < n2) {
            animation_arr.push('v_'+(mid + 1+j));
            animation_arr.push('a_'+k);
            arr[k] = R[j];
            animation_arr.push('r_'+k+'_'+max+'_'+R[j]+'_'+sort_array.length);
            animation_arr.push('d_'+k);
            j++;
            k++;
        }

}

function count_sort(){
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }

    /*Create UI Specific features for Count Sort*/
    removeAllChildNodes(did('count_array'))
    let max = 0;
    for(let i=0;i<sort_array.length;i++){
        animation_arr.push('v_'+i)
        if(sort_array[i]>max){
            max=sort_array[i]
        }
    }
    animation_arr.push('dv');
    did('count-view').children[0].innerHTML = "Max Value: "+max;
    ////Inititialized Sample Arrau Box////
    let arr_box = document.createElement('div');
    let arr = document.createElement('div');
    let arr_val = document.createElement('h6')
    let box_size;
    arr_box.className = "array_box";
    arr_box.innerHTML = 0;
    if(1300/max>30){
        box_size=30
        arr_box.setAttribute('style','width:'+box_size+"px; height:"+box_size+"px")
    }
    else if(1300/max<25){
        box_size=26;
        arr_box.setAttribute('style','width:'+box_size+"px; height:"+box_size+"px")

    }
    else{
        box_size=1300/max
        arr_box.setAttribute('style','width:'+box_size+"px; height:"+box_size+"px")
    }

    ///Sample Array Box///
    arr.appendChild(arr_box);
    arr.appendChild(arr_val);

    ///Initialize empty divs for array
    let top = document.createElement('div')
    let bottom = document.createElement('div')

    if(max<50){
        for(let i=0;i<=max;i++){
            let clone = arr.cloneNode(true)
            clone.children[0].id = 'c_'+i;
            clone.children[1].innerHTML = i
            top.appendChild(clone);
        }
    }
    else if(max<=100){
        for(let i=0;i<=50;i++){
            let clone = arr.cloneNode(true)
            clone.children[0].id = 'c_'+i;
            clone.children[1].innerHTML = i
            top.appendChild(clone);
        }
        for(let i=51;i<=max;i++){
            let clone = arr.cloneNode(true)
            clone.children[0].id = 'c_'+i;
            clone.children[1].innerHTML = i
            bottom.appendChild(clone);
        }
    }
    else{
        top.innerHTML="TOO MANY VALUES, CANNOT FORMAT ARRAYS THE MAX MUST BE LESS THAN 100"
    }
    did('count_array').appendChild(top)
    did('count_array').appendChild(bottom)
    /*End of UI for Count Sort*/

    ////Sorting Algorithm////
    let c_array=new Array(max+1).fill(0);
    for(let i=0;i<sort_array.length;i++){
        animation_arr.push('v_'+i);
        if(max<=100){
            animation_arr.push('c_'+sort_array[i]);
        }
        c_array[sort_array[i]]++;
    }
    let loc=0;
    for(let i=0;i<c_array.length;i++){
        if(max<=100){
            animation_arr.push('ac_'+i);
        }
        for(let k=0;k<c_array[i];k++){
            animation_arr.push('r_'+loc+'_'+max+'_'+i+"_"+sort_array.length);
            animation_arr.push("l_"+loc);
            loc++;
        }
        if(max<=100){
            animation_arr.push('dc_'+i)
        }
    }
    animation_arr.push('dv')
    animate_sort(animation_arr,0);
    animation_arr = [];
}

function heap_sort(){
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }
    let heap_array =[0]
    let heap_pos = [0]

    for(let i=0;i<sort_array.length;i++){
        ///Inserts all values into a heap array sorting them in the heap
        let n = heap_insert(heap_array,heap_pos,sort_array[i],i,animation_arr);
        heap_array = n[0]; heap_pos = n[1]; animation_arr = n[2]
    }
    while(heap_array.length>1){
        let n=heap_remove(heap_array,heap_pos,animation_arr);
        heap_array = n[0]; heap_pos = n[1]; animation_arr = n[2]
    }
    animate_sort(animation_arr,0)
    animation_arr = []
}